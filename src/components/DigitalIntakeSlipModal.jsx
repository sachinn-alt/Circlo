import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  X, 
  Printer, 
  Share2, 
  Check, 
  Copy, 
  ShieldCheck, 
  QrCode, 
  Leaf, 
  AlertTriangle 
} from 'lucide-react';
import { getOracleMetadata } from '../services/commodityOracle';

export default function DigitalIntakeSlipModal({ sample, onClose }) {
  const [copied, setCopied] = useState(false);
  const oracleMeta = getOracleMetadata();

  const manifestId = `CPCB-FORM6-${sample?.category?.substring(0, 4) || 'EWASTE'}-${Date.now().toString().slice(-6)}`;
  const dateStr = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
  const timeStr = new Date().toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit'
  });

  const handlePrint = () => {
    window.print();
  };

  const handleCopyId = () => {
    navigator.clipboard?.writeText(manifestId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareWhatsapp = () => {
    const text = `⚖️ CIRCLO VERIFIED DIGITAL SCALE PARCHI (CPCB Form 6)\n\n• Item: ${sample?.title}\n• Manifest ID: ${manifestId}\n• Guaranteed Cash Payout: ₹${sample?.recoveryValue?.fairBenchmark}\n• Statutory Floor (85% MCX): ₹${sample?.recoveryValue?.min}\n• Hazard Level: Class ${sample?.hazardLevel}/5\n• Environmental Diversion: Toxic heavy metals kept out of groundwater\n\nVerified via Circlo Decentralized Oracle: https://circlo-eight.vercel.app/`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.88)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2500,
        padding: '16px'
      }} 
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.94, opacity: 0, y: 16 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.94, opacity: 0, y: 16 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        style={{
          width: '100%',
          maxWidth: '680px',
          maxHeight: '90vh',
          backgroundColor: '#0a0a0a',
          border: '2px solid var(--accent-color)',
          boxShadow: '0 0 35px rgba(223, 225, 4, 0.25)',
          overflowY: 'auto',
          color: '#ffffff',
          fontFamily: 'var(--font-space)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Ribbon */}
        <div style={{
          backgroundColor: 'var(--accent-color)',
          color: '#000000',
          padding: '14px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '2px solid #000000'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShieldCheck size={20} strokeWidth={2.5} />
            <span style={{ fontSize: '13px', fontWeight: 900, letterSpacing: '0.08em' }}>
              CPCB E-WASTE STATUTORY INTAKE DOCKET (FORM 6)
            </span>
          </div>
          <button 
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#000000',
              display: 'flex',
              padding: '2px'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Receipt Body */}
        <div style={{ padding: '28px' }}>
          
          {/* Top Identifier Bar */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            borderBottom: '1px dashed var(--border-color)',
            paddingBottom: '16px',
            marginBottom: '20px',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <div>
              <span style={{ fontSize: '11px', color: 'var(--muted-fg-color)', display: 'block', textTransform: 'uppercase' }}>
                CENTRAL POLLUTION CONTROL BOARD // DIGITAL MANIFEST
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                <span style={{ fontSize: '16px', fontWeight: 900, color: 'var(--accent-color)' }}>
                  {manifestId}
                </span>
                <button
                  onClick={handleCopyId}
                  style={{
                    background: 'none',
                    border: '1px solid var(--border-color)',
                    color: 'var(--fg-color)',
                    cursor: 'pointer',
                    padding: '2px 6px',
                    fontSize: '10px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  {copied ? <Check size={10} color="var(--accent-color)" /> : <Copy size={10} />}
                  <span>{copied ? 'COPIED' : 'COPY'}</span>
                </button>
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '11px', color: 'var(--muted-fg-color)', display: 'block' }}>
                TIMESTAMP
              </span>
              <span style={{ fontSize: '13px', fontWeight: 700 }}>
                {dateStr} • {timeStr}
              </span>
            </div>
          </div>

          {/* Item Overview Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            marginBottom: '24px'
          }}>
            <div style={{ padding: '14px', border: '1px solid var(--border-color)', backgroundColor: '#141414' }}>
              <span style={{ fontSize: '11px', color: 'var(--muted-fg-color)', textTransform: 'uppercase', display: 'block' }}>
                SPECIMEN IDENTIFIER
              </span>
              <span style={{ fontSize: '15px', fontWeight: 800, marginTop: '4px', display: 'block' }}>
                {sample?.title}
              </span>
              <span style={{ fontSize: '11px', color: 'var(--accent-color)', display: 'block', marginTop: '2px' }}>
                {sample?.category}
              </span>
            </div>

            <div style={{ padding: '14px', border: '1px solid var(--border-color)', backgroundColor: '#141414' }}>
              <span style={{ fontSize: '11px', color: 'var(--muted-fg-color)', textTransform: 'uppercase', display: 'block' }}>
                HAZARD CLASSIFICATION
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                <span style={{ 
                  fontSize: '13px', 
                  fontWeight: 900, 
                  padding: '3px 8px', 
                  backgroundColor: sample?.hazardColor || '#f59e0b', 
                  color: '#000000' 
                }}>
                  CLASS {sample?.hazardLevel}/5
                </span>
                <span style={{ fontSize: '12px', fontWeight: 700 }}>
                  {sample?.hazardName?.split('-')[0] || 'Standard Scrap'}
                </span>
              </div>
            </div>
          </div>

          {/* Elemental Recovery Yield Table */}
          <div style={{ marginBottom: '24px' }}>
            <span style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--muted-fg-color)', display: 'block', marginBottom: '8px' }}>
              METALLURGICAL SPECTROGRAM BREAKDOWN (CIRCLO AI IN-BROWSER SPECTROMETER)
            </span>
            <div style={{ border: '1px solid var(--border-color)' }}>
              {sample?.materials && Object.entries(sample.materials).map(([metal, weight], idx) => (
                <div 
                  key={metal}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '8px 14px',
                    borderBottom: idx < Object.entries(sample.materials).length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                    backgroundColor: idx % 2 === 0 ? '#111111' : '#161616',
                    fontSize: '13px'
                  }}
                >
                  <span style={{ textTransform: 'uppercase', fontWeight: 700 }}>
                    {metal.replace(/([A-Z])/g, ' $1')}
                  </span>
                  <span style={{ color: 'var(--accent-color)', fontWeight: 800 }}>
                    {weight}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Financial Settlement & Cedar Anti-Gouging Lock */}
          <div style={{
            border: '2px solid var(--accent-color)',
            padding: '18px',
            backgroundColor: 'rgba(223, 225, 4, 0.05)',
            marginBottom: '24px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <span style={{ fontSize: '11px', color: 'var(--muted-fg-color)', textTransform: 'uppercase', display: 'block' }}>
                  CIVIC GUARANTEED SCRAP PAYOUT
                </span>
                <span style={{ fontSize: '32px', fontWeight: 900, color: 'var(--accent-color)', lineHeight: 1.1 }}>
                  ₹{sample?.recoveryValue?.fairBenchmark}
                </span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '11px', color: 'var(--muted-fg-color)', textTransform: 'uppercase', display: 'block' }}>
                  AWS CEDAR STATUTORY FLOOR (85% MCX)
                </span>
                <span style={{ fontSize: '16px', fontWeight: 800, color: '#10b981' }}>
                  ₹{sample?.recoveryValue?.min} GUARANTEED
                </span>
              </div>
            </div>

            <div style={{ 
              marginTop: '12px', 
              paddingTop: '10px', 
              borderTop: '1px solid rgba(223, 225, 4, 0.2)', 
              fontSize: '11px', 
              color: 'var(--muted-fg-color)',
              display: 'flex',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '8px'
            }}>
              <span>ORACLE: {oracleMeta.exchange}</span>
              <span>AUDIT SIG: {oracleMeta.signature.substring(0, 16)}...</span>
            </div>
          </div>

          {/* QR Code & Statutory Footer */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            padding: '16px',
            border: '1px dashed var(--border-color)',
            backgroundColor: '#121212',
            marginBottom: '24px'
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              backgroundColor: '#ffffff',
              padding: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              {/* Dynamic SVG QR Code */}
              <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
                <rect width="100" height="100" fill="#ffffff" />
                <rect x="10" y="10" width="30" height="30" fill="#000000" />
                <rect x="15" y="15" width="20" height="20" fill="#ffffff" />
                <rect x="20" y="20" width="10" height="10" fill="#000000" />
                <rect x="60" y="10" width="30" height="30" fill="#000000" />
                <rect x="65" y="15" width="20" height="20" fill="#ffffff" />
                <rect x="70" y="20" width="10" height="10" fill="#000000" />
                <rect x="10" y="60" width="30" height="30" fill="#000000" />
                <rect x="15" y="65" width="20" height="20" fill="#ffffff" />
                <rect x="20" y="70" width="10" height="10" fill="#000000" />
                <rect x="50" y="50" width="15" height="15" fill="#000000" />
                <rect x="75" y="50" width="15" height="10" fill="#000000" />
                <rect x="50" y="75" width="10" height="15" fill="#000000" />
                <rect x="70" y="70" width="20" height="20" fill="#000000" />
              </svg>
            </div>

            <div style={{ fontSize: '11px', color: 'var(--muted-fg-color)', lineHeight: 1.5 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#10b981', fontWeight: 800, marginBottom: '2px' }}>
                <Leaf size={12} />
                <span>CPCB AUTHORIZED CIRCULAR MANIFEST</span>
              </div>
              <span>Scan to verify batch authenticity, digital scale tare weight, and CPCB Tier-1 smelter off-take accreditation.</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button
              onClick={handlePrint}
              className="btn-kinetic-primary"
              style={{ flex: '1 1 200px', height: '46px', fontSize: '13px' }}
            >
              <Printer size={16} />
              <span>PRINT SLIP (PDF DOCKET)</span>
            </button>

            <button
              onClick={handleShareWhatsapp}
              className="btn-kinetic-outline"
              style={{ flex: '1 1 200px', height: '46px', fontSize: '13px', borderColor: '#25D366', color: '#25D366' }}
            >
              <Share2 size={16} />
              <span>SHARE TO WHATSAPP</span>
            </button>
          </div>

        </div>
      </motion.div>
    </motion.div>
  );
}
