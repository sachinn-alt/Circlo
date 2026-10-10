#!/usr/bin/env python3
"""
==============================================================================
CIRCLO E-WASTE MULTI-TASK DEEP LEARNING MODEL TRAINING PIPELINE
Architecture: MobileNetV3-Small Backbone + Multi-Task Prediction Heads:
  1. Category Classification (6 classes: PCB, Li-Ion, CRT, Coil, Solar, General)
  2. Hazard Level Regression (Levels 1 to 5)
  3. Recoverable Precious Metals Estimation (Au, Ag, Cu, Li, Co in grams)
Export Target: ONNX Runtime & Web / TensorFlow.js
==============================================================================
Usage:
  python training/train_ewaste_model.py --epochs 5 --export_onnx
"""

import os
import sys
import argparse
import json
import time

try:
    import torch
    import torch.nn as nn
    import torch.optim as optim
    from torch.utils.data import Dataset, DataLoader
    import torchvision.transforms as transforms
    from torchvision.models import mobilenet_v3_small, MobileNet_V3_Small_Weights
    import numpy as np
    TORCH_AVAILABLE = True
except ImportError:
    TORCH_AVAILABLE = False


# Class Names matching Circlo E-Waste Categories
CLASSES = [
    "PRINTED_CIRCUIT_BOARDS",
    "LITHIUM_ION_BATTERY",
    "CRT_TELEVISION_TUBE",
    "INDUCTION_COIL_TRANSFORMER",
    "SOLAR_INVERTER",
    "GENERAL_E_SCRAP"
]

NUM_CLASSES = len(CLASSES)
METALS = ["gold", "silver", "copper", "lithium", "cobalt"]
NUM_METALS = len(METALS)


if TORCH_AVAILABLE:
    class MultiTaskEwasteNet(nn.Module):
        """
        Lightweight Multi-Task Convolutional Neural Network
        Leverages MobileNetV3-Small for high throughput on mobile edge devices.
        """
        def __init__(self, num_classes=NUM_CLASSES, num_metals=NUM_METALS, pretrained=True):
            super().__init__()
            weights = MobileNet_V3_Small_Weights.DEFAULT if pretrained else None
            backbone = mobilenet_v3_small(weights=weights)
            
            # Extract feature representation before final linear layer
            in_features = backbone.classifier[0].in_features
            self.features = backbone.features
            self.avgpool = nn.AdaptiveAvgPool2d((1, 1))
            self.flatten = nn.Flatten()
            
            # Shared latent bottleneck projection
            self.shared_fc = nn.Sequential(
                nn.Linear(in_features, 256),
                nn.Hardswish(),
                nn.Dropout(p=0.2)
            )
            
            # Task Head 1: Category Logits
            self.category_head = nn.Linear(256, num_classes)
            
            # Task Head 2: Hazard Severity Score (Range 1.0 - 5.0)
            self.hazard_head = nn.Sequential(
                nn.Linear(256, 64),
                nn.ReLU(),
                nn.Linear(64, 1),
                nn.Sigmoid()  # Scaled by 4.0 + 1.0 in forward
            )
            
            # Task Head 3: Metal Mass Yield Regressor (grams)
            self.metal_yield_head = nn.Sequential(
                nn.Linear(256, 128),
                nn.ReLU(),
                nn.Linear(128, num_metals),
                nn.ReLU()  # Grams are strictly non-negative
            )

        def forward(self, x):
            feat = self.features(x)
            feat = self.avgpool(feat)
            feat = self.flatten(feat)
            latent = self.shared_fc(feat)
            
            # Output predictions
            category_logits = self.category_head(latent)
            hazard_score = (self.hazard_head(latent) * 4.0) + 1.0
            metal_yields = self.metal_yield_head(latent)
            
            return category_logits, hazard_score, metal_yields


    class SyntheticEwasteDataset(Dataset):
        """
        Generates synthetic tensor batches simulating electronic component textures,
        solder joints, and copper traces for rapid local training and verification.
        """
        def __init__(self, size=200, img_size=(224, 224)):
            self.size = size
            self.img_size = img_size

        def __len__(self):
            return self.size

        def __getitem__(self, idx):
            # Deterministic seed per index for reproducible local benchmarking
            np.random.seed(idx)
            category_idx = idx % NUM_CLASSES
            
            # Base color tensor simulating category characteristic hues
            # PCB = Green, Battery = Dark gray, Transformer = Copper orange, etc.
            img = np.random.normal(0.5, 0.15, (3, self.img_size[0], self.img_size[1])).astype(np.float32)
            
            if category_idx == 0:  # PCB: boost green channel + high frequency noise
                img[1] += 0.25
                hazard = 2.0
                metals = np.array([0.45, 1.2, 180.0, 0.0, 0.0], dtype=np.float32)
            elif category_idx == 1:  # Li-Ion: dark grayscale + high hazard
                img = img * 0.4
                hazard = 4.0
                metals = np.array([0.0, 0.0, 25.0, 18.0, 48.0], dtype=np.float32)
            elif category_idx == 2:  # CRT: lead glass
                img[0] += 0.1; img[2] += 0.2
                hazard = 5.0
                metals = np.array([0.0, 0.0, 85.0, 0.0, 0.0], dtype=np.float32)
            elif category_idx == 3:  # Induction Coil: heavy copper
                img[0] += 0.35; img[1] += 0.15
                hazard = 1.0
                metals = np.array([0.0, 0.0, 450.0, 0.0, 0.0], dtype=np.float32)
            elif category_idx == 4:  # Solar Inverter
                img[2] += 0.2
                hazard = 2.0
                metals = np.array([0.15, 0.5, 310.0, 0.0, 0.0], dtype=np.float32)
            else:
                hazard = 1.5
                metals = np.array([0.05, 0.1, 95.0, 0.0, 0.0], dtype=np.float32)
                
            img = np.clip(img, 0.0, 1.0)
            tensor_img = torch.from_numpy(img)
            
            return {
                "image": tensor_img,
                "category": torch.tensor(category_idx, dtype=torch.long),
                "hazard": torch.tensor([hazard], dtype=torch.float32),
                "metals": torch.from_numpy(metals)
            }


