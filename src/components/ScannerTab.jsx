import React, { useState } from 'react';
import { 
  Camera, 
  Upload, 
  AlertTriangle, 
  CheckCircle2, 
  DollarSign, 
  Layers, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles,
  Zap,
  Info
} from 'lucide-react';
import { PRELOADED_EWASTE_SAMPLES } from '../data/mockData';

export default function ScannerTab({ onSelectRecyclerForScrap, onOpenCedarForBatch }) {
  const [selectedSample, setSelectedSample] = useState(PRELOADED_EWASTE_SAMPLES[0]);
  const [isScanning, setIsScanning] = useState(false);
  const [customImage, setCustomImage] = useState(null);

  const handleSelectPreset = (sample) => {
    setIsScanning(true);
    setCustomImage(null);
    setTimeout(() => {
      setSelectedSample(sample);
      setIsScanning(false);
    }, 400);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomImage(url);
      setIsScanning(true);
      setTimeout(() => {
        // Map custom image to a high-yield PCB sample for demo
        setSelectedSample({
          ...PRELOADED_EWASTE_SAMPLES[1],
          title: `Custom Uploaded Device (${file.name})`,
          imageUrl: url
        });
        setIsScanning(false);
      }, 700);
    }
  };

  return (
    <div className="scanner-container">
      {/* Top Banner / Explainer */}
      <div className="tab-banner">
        <div>
          <h2>Computer Vision E-Waste Classifier & Precious Yield Valuator</h2>
          <p>
            Identifies complex electronic scrap, extracts elemental composition, gauges hazardous toxicity, and calculates fair minimum scrap market rates.
          </p>
        </div>
        <div className="ai-model-tag">
          <Sparkles size={16} />
          <span>Vision AI + Spot Commodity Oracles</span>
        </div>
      </div>

      {/* Preset Selector Carousel */}
      <div className="preset-selector-bar">
        <span className="preset-label">Test with real-world e-waste presets:</span>
        <div className="preset-chips">
          {PRELOADED_EWASTE_SAMPLES.map((sample) => (
            <button
              key={sample.id}
              className={`preset-chip ${selectedSample.id === sample.id ? 'active' : ''}`}
              onClick={() => handleSelectPreset(sample)}
            >
              <span>{sample.title}</span>
              <span 
                className="chip-hazard" 
                style={{ backgroundColor: sample.hazardColor }}
              >
                Lvl {sample.hazardLevel}
              </span>
            </button>
          ))}
          <label className="preset-upload-btn">
            <Upload size={14} />
            <span>Upload Photo</span>
            <input type="file" accept="image/*" onChange={handleFileUpload} style={{ display: 'none' }} />
          </label>
        </div>
      </div>

      {/* Main Scanner Workspace Grid */}
      <div className="scanner-grid">
        {/* Left Column: Vision Viewport */}
        <div className="viewport-card">
          <div className="viewport-header">
            <div className="viewport-title">
              <Camera size={16} className="text-cyan" />
              <span>Inspection Viewport</span>
            </div>
            <div className="viewport-meta">
              <span>Confidence: <strong>{(selectedSample.confidence * 100).toFixed(0)}%</strong></span>
              <span className="status-live">● AI Live Ingestion</span>
            </div>
          </div>

          <div className="viewport-image-container">
            <img 
              src={customImage || selectedSample.imageUrl} 
              alt={selectedSample.title}
              className={`viewport-img ${isScanning ? 'blur' : ''}`} 
            />

            {/* Laser Scan Animation */}
            {isScanning && <div className="scanner-laser animate-scan" />}

            {/* Bounding Box Overlays */}
            {!isScanning && selectedSample.detectedFeatures?.map((feat, idx) => (
              <div 
                key={idx}
                className="bounding-box"
                style={{
                  top: `${feat.box[0]}%`,
                  left: `${feat.box[1]}%`,
                  width: `${feat.box[2]}%`,
                  height: `${feat.box[3]}%`,
                  borderColor: selectedSample.hazardColor
                }}
              >
                <div 
                  className="bounding-label"
                  style={{ backgroundColor: selectedSample.hazardColor }}
                >
                  {feat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Safe Handling Directive Footer */}
          <div className="handling-footer">
            <div className="handling-notice-title">
              <AlertTriangle size={16} style={{ color: selectedSample.hazardColor }} />
              <strong>Handling Directive:</strong>
            </div>
            <p className="handling-text">{selectedSample.handlingNotice}</p>
          </div>
        </div>

        {/* Right Column: AI Analytics & Valuation */}
        <div className="analytics-card">
          {/* Header & Hazard Level */}
          <div className="device-header">
            <div>
              <span className="device-category">{selectedSample.category}</span>
              <h3 className="device-name">{selectedSample.title}</h3>
            </div>
            <div 
              className="hazard-badge"
              style={{ 
                borderColor: selectedSample.hazardColor,
                backgroundColor: `${selectedSample.hazardColor}15`,
                color: selectedSample.hazardColor
              }}
            >
              <AlertTriangle size={16} />
              <span>Hazard Class {selectedSample.hazardLevel}/5</span>
            </div>
          </div>

          {/* Fair Value Benchmark Card */}
          <div className="value-benchmark-card">
            <div className="value-header">
              <div>
                <span className="value-label">Civic Guaranteed Scrap Value</span>
                <div className="value-amount">
                  ₹{selectedSample.recoveryValue.fairBenchmark}
                  <small> (range ₹{selectedSample.recoveryValue.min} – ₹{selectedSample.recoveryValue.max})</small>
                </div>
              </div>
              <div className="verified-shield">
                <ShieldCheck size={28} className="text-emerald" />
                <span>Anti-Gouging Benchmark</span>
              </div>
            </div>
            <p className="value-explanation">
              Calculated using live MCX commodity spot rates for recovered gold, copper, and cobalt yields. Protected by AWS Cedar Floor Price Policy.
            </p>
          </div>

          {/* Elemental & Material Recovery Breakdown */}
          <div className="materials-breakdown">
            <h4>
              <Layers size={16} className="text-cyan" />
              <span>Extracted Material Yield</span>
            </h4>
            <div className="material-tags-grid">
              {Object.entries(selectedSample.materials).map(([matKey, weight]) => (
                <div key={matKey} className="material-tag">
                  <span className="mat-name">
                    {matKey.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </span>
                  <span className="mat-weight">{weight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* AWS Cedar Compliance Rule Preview */}
          <div className="cedar-policy-preview">
            <div className="policy-preview-header">
              <div className="flex-align">
                <Zap size={15} className="text-amber" />
                <strong>AWS Cedar Compliance Rule:</strong>
              </div>
              <button 
                className="btn-text-link"
                onClick={() => onOpenCedarForBatch(selectedSample)}
              >
                Inspect in Cedar Lab →
              </button>
            </div>
            <p className="policy-text">
              {selectedSample.hazardLevel >= 3 ? (
                <span className="text-red">
                  ⛔ FORBIDDEN for informal dismantlers without HAZMAT_EWASTE_L2. Must route to R2 certified hydrometallurgical facility.
                </span>
              ) : (
                <span className="text-emerald">
                  ✅ PERMITTED for all verified KYC Kabadiwalas with SAFE_SORT badge under Policy 3.
                </span>
              )}
            </p>
          </div>

          {/* CTA Actions */}
          <div className="scanner-actions">
            <button 
              className="btn-primary-action"
              onClick={() => onSelectRecyclerForScrap(selectedSample)}
            >
              <span>Find Verified Recycler for this item</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
