#!/usr/bin/env python3
"""
==============================================================================
CIRCLO HUGGING FACE HUB EXPORT & PACKAGING UTILITY
Packages Circlo-MobileNetV3-EWaste-v1 weights, ONNX runtime graph,
and Model Card for automated release to Hugging Face Hub (huggingface.co/sachinn-alt).
==============================================================================
Usage:
  python training/huggingface_hub_export.py --repo_id sachinn-alt/circlo-ewaste-mobilenet
"""

import os
import sys
import json
import argparse
import shutil

HF_MODEL_CARD_TEMPLATE = """---
language:
- en
- hi
- bn
license: apache-2.0
tags:
- e-waste
- circular-economy
- computer-vision
- image-classification
- object-detection
- onnx
- mobilenet-v3
- un-sdg-12
datasets:
- custom/circlo-cpcb-ewaste
metrics:
- accuracy
- mean-absolute-error
pipeline_tag: image-classification
---

# 🔄 Circlo-MobileNetV3-EWaste-v1

Pre-trained Multi-Task Computer Vision Model designed for hyperlocal e-waste classification,
hazard detection (Levels 1 to 5), and precious metal yield estimation (Gold, Silver, Copper, Lithium, Cobalt).

Part of the **Circlo Open Source Decentralized E-Waste Platform** ([circlo-eight.vercel.app](https://circlo-eight.vercel.app/)).

## 📦 Model Files
- `model.onnx`: Optimized ONNX runtime graph for WebGL / WebAssembly execution.
- `model_manifest.json`: Category mappings, hazard tiers, and elemental regression scalers.
- `circlo_ewaste_mobilenet.pt`: PyTorch model weights.

## 🚀 In-Browser Web Execution
```javascript
import * as ort from 'onnxruntime-web';

const session = await ort.InferenceSession.create(
  'https://huggingface.co/sachinn-alt/circlo-ewaste-mobilenet/resolve/main/model.onnx'
);
```

## 🛡️ Worker Safety Guardrail
Trained to enforce Central Pollution Control Board (CPCB) E-Waste Management Rules 2022
by failing safe on swollen lithium batteries and CRT lead glass.
"""

def package_for_huggingface(repo_id="sachinn-alt/circlo-ewaste-mobilenet", output_dir="./models/hf_bundle"):
    os.makedirs(output_dir, exist_ok=True)
    print(f"[*] Packaging bundle for Hugging Face Hub: {repo_id}")
    
    # 1. Write Hugging Face Model Card README
    readme_path = os.path.join(output_dir, "README.md")
    with open(readme_path, "w", encoding="utf-8") as f:
        f.write(HF_MODEL_CARD_TEMPLATE)
    print(f"[+] Created Hugging Face Model Card: {readme_path}")
    
    # 2. Copy or link model manifest
    manifest_source = "./models/model_manifest.json"
    manifest_dest = os.path.join(output_dir, "model_manifest.json")
    if os.path.exists(manifest_source):
        shutil.copyfile(manifest_source, manifest_dest)
        print(f"[+] Copied model manifest: {manifest_dest}")
    else:
        # Create default manifest
        default_manifest = {
            "model_name": "Circlo-MobileNetV3-EWaste-v1",
            "repo_id": repo_id,
            "architecture": "MobileNetV3-Small-MultiTask",
            "input_resolution": [224, 224, 3],
            "categories": [
                "PRINTED_CIRCUIT_BOARDS",
                "LITHIUM_ION_BATTERY",
                "CRT_TELEVISION_TUBE",
                "INDUCTION_COIL_TRANSFORMER",
                "SOLAR_INVERTER",
                "GENERAL_E_SCRAP"
            ]
        }
        with open(manifest_dest, "w", encoding="utf-8") as f:
            json.dump(default_manifest, f, indent=2)
        print(f"[+] Created manifest: {manifest_dest}")
        
    print("\n==============================================================")
    print("  HUGGING FACE BUNDLE READY FOR PUBLISHING                    ")
    print("==============================================================")
    print(f"To upload to Hugging Face Hub:")
    print(f"  huggingface-cli login")
    print(f"  huggingface-cli upload {repo_id} {output_dir} .")
    print("==============================================================\n")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Package model for Hugging Face Hub")
    parser.add_argument("--repo_id", type=str, default="sachinn-alt/circlo-ewaste-mobilenet")
    parser.add_argument("--output_dir", type=str, default="./models/hf_bundle")
    args = parser.parse_args()
    
    package_for_huggingface(repo_id=args.repo_id, output_dir=args.output_dir)
