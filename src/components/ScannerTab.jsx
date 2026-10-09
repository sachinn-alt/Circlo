import React, { useState } from 'react';
import { 
  Camera, 
  Upload, 
  AlertTriangle, 
  CheckCircle2, 
  Layers, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles,
  Zap
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
        setSelectedSample({
          ...PRELOADED_EWASTE_SAMPLES[1],
          title: `CUSTOM: ${file.name.toUpperCase()}`,
          imageUrl: url
        });
        setIsScanning(false);
      }, 600);
    }
  };

  return (
    <div style={{ paddingTop: '20px', paddingBottom: '60px' }}>
      
      {/* Top Section Header */}
      <div style={{ marginBottom: '32px' }}>
        <span style={{ 
          fontFamily: 'var(--font-space)', 
          fontSize: '13px', 
          fontWeight: 800, 
          letterSpacing: '0.12em', 
          color: 'var(--accent-color)' 
        }}>
          [ SPECTROMETER // REAL-TIME METAL YIELD ORACLE ]
        </span>
        <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 800, textTransform: 'uppercase', marginTop: '8px' }}>
          AI E-WASTE SPECTROMETER.
        </h2>
        <p style={{ fontFamily: 'var(--font-inter)', fontSize: '18px', color: 'var(--muted-fg-color)', maxWidth: '640px', marginTop: '12px' }}>
          Classifies electronic device architecture, calculates extracted precious metals, and delivers guaranteed market rates.
        </p>
      </div>

      {/* Preset Selector Chips */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap', alignItems: 'center' }}>
        <span style={{ fontFamily: 'var(--font-space)', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--muted-fg-color)', marginRight: '8px' }}>
          PRESETS:
        </span>
        {PRELOADED_EWASTE_SAMPLES.map((sample) => (
          <button
            key={sample.id}
            style={{
              padding: '10px 18px',
              fontFamily: 'var(--font-space)',
              fontSize: '13px',
              fontWeight: 800,
              textTransform: 'uppercase',
              border: '2px solid var(--border-color)',
              backgroundColor: selectedSample.id === sample.id ? 'var(--accent-color)' : 'var(--bg-color)',
              color: selectedSample.id === sample.id ? '#000000' : 'var(--fg-color)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}
            onClick={() => handleSelectPreset(sample)}
          >
            <span>{sample.title}</span>
            <span style={{ 
              fontSize: '11px', 
              padding: '2px 6px', 
              backgroundColor: selectedSample.id === sample.id ? '#000000' : 'var(--muted-color)',
              color: selectedSample.id === sample.id ? 'var(--accent-color)' : 'var(--fg-color)'
            }}>
              LVL {sample.hazardLevel}
            </span>
          </button>
        ))}

        <label 
          className="btn-kinetic-outline"
          style={{ height: '42px', padding: '0 16px', fontSize: '12px', cursor: 'pointer' }}
        >
          <Upload size={14} />
          <span>UPLOAD PHOTO</span>
          <input type="file" accept="image/*" onChange={handleFileUpload} style={{ display: 'none' }} />
        </label>
      </div>

      {/* 2-Column Brutalist Split Grid */}
      <div className="scanner-split-brutalist">
        
        {/* Left Column: Camera Viewport */}
        <div className="scanner-pane">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <span style={{ fontFamily: 'var(--font-space)', fontSize: '14px', fontWeight: 800, textTransform: 'uppercase' }}>
              CAMERA VIEWPORT // {(selectedSample.confidence * 100).toFixed(0)}% CONFIDENCE
            </span>
            <span style={{ color: 'var(--accent-color)', fontFamily: 'var(--font-space)', fontSize: '13px', fontWeight: 800 }}>
              ● LIVE AI FEED
            </span>
          </div>

          <div className="scanner-camera-box">
            <img 
              src={customImage || selectedSample.imageUrl} 
              alt={selectedSample.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: isScanning ? 'blur(4px)' : 'none',
                transition: 'filter 0.3s'
              }}
            />

            {/* Laser Scan Animation */}
            {isScanning && <div className="scanner-laser-kinetic" />}

            {/* Bounding Box Overlays */}
            {!isScanning && selectedSample.detectedFeatures?.map((feat, idx) => (
              <div 
                key={idx}
                className="bounding-box-kinetic"
                style={{
                  top: `${feat.box[0]}%`,
                  left: `${feat.box[1]}%`,
                  width: `${feat.box[2]}%`,
                  height: `${feat.box[3]}%`
                }}
              >
                <div className="bounding-box-label-kinetic">
                  {feat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Safety Notice */}
          <div style={{ 
            marginTop: '20px', 
            padding: '16px', 
            border: '2px solid var(--border-color)', 
            backgroundColor: 'var(--muted-color)' 
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-color)', marginBottom: '4px' }}>
              <AlertTriangle size={16} />
              <strong style={{ fontFamily: 'var(--font-space)', fontSize: '13px', textTransform: 'uppercase' }}>
                SAFETY PROTOCOL:
              </strong>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--fg-color)' }}>
              {selectedSample.handlingNotice}
            </p>
          </div>
        </div>

        {/* Right Column: Analytics & Payout Details */}
        <div className="scanner-pane" style={{ borderLeft: '2px solid var(--border-color)' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
            <div>
              <span style={{ fontFamily: 'var(--font-space)', fontSize: '12px', fontWeight: 800, color: 'var(--accent-color)', textTransform: 'uppercase' }}>
                {selectedSample.category}
              </span>
              <h3 style={{ fontSize: '26px', fontWeight: 800, marginTop: '4px', textTransform: 'uppercase' }}>
                {selectedSample.title}
              </h3>
            </div>

            <div style={{ 
              padding: '6px 12px', 
              border: '2px solid var(--accent-color)', 
              fontFamily: 'var(--font-space)', 
              fontSize: '12px', 
              fontWeight: 800, 
              color: 'var(--accent-color)',
              textTransform: 'uppercase'
            }}>
              HAZARD CLASS {selectedSample.hazardLevel}/5
            </div>
          </div>

          {/* Big Payout Box */}
          <div style={{ 
            border: '2px solid var(--border-color)', 
            padding: '24px', 
            backgroundColor: 'var(--muted-color)',
            marginBottom: '24px'
          }}>
            <span style={{ fontFamily: 'var(--font-space)', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--muted-fg-color)' }}>
              GUARANTEED CIVIC SCRAP VALUE
            </span>
            <div className="payout-big-number">
              ₹{selectedSample.recoveryValue.fairBenchmark}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--muted-fg-color)', fontFamily: 'var(--font-space)', fontWeight: 700 }}>
              <span>FLOOR: ₹{selectedSample.recoveryValue.min}</span>
              <span>CEILING: ₹{selectedSample.recoveryValue.max}</span>
              <span>DIGITAL SCALE LOCKED</span>
            </div>
          </div>

          {/* Extracted Metal Yields */}
          <div style={{ marginBottom: '24px' }}>
            <span style={{ fontFamily: 'var(--font-space)', fontSize: '13px', fontWeight: 800, textTransform: 'uppercase' }}>
              EXTRACTABLE PRECIOUS ELEMENTS:
            </span>
            <div className="materials-hairline-grid">
              {Object.entries(selectedSample.materials).map(([matKey, weight]) => (
                <div key={matKey} className="material-hairline-cell">
                  <span style={{ fontFamily: 'var(--font-space)', fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--muted-fg-color)' }}>
                    {matKey.replace(/([A-Z])/g, ' $1')}
                  </span>
                  <span style={{ fontFamily: 'var(--font-space)', fontSize: '15px', fontWeight: 800, color: 'var(--fg-color)' }}>
                    {weight}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Rule Verdict Callout */}
          <div style={{ 
            padding: '16px', 
            border: '2px solid var(--border-color)', 
            marginBottom: '24px',
            backgroundColor: 'var(--bg-color)'
          }}>
            <span style={{ fontFamily: 'var(--font-space)', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--accent-color)' }}>
              AUTOMATED SAFETY VERDICT:
            </span>
            <p style={{ fontSize: '14px', color: 'var(--fg-color)', marginTop: '4px' }}>
              {selectedSample.hazardLevel >= 3 ? (
                <span>⚠️ RESTRICTED: Requires trained specialist equipped with certified Hazmat L2 protection.</span>
              ) : (
                <span>✅ APPROVED: Permitted for all verified neighborhood collectors with direct UPI payout.</span>
              )}
            </p>
          </div>

          {/* CTA Action */}
          <button 
            className="btn-kinetic-primary"
            style={{ width: '100%' }}
            onClick={() => onSelectRecyclerForScrap(selectedSample)}
          >
            <ArrowRight size={18} />
            <span>FIND VERIFIED COLLECTOR FOR THIS ITEM</span>
          </button>

        </div>

      </div>

    </div>
  );
}