def train_model(epochs=3, batch_size=16, lr=1e-3, export_onnx=True, output_dir="./models"):
    if not TORCH_AVAILABLE:
        print("[!] PyTorch is not installed in the current environment.")
        print("    Install training dependencies: pip install -r training/requirements.txt")
        print("    Simulating training artifact metadata generation...")
        generate_model_metadata(output_dir)
        return

    os.makedirs(output_dir, exist_ok=True)
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    print(f"[*] Training on compute device: {device}")
    
    # Instantiate Model & Dataset
    model = MultiTaskEwasteNet(pretrained=False).to(device)
    train_dataset = SyntheticEwasteDataset(size=120)
    val_dataset = SyntheticEwasteDataset(size=40)
    
    train_loader = DataLoader(train_dataset, batch_size=batch_size, shuffle=True)
    val_loader = DataLoader(val_dataset, batch_size=batch_size, shuffle=False)
    
    # Multi-task loss functions
    ce_loss_fn = nn.CrossEntropyLoss()
    mse_loss_fn = nn.MSELoss()
    huber_loss_fn = nn.HuberLoss()
    
    optimizer = optim.AdamW(model.parameters(), lr=lr, weight_decay=1e-4)
    scheduler = optim.lr_scheduler.CosineAnnealingLR(optimizer, T_max=epochs)
    
    print("\n==============================================================")
    print("  CIRCLO E-WASTE MULTI-TASK DEEP LEARNING MODEL TRAINING      ")
    print("==============================================================\n")
    
    start_time = time.time()
    for epoch in range(1, epochs + 1):
        model.train()
        running_loss = 0.0
        correct_cat = 0
        total = 0
        
        for batch in train_loader:
            images = batch["image"].to(device)
            cat_targets = batch["category"].to(device)
            hazard_targets = batch["hazard"].to(device)
            metals_targets = batch["metals"].to(device)
            
            optimizer.zero_grad()
            cat_preds, hazard_preds, metals_preds = model(images)
            
            # Weighted multi-task loss
            loss_cat = ce_loss_fn(cat_preds, cat_targets)
            loss_hazard = mse_loss_fn(hazard_preds, hazard_targets)
            loss_metals = huber_loss_fn(metals_preds / 100.0, metals_targets / 100.0)
            
            total_loss = loss_cat + (1.5 * loss_hazard) + (0.5 * loss_metals)
            total_loss.backward()
            optimizer.step()
            
            running_loss += total_loss.item() * images.size(0)
            _, predicted = torch.max(cat_preds.data, 1)
            total += cat_targets.size(0)
            correct_cat += (predicted == cat_targets).sum().item()
            
        scheduler.step()
        epoch_loss = running_loss / total
        epoch_acc = (correct_cat / total) * 100
        print(f"Epoch [{epoch}/{epochs}] - Loss: {epoch_loss:.4f} | Category Accuracy: {epoch_acc:.1f}%")

    elapsed = time.time() - start_time
    print(f"\n[+] Training complete in {elapsed:.2f}s")
    
    # Save PyTorch Checkpoint
    checkpoint_path = os.path.join(output_dir, "circlo_ewaste_mobilenet.pt")
    torch.save(model.state_dict(), checkpoint_path)
    print(f"[+] Saved PyTorch weights: {checkpoint_path}")
    
    # Export to ONNX for browser / edge deployment
    if export_onnx:
        try:
            onnx_path = os.path.join(output_dir, "circlo_ewaste_v1.onnx")
            model.eval()
            dummy_input = torch.randn(1, 3, 224, 224).to(device)
            torch.onnx.export(
                model,
                dummy_input,
                onnx_path,
                export_params=True,
                opset_version=14,
                do_constant_folding=True,
                input_names=['input_image'],
                output_names=['category_logits', 'hazard_score', 'metal_yields'],
                dynamic_axes={'input_image': {0: 'batch_size'}}
            )
            print(f"[+] Successfully exported ONNX model: {onnx_path}")
        except Exception as e:
            print(f"[!] ONNX export warning: {e}")

    generate_model_metadata(output_dir)


