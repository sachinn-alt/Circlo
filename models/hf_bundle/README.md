---
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
