import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Camera, 
  Upload, 
  AlertTriangle, 
  ArrowRight, 
  Zap, 
  RefreshCw, 
  VideoOff, 
  Volume2, 
  VolumeX, 
  FileText, 
  ShieldAlert, 
  Flame, 
  Eye, 
  Cpu 
} from 'lucide-react';
import { PRELOADED_EWASTE_SAMPLES } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';
import { analyzeEwasteImage } from '../services/visionClassifier';
import { getLiveCommodityPrices, getOracleMetadata } from '../services/commodityOracle';
import { soundFx } from '../services/soundEffects';
import DigitalIntakeSlipModal from './DigitalIntakeSlipModal';

export default function ScannerTab({ onSelectRecyclerForScrap, onOpenCedarForBatch }) {
  const { t } = useLanguage();
  const [selectedSample, setSelectedSample] = useState(PRELOADED_EWASTE_SAMPLES[1]); // default to motherboard
  const [isScanning, setIsScanning] = useState(false);
  const [scanStepIndex, setScanStepIndex] = useState(0);
  const [customImage, setCustomImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  // Multi-Spectral View Filter
  const [activeFilter, setActiveFilter] = useState('rgb'); // 'rgb', 'thermal', 'xray', 'matrix'

  // Interactive Bounding Box State
  const [hoveredBoxIdx, setHoveredBoxIdx] = useState(null);
  const [hoveredMaterialKey, setHoveredMaterialKey] = useState(null);

  // Audio Mute State
  const [isMuted, setIsMuted] = useState(false);

  // Modal & Expandable Drawers
  const [showSlipModal, setShowSlipModal] = useState(false);
  const [showCedarDrawer, setShowCedarDrawer] = useState(false);

  // Live Webcam State
  const [isWebcamActive, setIsWebcamActive] = useState(false);
  const [webcamError, setWebcamError] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const mediaStreamRef = useRef(null);

  const oracleMeta = useMemo(() => getOracleMetadata(), []);
  const livePrices = useMemo(() => getLiveCommodityPrices(), []);

  const scanSteps = [
    "INGESTING OPTICAL MATRIX (640x480 RAW)",
    "DECOMPOSING MULTI-SPECTRAL ELEMENT TRACES (Au/Cu/Li)",
    "EVALUATING AWS CEDAR STATUTORY POLICIES",
    "LOCKING LIVE MCX/LME COMMODITY SETTLEMENT"
  ];

  const handleSelectPreset = (sample) => {
    stopWebcam();
    soundFx.playClick();
    soundFx.playScanSweep();
    setIsScanning(true);
    setScanStepIndex(0);
    setCustomImage(null);

    const stepInterval = setInterval(() => {
      setScanStepIndex((prev) => {
        if (prev < scanSteps.length - 1) return prev + 1;
        clearInterval(stepInterval);
        return prev;
      });
    }, 120);

    setTimeout(() => {
      clearInterval(stepInterval);
      setSelectedSample(sample);
      setIsScanning(false);
      if (sample.hazardLevel >= 4 || sample.isEwaste === false) {
        soundFx.playHazardAlert();
      } else {
        soundFx.playScanSuccess();
      }
    }, 550);
  };

  const processUploadedFile = async (file) => {
    stopWebcam();
    soundFx.playClick();
    soundFx.playScanSweep();
    const url = URL.createObjectURL(file);
    setCustomImage(url);
    setIsScanning(true);
    setScanStepIndex(1);
    
    try {
      const result = await analyzeEwasteImage(url);
      result.title = file.name.replace(/\.[^/.]+$/, "").toUpperCase();
      setSelectedSample(result);
      if (result.hazardLevel >= 4 || result.isEwaste === false) {
        soundFx.playHazardAlert();
      } else {
        soundFx.playScanSuccess();
      }
    } catch (err) {
      console.warn("Vision analysis error:", err);
    } finally {
      setIsScanning(false);
    }
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
    soundFx.playClick();
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

  const captureWebcamFrame = async () => {
    if (!videoRef.current || !canvasRef.current) return;
    soundFx.playClick();
    soundFx.playScanSweep();
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

    try {
      const result = await analyzeEwasteImage(canvas);
      result.title = "LIVE CAMERA SPECTROMETER CAPTURE";
      setSelectedSample(result);
      if (result.hazardLevel >= 4 || result.isEwaste === false) {
        soundFx.playHazardAlert();
      } else {
        soundFx.playScanSuccess();
      }
    } catch (err) {
      console.warn("Vision analysis error:", err);
    } finally {
      setIsScanning(false);
    }
  };

  const toggleSoundMute = () => {
    const muted = soundFx.toggleMute();
    setIsMuted(muted);
    if (!muted) soundFx.playClick();
  };

  useEffect(() => {
    return () => {
      stopWebcam();
    };
  }, []);

  // Material elemental badges helper
  const getElementBadge = (matKey) => {
    const key = matKey.toLowerCase();
    if (key.includes('gold') || key.includes('au')) return { symbol: 'Au', num: 79, color: '#DFE104', bg: '#000' };
    if (key.includes('copper') || key.includes('cu')) return { symbol: 'Cu', num: 29, color: '#f97316', bg: '#000' };
    if (key.includes('lithium') || key.includes('cobalt') || key.includes('blackmass')) return { symbol: 'Li/Co', num: 27, color: '#ef4444', bg: '#000' };
    if (key.includes('silver') || key.includes('ag')) return { symbol: 'Ag', num: 47, color: '#94a3b8', bg: '#000' };
    if (key.includes('aluminum') || key.includes('al')) return { symbol: 'Al', num: 13, color: '#38bdf8', bg: '#000' };
    return { symbol: 'Fe', num: 26, color: '#cbd5e1', bg: '#000' };
  };

  return (
    <div style={{ paddingTop: '20px', paddingBottom: '60px' }}>
      
      {/* Hidden Canvas for Webcam Frame Snapping */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />

      {/* Top Section Header with Sound Toggle & Oracle Ribbon */}
      <div style={{ marginBottom: '28px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <span style={{ 
            fontFamily: 'var(--font-space)', 
            fontSize: '13px', 
            fontWeight: 800, 
            letterSpacing: '0.12em', 
            color: 'var(--accent-color)' 
          }}>
            {t('scannerKicker')}
          </span>
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.2rem)', fontWeight: 800, textTransform: 'uppercase', marginTop: '6px' }}>
            {t('scannerHeading')}
          </h2>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: '17px', color: 'var(--muted-fg-color)', maxWidth: '720px', marginTop: '10px' }}>
            {t('scannerSubhead')}
          </p>
        </div>

        {/* Audio Mute & Oracle Status Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ 
            padding: '8px 14px', 
            backgroundColor: '#0a0a0a', 
            border: '1px solid var(--border-color)', 
            fontFamily: 'var(--font-space)', 
            fontSize: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span className="kinetic-live-dot" style={{ backgroundColor: '#10b981' }} />
            <span style={{ color: 'var(--muted-fg-color)' }}>ORACLE FEED:</span>
            <span style={{ color: '#10b981', fontWeight: 800 }}>MCX/LME SYNCED</span>
          </div>

          <button
            onClick={toggleSoundMute}
            style={{
              height: '40px',
              padding: '0 12px',
              backgroundColor: isMuted ? 'transparent' : 'rgba(223, 225, 4, 0.12)',
              border: '1px solid var(--border-color)',
              color: isMuted ? 'var(--muted-fg-color)' : 'var(--accent-color)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: 'var(--font-space)',
              fontSize: '11px',
              fontWeight: 800,
              cursor: 'pointer'
            }}
            title={isMuted ? "Unmute Sound FX" : "Mute Sound FX"}
          >
            {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
            <span>{isMuted ? "MUTED" : "AUDIO ON"}</span>
          </button>
        </div>
      </div>

      {/* Input Source & Preset Carousel Bar */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '10px' }}>
          <span style={{ fontFamily: 'var(--font-space)', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--muted-fg-color)' }}>
            CHOOSE SPECIMEN OR UPLOAD LIVE FRAME:
          </span>

          <div style={{ display: 'flex', gap: '8px' }}>
            {/* Live Webcam Toggle Button */}
            {!isWebcamActive ? (
              <button 
                className="btn-kinetic-primary"
                style={{ height: '36px', padding: '0 14px', fontSize: '11px' }}
                onClick={startWebcam}
              >
                <Camera size={13} />
                <span>{t('scannerLiveWebcam')}</span>
              </button>
            ) : (
              <button 
                className="btn-kinetic-outline"
                style={{ height: '36px', padding: '0 14px', fontSize: '11px', borderColor: '#ef4444', color: '#ef4444' }}
                onClick={stopWebcam}
              >
                <VideoOff size={13} />
                <span>{t('scannerStopWebcam')}</span>
              </button>
            )}

            {/* Upload Photo Button */}
            <label 
              className="btn-kinetic-outline"
              style={{ height: '36px', padding: '0 14px', fontSize: '11px', cursor: 'pointer' }}
            >
              <Upload size={13} />
              <span>{t('scannerUploadPhoto')}</span>
              <input type="file" accept="image/*" onChange={handleFileInput} style={{ display: 'none' }} />
            </label>
          </div>
        </div>

        {/* Horizontal Preset Specimen Cards */}
        <div className="scanner-preset-cards-scroll">
          {PRELOADED_EWASTE_SAMPLES.map((sample) => {
            const isSelected = !isWebcamActive && !customImage && selectedSample.id === sample.id;
            const isOod = sample.isEwaste === false;
            return (
              <div
                key={sample.id}
                className={`scanner-preset-card ${isSelected ? 'active' : ''}`}
                onClick={() => handleSelectPreset(sample)}
                style={{
                  borderLeft: isSelected ? '4px solid var(--accent-color)' : `4px solid ${sample.hazardColor || 'var(--border-color)'}`
                }}
              >
                <img 
                  src={sample.imageUrl} 
                  alt={sample.title} 
                  style={{ width: '48px', height: '48px', objectFit: 'cover', border: '1px solid var(--border-color)', flexShrink: 0 }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ 
                      fontSize: '10px', 
                      fontWeight: 800, 
                      color: isOod ? '#f59e0b' : 'var(--accent-color)', 
                      fontFamily: 'var(--font-space)' 
                    }}>
                      {isOod ? '⚠️ OOD TEST' : `CLASS ${sample.hazardLevel}/5`}
                    </span>
                    <span style={{ fontSize: '11px', fontWeight: 800, color: '#ffffff' }}>
                      {sample.recoveryValue.fairBenchmark > 0 ? `₹${sample.recoveryValue.fairBenchmark}` : 'REJECT'}
                    </span>
                  </div>
                  <div style={{ 
                    fontSize: '12px', 
                    fontWeight: 700, 
                    color: isSelected ? '#ffffff' : 'var(--fg-color)', 
                    overflow: 'hidden', 
                    textOverflow: 'ellipsis', 
                    whiteSpace: 'nowrap',
                    marginTop: '2px'
                  }}>
                    {sample.title}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
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
            transition: 'border-color 0.2s ease',
            padding: '24px'
          }}
        >
          {/* Viewport Top Bar & Spectral Switcher */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
            <span style={{ fontFamily: 'var(--font-space)', fontSize: '13px', fontWeight: 800, textTransform: 'uppercase' }}>
              {t('scannerCameraViewport')} // {isWebcamActive ? "LIVE SENSOR" : `${(selectedSample.confidence * 100).toFixed(0)}% MATCH`}
            </span>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ color: 'var(--accent-color)', fontFamily: 'var(--font-space)', fontSize: '12px', fontWeight: 800, display: 'inline-flex', alignItems: 'center' }}>
                <span className="kinetic-live-dot" />
                {t('scannerLiveSpectrometer')}
              </span>

              {/* Multi-Spectral Mode Selector */}
              <div style={{ display: 'flex', gap: '3px', backgroundColor: '#111111', padding: '3px', border: '1px solid var(--border-color)' }}>
                {[
                  { id: 'rgb', label: 'RGB', icon: Eye },
                  { id: 'thermal', label: 'THERMAL', icon: Flame },
                  { id: 'xray', label: 'X-RAY', icon: Zap },
                  { id: 'matrix', label: 'SOBEL', icon: Cpu }
                ].map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => {
                      soundFx.playClick();
                      setActiveFilter(mode.id);
                    }}
                    style={{
                      backgroundColor: activeFilter === mode.id ? 'var(--accent-color)' : 'transparent',
                      color: activeFilter === mode.id ? '#000000' : 'var(--muted-fg-color)',
                      border: 'none',
                      padding: '3px 7px',
                      fontFamily: 'var(--font-space)',
                      fontSize: '10px',
                      fontWeight: 800,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '3px'
                    }}
                  >
                    <mode.icon size={11} />
                    <span>{mode.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="scanner-camera-box" style={{ position: 'relative' }}>
            {/* Scanlines Effect Overlay */}
            <div className="scanner-scanlines" />

            {/* Futuristic HUD Corner Reticles */}
            <div className="scanner-corner corner-tl" />
            <div className="scanner-corner corner-tr" />
            <div className="scanner-corner corner-bl" />
            <div className="scanner-corner corner-br" />

            {/* Center Crosshair Reticle with Telemetry Coordinates */}
            <div className="scanner-center-crosshair">
              <span style={{ 
                position: 'absolute', 
                bottom: '-18px', 
                fontSize: '9px', 
                fontFamily: 'var(--font-space)', 
                color: 'rgba(223, 225, 4, 0.75)',
                whiteSpace: 'nowrap'
              }}>
                SPEC: {activeFilter.toUpperCase()} // 640x480
              </span>
            </div>

            {/* Viewport Content: Live Stream vs Still Image */}
            {isWebcamActive ? (
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                muted 
                className={`spectral-filter-${activeFilter}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            ) : (
              <img 
                src={customImage || selectedSample.imageUrl} 
                alt={selectedSample.title}
                className={`spectral-filter-${activeFilter}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: isScanning ? 'blur(4px)' : undefined,
                  transition: 'filter 0.3s ease'
                }}
              />
            )}

            {/* Continuous Kinetic Laser Scan Beam */}
            <div className="scanner-laser-kinetic" />

            {/* Dynamic Telemetry HUD Banner during Scanning */}
            {isScanning && (
              <div style={{
                position: 'absolute',
                top: '16px',
                left: '16px',
                right: '16px',
                backgroundColor: 'rgba(0, 0, 0, 0.85)',
                border: '1px solid var(--accent-color)',
                padding: '10px 14px',
                zIndex: 22,
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <RefreshCw size={16} className="animate-spin" color="var(--accent-color)" />
                <div>
                  <span style={{ fontSize: '10px', color: 'var(--accent-color)', display: 'block', fontWeight: 800 }}>
                    ANALYSIS PIPELINE STEP {scanStepIndex + 1}/4
                  </span>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#ffffff' }}>
                    {scanSteps[scanStepIndex]}
                  </span>
                </div>
              </div>
            )}

            {/* Bounding Box Overlays (Interactive on Hover) */}
            {!isScanning && !isWebcamActive && selectedSample.detectedFeatures?.map((feat, idx) => {
              const isHovered = hoveredBoxIdx === idx;
              return (
                <div 
                  key={idx}
                  className={`bounding-box-kinetic interactive ${isHovered ? 'active-hover' : ''}`}
                  onMouseEnter={() => {
                    soundFx.playClick();
                    setHoveredBoxIdx(idx);
                  }}
                  onMouseLeave={() => setHoveredBoxIdx(null)}
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

                  {/* Interactive Floating Detail Tooltip */}
                  {isHovered && (
                    <motion.div 
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bounding-box-tooltip"
                    >
                      <div style={{ color: 'var(--accent-color)', fontWeight: 800 }}>
                        HOTSPOT #{idx + 1}: {feat.label}
                      </div>
                      <div style={{ fontSize: '10px', color: '#94a3b8', marginTop: '2px' }}>
                        Density: High • MCX Yield Linked • Click to focus
                      </div>
                    </motion.div>
                  )}
                </div>
              );
            })}

            {/* Out-Of-Distribution Non-E-Waste Alert Badge */}
            {selectedSample.isEwaste === false && (
              <div style={{
                position: 'absolute',
                inset: '16px',
                border: '2px solid #ef4444',
                backgroundColor: 'rgba(0, 0, 0, 0.82)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '24px',
                textAlign: 'center',
                zIndex: 20
              }}>
                <ShieldAlert size={44} color="#ef4444" />
                <span style={{ fontSize: '18px', fontWeight: 900, color: '#ef4444', marginTop: '12px', textTransform: 'uppercase' }}>
                  STATUTORY SAFETY REJECTION
                </span>
                <span style={{ fontSize: '13px', color: '#ffffff', maxWidth: '380px', marginTop: '8px' }}>
                  Low electronic spectral signature (Confidence {Math.round(selectedSample.confidence * 100)}%). Object classified as organic or non-electronic household item.
                </span>
                <span style={{ fontSize: '11px', color: 'var(--accent-color)', marginTop: '12px', fontWeight: 800 }}>
                  CPCB E-WASTE ENFORCEMENT RULES 2022
                </span>
              </div>
            )}

            {/* Drag & Drop Visual HUD Overlay */}
            {isDragging && (
              <div style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: 'rgba(223, 225, 4, 0.94)',
                color: '#000000',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 25,
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
                style={{ width: '100%', height: '46px' }}
                onClick={captureWebcamFrame}
              >
                <Camera size={16} />
                <span>{t('scannerCaptureFrame')}</span>
              </motion.button>
            </div>
          )}

          {/* Safety Handling Notice Protocol Card */}
          <div style={{ 
            marginTop: '20px', 
            padding: '16px', 
            border: '2px solid var(--border-color)', 
            backgroundColor: 'var(--muted-color)' 
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: selectedSample.hazardLevel >= 4 ? '#ef4444' : 'var(--accent-color)', marginBottom: '4px' }}>
              <AlertTriangle size={16} />
              <strong style={{ fontFamily: 'var(--font-space)', fontSize: '13px', textTransform: 'uppercase' }}>
                SAFETY PROTOCOL & CPCB GUIDELINE:
              </strong>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--fg-color)', lineHeight: 1.5, marginTop: '4px' }}>
              {selectedSample.handlingNotice}
            </p>
          </div>
        </div>

        {/* Right Column: Analytics & Payout Details */}
        <div className="scanner-pane" style={{ borderLeft: '2px solid var(--border-color)', padding: '24px' }}>
          
          {/* Header & Hazard Level */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', gap: '12px', flexWrap: 'wrap' }}>
            <div>
              <span style={{ fontFamily: 'var(--font-space)', fontSize: '12px', fontWeight: 800, color: 'var(--accent-color)', textTransform: 'uppercase' }}>
                {selectedSample.category}
              </span>
              <h3 style={{ fontSize: '24px', fontWeight: 800, marginTop: '4px', textTransform: 'uppercase' }}>
                {selectedSample.title}
              </h3>
            </div>

            <div style={{ 
              padding: '6px 12px', 
              border: `2px solid ${selectedSample.hazardColor || 'var(--accent-color)'}`, 
              fontFamily: 'var(--font-space)', 
              fontSize: '12px', 
              fontWeight: 800, 
              color: selectedSample.hazardColor || 'var(--accent-color)',
              textTransform: 'uppercase',
              backgroundColor: 'rgba(0,0,0,0.4)'
            }}>
              HAZARD CLASS {selectedSample.hazardLevel}/5
            </div>
          </div>

          {/* Big Payout Box with Fair Floor Comparison */}
          <div style={{ 
            border: '2px solid var(--border-color)', 
            padding: '22px', 
            backgroundColor: 'var(--muted-color)',
            marginBottom: '24px',
            position: 'relative'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: 'var(--font-space)', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--muted-fg-color)' }}>
                {t('scannerGuaranteedPayout')}
              </span>
              <span style={{ 
                fontSize: '11px', 
                fontFamily: 'var(--font-space)', 
                fontWeight: 800, 
                color: '#10b981',
                padding: '2px 8px',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid #10b981'
              }}>
                85% MCX LOCKED
              </span>
            </div>

            <motion.div 
              key={selectedSample.recoveryValue.fairBenchmark}
              initial={{ opacity: 0, scale: 0.95, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="payout-big-number"
            >
              ₹{selectedSample.recoveryValue.fairBenchmark}
            </motion.div>

            {/* Fair Floor Comparison Bar */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(3, 1fr)', 
              gap: '8px', 
              paddingTop: '12px', 
              borderTop: '1px solid rgba(255,255,255,0.08)',
              fontFamily: 'var(--font-space)',
              fontSize: '11px'
            }}>
              <div>
                <span style={{ color: 'var(--muted-fg-color)', display: 'block' }}>CEDAR FLOOR:</span>
                <strong style={{ color: '#ffffff' }}>₹{selectedSample.recoveryValue.min}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--muted-fg-color)', display: 'block' }}>MIDDLEMAN:</span>
                <strong style={{ color: '#ef4444' }}>~₹{Math.round(selectedSample.recoveryValue.fairBenchmark * 0.45)}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--muted-fg-color)', display: 'block' }}>CIRCLO GAIN:</span>
                <strong style={{ color: 'var(--accent-color)' }}>
                  +₹{Math.max(0, selectedSample.recoveryValue.fairBenchmark - Math.round(selectedSample.recoveryValue.fairBenchmark * 0.45))}
                </strong>
              </div>
            </div>

            {/* Live Oracle Exchange Benchmark Footnote */}
            <div style={{ 
              marginTop: '12px', 
              paddingTop: '8px', 
              borderTop: '1px dashed rgba(255,255,255,0.08)', 
              fontSize: '10px', 
              color: 'var(--muted-fg-color)', 
              display: 'flex', 
              justifyContent: 'space-between',
              fontFamily: 'var(--font-space)'
            }}>
              <span>ORACLE: {oracleMeta.exchange}</span>
              <span style={{ color: '#10b981', fontWeight: 700 }}>
                BENCHMARK: ₹{livePrices.find(p => p.id === 'pcb_grade_a' || p.id === 'copper_clean')?.pricePerKg || 786}/KG
              </span>
            </div>
          </div>

          {/* Elemental Recovery Spectrogram */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontFamily: 'var(--font-space)', fontSize: '13px', fontWeight: 800, textTransform: 'uppercase' }}>
                {t('scannerExtractableElements')}
              </span>
              <span style={{ fontSize: '11px', color: 'var(--muted-fg-color)', fontFamily: 'var(--font-space)' }}>
                HOVER TO INSPECT DENSITY
              </span>
            </div>

            <div className="materials-hairline-grid" style={{ display: 'flex', flexDirection: 'column', gap: '6px', border: 'none', background: 'transparent' }}>
              {selectedSample.materials && Object.entries(selectedSample.materials).map(([matKey, weight]) => {
                const badge = getElementBadge(matKey);
                const isHighlighted = hoveredMaterialKey === matKey;
                return (
                  <div 
                    key={matKey} 
                    className={`spectrogram-row ${isHighlighted ? 'highlighted' : ''}`}
                    onMouseEnter={() => {
                      soundFx.playClick();
                      setHoveredMaterialKey(matKey);
                    }}
                    onMouseLeave={() => setHoveredMaterialKey(null)}
                    style={{ cursor: 'pointer' }}
                  >
                    {/* Element Chemical Symbol Badge */}
                    <div 
                      className="spectrogram-badge"
                      style={{ 
                        border: `1px solid ${badge.color}`, 
                        color: badge.color,
                        backgroundColor: '#0a0a0a'
                      }}
                    >
                      {badge.symbol}
                    </div>

                    {/* Material Title */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <span style={{ 
                        fontFamily: 'var(--font-space)', 
                        fontSize: '12px', 
                        fontWeight: 700, 
                        textTransform: 'uppercase', 
                        color: isHighlighted ? 'var(--accent-color)' : 'var(--fg-color)' 
                      }}>
                        {matKey.replace(/([A-Z])/g, ' $1')}
                      </span>
                    </div>

                    {/* Weight Recovery */}
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontFamily: 'var(--font-space)', fontSize: '13px', fontWeight: 800, color: 'var(--accent-color)' }}>
                        {weight}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* AWS Cedar Automated Safety Verdict Card with Expandable Policy AST */}
          <div style={{ 
            padding: '16px', 
            border: '2px solid var(--border-color)', 
            marginBottom: '20px',
            backgroundColor: 'var(--bg-color)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ 
                fontFamily: 'var(--font-space)', 
                fontSize: '11px', 
                fontWeight: 800, 
                textTransform: 'uppercase', 
                color: selectedSample.isEwaste === false ? '#f59e0b' : selectedSample.hazardLevel >= 4 ? '#ef4444' : 'var(--accent-color)' 
              }}>
                AWS CEDAR ENGINE STATUTORY VERDICT:
              </span>

              <button
                onClick={() => setShowCedarDrawer(!showCedarDrawer)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--accent-color)',
                  fontFamily: 'var(--font-space)',
                  fontSize: '11px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <FileText size={12} />
                <span>{showCedarDrawer ? "HIDE POLICY" : "VIEW RULE AST"}</span>
              </button>
            </div>

            <p style={{ fontSize: '13px', color: 'var(--fg-color)', marginTop: '6px', lineHeight: 1.4 }}>
              {selectedSample.isEwaste === false ? (
                <span>⚠️ NON-E-WASTE REJECTION: Spectral variance indicates an everyday organic object. Electronic recovery protocol denied.</span>
              ) : selectedSample.hazardLevel >= 4 ? (
                <span>⚠️ HIGH HAZARD (CLASS {selectedSample.hazardLevel}): Requires certified Hazmat L2 transport with fire-retardant vermiculite packaging. Informal burning strictly forbidden.</span>
              ) : (
                <span>✅ APPROVED (CLASS {selectedSample.hazardLevel}): Permitted for verified neighborhood Kabadiwalas with instant UPI settlement and calibrated scale lock.</span>
              )}
            </p>

            {/* Expandable Cedar Policy Code Snippet */}
            <AnimatePresence>
              {showCedarDrawer && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  style={{
                    overflow: 'hidden',
                    marginTop: '12px',
                    paddingTop: '12px',
                    borderTop: '1px dashed var(--border-color)'
                  }}
                >
                  <pre style={{
                    backgroundColor: '#0a0a0a',
                    border: '1px solid var(--border-color)',
                    padding: '12px',
                    fontSize: '11px',
                    fontFamily: 'monospace',
                    color: '#10b981',
                    overflowX: 'auto',
                    whiteSpace: 'pre-wrap'
                  }}>
{selectedSample.hazardLevel >= 4 
  ? `// AWS CEDAR POLICY 01: HAZMAT SAFEGUARD
forbid(
  principal in User::"informal_kabadiwala",
  action in [Action::"OpenBurn", Action::"YardSmelt"],
  resource in EwasteBatch::"${selectedSample.id}"
) when {
  resource.hazardLevel >= 4 &&
  !principal.hasCertification("HAZMAT_EWASTE_L2")
};`
  : `// AWS CEDAR POLICY 02: FAIR FLOOR PRICE ANTI-GOUGING
permit(
  principal in User::"informal_kabadiwala",
  action in [Action::"PurchaseBatch", Action::"DirectUpiPayout"],
  resource in EwasteBatch::"${selectedSample.id}"
) when {
  context.offeredBid >= context.mcxBenchmark * 0.85
};`}
                  </pre>
                  
                  <button
                    onClick={() => onOpenCedarForBatch && onOpenCedarForBatch(selectedSample)}
                    className="btn-kinetic-outline"
                    style={{ width: '100%', marginTop: '8px', height: '32px', fontSize: '11px' }}
                  >
                    <span>TEST IN INTERACTIVE CEDAR POLICY LAB</span>
                    <ArrowRight size={13} />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Action CTAs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {selectedSample.isEwaste !== false ? (
              <>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-kinetic-primary"
                  style={{ width: '100%', height: '48px' }}
                  onClick={() => onSelectRecyclerForScrap(selectedSample)}
                >
                  <span>{t('scannerBookPickup')}</span>
                  <span className="btn-icon">
                    <ArrowRight size={18} />
                  </span>
                </motion.button>

                {/* Digital Intake Slip Button */}
                <button
                  onClick={() => setShowSlipModal(true)}
                  className="btn-kinetic-outline"
                  style={{ width: '100%', height: '44px', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                >
                  <FileText size={15} />
                  <span>VIEW DIGITAL SCALE PARCHI (CPCB FORM 6)</span>
                </button>
              </>
            ) : (
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-kinetic-outline"
                style={{ width: '100%', height: '48px', borderColor: '#f59e0b', color: '#f59e0b' }}
                onClick={startWebcam}
              >
                <span>RE-SCAN WITH AN ELECTRONIC GADGET</span>
                <span className="btn-icon">
                  <Camera size={18} />
                </span>
              </motion.button>
            )}
          </div>

        </div>

      </div>

      {/* Digital Mandi Intake Slip Modal */}
      {showSlipModal && (
        <DigitalIntakeSlipModal 
          sample={selectedSample}
          onClose={() => setShowSlipModal(false)}
        />
      )}

    </div>
  );
}
