import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Camera, 
  Upload, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles,
  Zap,
  RefreshCw,
  Video,
  VideoOff
} from 'lucide-react';
import { PRELOADED_EWASTE_SAMPLES } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';

export default function ScannerTab({ onSelectRecyclerForScrap, onOpenCedarForBatch }) {
  const { t } = useLanguage();
  const [selectedSample, setSelectedSample] = useState(PRELOADED_EWASTE_SAMPLES[0]);
  const [isScanning, setIsScanning] = useState(false);
  const [customImage, setCustomImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  // Live Webcam State
  const [isWebcamActive, setIsWebcamActive] = useState(false);
  const [webcamError, setWebcamError] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const mediaStreamRef = useRef(null);

  const handleSelectPreset = (sample) => {
    stopWebcam();
    setIsScanning(true);
    setCustomImage(null);
    setTimeout(() => {
      setSelectedSample(sample);
      setIsScanning(false);
    }, 350);
  };

  const processUploadedFile = (file) => {
    stopWebcam();
    const url = URL.createObjectURL(file);
    setCustomImage(url);
    setIsScanning(true);
    
    // Generate simulated dynamic multi-spectral analysis for custom image
    setTimeout(() => {
      setSelectedSample({
        id: `custom_${Date.now()}`,
        title: file.name.replace(/\.[^/.]+$/, "").toUpperCase(),
        category: "CUSTOM_HARDWARE_SURFACE",
        imageUrl: url,
        confidence: 0.97,
        hazardLevel: 2,
        hazardName: "Standard Consumer E-Scrap (RoHS Compliant)",
        hazardColor: "#f59e0b",
        detectedFeatures: [
          { label: "BGA Logic Processor Array [98%]", box: [18, 22, 28, 28] },
          { label: "High-Purity Copper Bus Grounding [95%]", box: [52, 15, 38, 42] },
          { label: "Gold Flash Surface Connectors [93%]", box: [12, 60, 24, 25] }
        ],
        materials: {
          cleanCopperFoil: "165g",
          goldFlashPlating: "0.42g",
          aluminumHeatsink: "88g",
          tinSilverSolder: "14g",
          epoxyFiberglass: "140g"
        },
        recoveryValue: {
          min: 380,
          max: 480,
          fairBenchmark: 435
        },
        handlingNotice: "Verified non-hazardous standard e-scrap. Ready for certified neighborhood Kabadiwala digital scale weighing.",
        safeDismantleDirective: "Authorized for local circular collection and zero-emission hydrometallurgical recovery."
      });
      setIsScanning(false);
    }, 600);
  };

  const handleFileInput = (e) => {
    const file = e.target.files?.[0];
    if (file) processUploadedFile(file);
  };

  // Drag and drop handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      processUploadedFile(file);
    }
  };

  // Webcam stream lifecycle
  const startWebcam = async () => {
    setWebcamError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
      });
      mediaStreamRef.current = stream;
      setIsWebcamActive(true);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.warn("Webcam access error:", err);
      setWebcamError("Camera access denied or unavailable on this device.");
    }
  };

  const stopWebcam = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
    setIsWebcamActive(false);
  };

  const captureWebcamFrame = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
    
    stopWebcam();
    setCustomImage(dataUrl);
    setIsScanning(true);

    setTimeout(() => {
      setSelectedSample({
        id: `webcam_${Date.now()}`,
        title: "LIVE WEBCAM HARDWARE SCAN",
        category: "LIVE_MULTISPECTRAL_SAMPLE",
        imageUrl: dataUrl,
        confidence: 0.99,
        hazardLevel: 1,
        hazardName: "Low Hazard - Direct Circular Recovery",
        hazardColor: "#10b981",
        detectedFeatures: [
          { label: "Target Micro-Circuitry Identified [99%]", box: [20, 20, 45, 45] },
          { label: "Electrolytic Capacitance Trace [96%]", box: [55, 30, 25, 25] }
        ],
        materials: {
          cleanCopper: "210g",
          goldElectrolyte: "0.38g",
          crgoSteelCore: "140g"
        },
        recoveryValue: {
          min: 290,
          max: 360,
          fairBenchmark: 325
        },
        handlingNotice: "Capture confirmed. Hardware analyzed against CPCB safety standards.",
        safeDismantleDirective: "Authorized for fair price Kabadiwala collection."
      });
      setIsScanning(false);
    }, 600);
  };

  useEffect(() => {
    return () => {
      stopWebcam();
    };
  }, []);

  return (
    <div style={{ paddingTop: '20px', paddingBottom: '60px' }}>
      
      {/* Hidden Canvas for Webcam Frame Snapping */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />

      {/* Top Section Header */}
      <div style={{ marginBottom: '32px' }}>
        <span style={{ 
          fontFamily: 'var(--font-space)', 
          fontSize: '13px', 
          fontWeight: 800, 
          letterSpacing: '0.12em', 
          color: 'var(--accent-color)' 
        }}>
          {t('scannerKicker')}
        </span>
        <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 800, textTransform: 'uppercase', marginTop: '8px' }}>
          {t('scannerHeading')}
        </h2>
        <p style={{ fontFamily: 'var(--font-inter)', fontSize: '18px', color: 'var(--muted-fg-color)', maxWidth: '680px', marginTop: '12px' }}>
          {t('scannerSubhead')}
        </p>
      </div>

      {/* Interactive Controls & Preset Selector Bar */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap', alignItems: 'center' }}>
        <span style={{ fontFamily: 'var(--font-space)', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--muted-fg-color)', marginRight: '8px' }}>
          INPUT SOURCE:
        </span>

        {/* Live Webcam Toggle Button */}
        {!isWebcamActive ? (
          <button 
            className="btn-kinetic-primary"
            style={{ height: '42px', padding: '0 16px', fontSize: '12px' }}
            onClick={startWebcam}
          >
            <Camera size={14} />
            <span>{t('scannerLiveWebcam')}</span>
          </button>
        ) : (
          <button 
            className="btn-kinetic-outline"
            style={{ height: '42px', padding: '0 16px', fontSize: '12px', borderColor: '#ef4444', color: '#ef4444' }}
            onClick={stopWebcam}
          >
            <VideoOff size={14} />
            <span>{t('scannerStopWebcam')}</span>
          </button>
        )}

        {/* Upload Photo Button */}
        <label 
          className="btn-kinetic-outline"
          style={{ height: '42px', padding: '0 16px', fontSize: '12px', cursor: 'pointer' }}
        >
          <Upload size={14} />
          <span>{t('scannerUploadPhoto')}</span>
          <input type="file" accept="image/*" onChange={handleFileInput} style={{ display: 'none' }} />
        </label>

        {/* Preset Sample Buttons */}
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
              backgroundColor: !isWebcamActive && !customImage && selectedSample.id === sample.id ? 'var(--accent-color)' : 'var(--bg-color)',
              color: !isWebcamActive && !customImage && selectedSample.id === sample.id ? '#000000' : 'var(--fg-color)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer'
            }}
            onClick={() => handleSelectPreset(sample)}
          >
            <span>{sample.title}</span>
            <span style={{ 
              fontSize: '11px', 
              padding: '2px 6px', 
              backgroundColor: !isWebcamActive && !customImage && selectedSample.id === sample.id ? '#000000' : 'var(--muted-color)',
              color: !isWebcamActive && !customImage && selectedSample.id === sample.id ? 'var(--accent-color)' : 'var(--fg-color)'
            }}>
              LVL {sample.hazardLevel}
            </span>
          </button>
        ))}
      </div>

      {webcamError && (
        <div style={{ padding: '12px 16px', backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', color: '#ef4444', marginBottom: '20px', fontFamily: 'var(--font-space)', fontSize: '13px' }}>
          ⚠️ {webcamError}
        </div>
      )}

      {/* 2-Column Brutalist Split Grid */}
      <div className="scanner-split-brutalist">
        
        {/* Left Column: Camera Viewport with Drag & Drop Zone */}
        <div 
          className="scanner-pane"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          style={{
            borderColor: isDragging ? 'var(--accent-color)' : 'var(--border-color)',
            transition: 'border-color 0.2s ease'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <span style={{ fontFamily: 'var(--font-space)', fontSize: '14px', fontWeight: 800, textTransform: 'uppercase' }}>
              {t('scannerCameraViewport')} // {isWebcamActive ? "WEBCAM LIVE" : `${(selectedSample.confidence * 100).toFixed(0)}% CONFIDENCE`}
            </span>
            <span style={{ color: 'var(--accent-color)', fontFamily: 'var(--font-space)', fontSize: '13px', fontWeight: 800, display: 'inline-flex', alignItems: 'center' }}>
              <span className="kinetic-live-dot" />
              {t('scannerLiveSpectrometer')}
            </span>
          </div>

          <div className="scanner-camera-box" style={{ position: 'relative' }}>
            {/* Scanlines Effect Overlay */}
            <div className="scanner-scanlines" />

            {/* Futuristic HUD Corner Reticles */}
            <div className="scanner-corner corner-tl" />
            <div className="scanner-corner corner-tr" />
            <div className="scanner-corner corner-bl" />
            <div className="scanner-corner corner-br" />

            {/* Viewport Content: Live Stream vs Still Image */}
            {isWebcamActive ? (
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                muted 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            ) : (
              <img 
                src={customImage || selectedSample.imageUrl} 
                alt={selectedSample.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: isScanning ? 'blur(4px)' : 'none',
                  transition: 'filter 0.3s ease'
                }}
              />
            )}

            {/* Continuous Kinetic Laser Scan Beam */}
            <div className="scanner-laser-kinetic" />

            {/* Bounding Box Overlays */}
            {!isScanning && !isWebcamActive && selectedSample.detectedFeatures?.map((feat, idx) => (
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

            {/* Drag & Drop Visual HUD Overlay */}
            {isDragging && (
              <div style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: 'rgba(223, 225, 4, 0.92)',
                color: '#000000',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 20,
                fontFamily: 'var(--font-space)',
                fontWeight: 900
              }}>
                <Upload size={48} />
                <span style={{ fontSize: '20px', marginTop: '12px' }}>DROP E-WASTE PHOTO TO SCAN</span>
              </div>
            )}
          </div>

          {/* Webcam Live Capture Bar */}
          {isWebcamActive && (
            <div style={{ marginTop: '16px' }}>
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-kinetic-primary"
                style={{ width: '100%' }}
                onClick={captureWebcamFrame}
              >
                <Camera size={16} />
                <span>{t('scannerCaptureFrame')}</span>
              </motion.button>
            </div>
          )}

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
              {t('scannerGuaranteedPayout')}
            </span>
            <motion.div 
              key={selectedSample.recoveryValue.fairBenchmark}
              initial={{ opacity: 0, scale: 0.95, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="payout-big-number"
            >
              ₹{selectedSample.recoveryValue.fairBenchmark}
            </motion.div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--muted-fg-color)', fontFamily: 'var(--font-space)', fontWeight: 700 }}>
              <span>FLOOR: ₹{selectedSample.recoveryValue.min}</span>
              <span>CEILING: ₹{selectedSample.recoveryValue.max}</span>
              <span>DIGITAL SCALE LOCKED</span>
            </div>
          </div>

          {/* Extracted Metal Yields */}
          <div style={{ marginBottom: '24px' }}>
            <span style={{ fontFamily: 'var(--font-space)', fontSize: '13px', fontWeight: 800, textTransform: 'uppercase' }}>
              {t('scannerExtractableElements')}
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
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn-kinetic-primary"
            style={{ width: '100%' }}
            onClick={() => onSelectRecyclerForScrap(selectedSample)}
          >
            <span>{t('scannerBookPickup')}</span>
            <span className="btn-icon">
              <ArrowRight size={18} />
            </span>
          </motion.button>

        </div>

      </div>

    </div>
  );
}
