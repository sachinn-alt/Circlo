# Model Card: Circlo-MobileNetV3-EWaste-v1 ⚡🔍

## Model Details
- **Model Name**: `Circlo-MobileNetV3-EWaste-v1`
- **Architecture**: MobileNetV3-Small with Multi-Task Prediction Heads
- **Tasks**:
  1. **E-Waste Category Classification** (6 Classes: PCB, Li-Ion, CRT, Coil, Solar, General)
  2. **Hazard Severity Score Regression** (Levels 1.0 to 5.0)
  3. **Recoverable Precious Metals Estimation** (Au, Ag, Cu, Li, Co in grams)
- **Primary Export Targets**: ONNX Runtime Web (Wasm/WebGL), PyTorch (`.pt`), TensorFlow.js
- **License**: Apache-2.0
- **Maintainer**: Sachin Kumar Singh & Circlo Contributors

---

## Intended Use
- **Primary Use Case**: Client-side computer vision inference running inside smartphones, tablets, and low-cost field devices used by informal waste collectors (*Kabadiwalas*).
- **Secondary Use Case**: Real-time safety hazard evaluation feeding into **AWS Cedar Policy Engine** to block uncertified dismantling of dangerous Class 3+ e-scrap (swollen lithium cells, CRT lead glass).
- **Out-of-Scope**: Medical or industrial explosive hazard assessment.

---

## Architecture & Tensor Specifications
- **Input Dimensions**: `[Batch, 3, 224, 224]` (Normalized RGB image tensor)
- **Shared Representation**: MobileNetV3-Small feature backbone with Adaptive Average Pooling and a 256-dimensional Hardswish projection bottleneck.
- **Output Tensors**:
  - `category_logits`: Shape `[Batch, 6]` (Logits across 6 component categories)
  - `hazard_score`: Shape `[Batch, 1]` (Continuous score in range $[1.0, 5.0]$)
  - `metal_yields`: Shape `[Batch, 5]` (Projected grams for Gold, Silver, Copper, Lithium, Cobalt)

---

## Ethical Considerations & Worker Protection
- **Fail-Safe Hazard Design**: If the model is uncertain about battery swelling or toxic CRT lead glass, it is trained to overestimate hazard levels rather than underestimate, prioritizing worker safety.
- **Anti-Gouging Fairness**: Metal yield predictions prevent predatory scrap brokers from cheating uneducated collectors by providing transparent elemental mass projections.

---

## Deployment & Running Inference
### Python (ONNX Runtime):
```python
import onnxruntime as ort
import numpy as np

session = ort.InferenceSession("models/circlo_ewaste_v1.onnx")
dummy_img = np.random.randn(1, 3, 224, 224).astype(np.float32)
cat_logits, hazard_score, metals = session.run(None, {"input_image": dummy_img})
```

### In-Browser (JavaScript / WebGL):
The web platform includes an optimized in-browser multi-spectral classifier at `src/services/visionClassifier.js` that inspects live video frames via HTML5 Canvas buffers.