def generate_model_metadata(output_dir):
    os.makedirs(output_dir, exist_ok=True)
    meta = {
        "model_name": "Circlo-MobileNetV3-EWaste-v1",
        "architecture": "MobileNetV3-Small-MultiTask",
        "framework": "PyTorch / ONNX Runtime",
        "input_resolution": [224, 224, 3],
        "categories": CLASSES,
        "hazard_levels": {
            "min": 1.0,
            "max": 5.0,
            "thresholds": {"L1": "Safe/Direct", "L2": "Standard/PPE", "L3": "Hazmat L1", "L4": "Hazmat L2", "L5": "Restricted/R2"}
        },
        "metals_tracked": METALS,
        "target_runtime": "ONNX Runtime Web / WebAssembly / PyTorch",
        "timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        "license": "Apache-2.0"
    }
    meta_path = os.path.join(output_dir, "model_manifest.json")
    with open(meta_path, "w") as f:
        json.dump(meta, f, indent=2)
    print(f"[+] Model manifest generated: {meta_path}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Train Circlo E-Waste Multi-Task Vision Model")
    parser.add_argument("--epochs", type=int, default=3, help="Number of training epochs")
    parser.add_argument("--batch_size", type=int, default=16, help="Batch size")
    parser.add_argument("--lr", type=float, default=1e-3, help="Learning rate")
    parser.add_argument("--export_onnx", action="store_true", default=True, help="Export model to ONNX")
    parser.add_argument("--output_dir", type=str, default="./models", help="Directory for saved weights")
    args = parser.parse_args()
    
    train_model(
        epochs=args.epochs,
        batch_size=args.batch_size,
        lr=args.lr,
        export_onnx=args.export_onnx,
        output_dir=args.output_dir
    )
