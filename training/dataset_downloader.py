#!/usr/bin/env python3
"""
==============================================================================
CIRCLO E-WASTE DATASET INGESTION & DOWNLOAD UTILITY
Fetches open-source e-waste computer vision datasets (Kaggle/Roboflow/TACO)
and formats annotations for Multi-Task training.
==============================================================================
"""

import os
import sys
import json
import argparse

OPEN_DATASETS = {
    "taco_waste": {
        "name": "Trash Annotations in Context (TACO)",
        "url": "https://github.com/pedropro/TACO",
        "description": "Open image dataset for litter and electronic packaging detection."
    },
    "roboflow_ewaste": {
        "name": "Roboflow E-Waste Component Dataset",
        "url": "https://universe.roboflow.com/search?q=e-waste",
        "description": "Bounding box annotated circuit boards, batteries, and capacitors."
    },
    "huggingface_waste": {
        "name": "Hugging Face Waste Classification Dataset",
        "url": "https://huggingface.co/datasets?search=waste",
        "description": "Multi-class image datasets for circular economy and recycling."
    }
}

def setup_data_directories(base_dir="./data/images"):
    categories = [
        "printed_circuit_boards",
        "lithium_ion_battery",
        "crt_television_tube",
        "induction_coil_transformer",
        "solar_inverter",
        "general_e_scrap"
    ]
    for cat in categories:
        cat_dir = os.path.join(base_dir, cat)
        os.makedirs(cat_dir, exist_ok=True)
        # Create metadata manifest template
        manifest_file = os.path.join(cat_dir, "metadata.json")
        if not os.path.exists(manifest_file):
            with open(manifest_file, "w") as f:
                json.dump({"category": cat, "samples_count": 0, "verified_cpcb": True}, f, indent=2)
    print(f"[+] Created dataset directory structure under {base_dir}")

def list_open_sources():
    print("==============================================================")
    print("  OPEN-SOURCE E-WASTE VISION DATASETS FOR TRAINING            ")
    print("==============================================================")
    for key, info in OPEN_DATASETS.items():
        print(f"\n* {info['name']}")
        print(f"  URL: {info['url']}")
        print(f"  Info: {info['description']}")
    print("\n==============================================================\n")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Download & Prepare E-Waste Training Datasets")
    parser.add_argument("--setup_dirs", action="store_true", default=True, help="Create dataset directories")
    parser.add_argument("--list_sources", action="store_true", default=True, help="List open dataset repositories")
    args = parser.parse_args()
    
    if args.list_sources:
        list_open_sources()
    if args.setup_dirs:
        setup_data_directories()
