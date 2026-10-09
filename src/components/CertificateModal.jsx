import React from 'react';
import { motion } from 'framer-motion';
import { X, Award, Printer, QrCode } from 'lucide-react';

export default function CertificateModal({ certData, onClose }) {
  const handlePrint = () => {
    window.print();
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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2000,
        padding: '20px'
      }} 
      onClick={onClose}
    >
      
      <motion.div 
        initial={{ scale: 0.93, opacity: 0, y: 15 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        style={{
          backgroundColor: '#09090b',
          border: '2px solid var(--accent-color)',
          maxWidth: '720px',
          width: '100%',
          padding: '36px',
          color: '#fafafa'
        }} 
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid var(--border-color)', paddingBottom: '16px', marginBottom: '24px' }}>
          <div>
            <span style={{ fontFamily: 'var(--font-space)', fontSize: '11px', fontWeight: 800, color: 'var(--accent-color)', letterSpacing: '0.1em' }}>
              [ CPCB VERIFIABLE AUDIT DOCKET ]
            </span>
            <h3 style={{ fontFamily: 'var(--font-space)', fontSize: '24px', fontWeight: 800, textTransform: 'uppercase', marginTop: '4px' }}>
              CIRCULAR STEWARDSHIP CERTIFICATE
            </h3>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <motion.button 
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="btn-kinetic-outline"
              style={{ height: '38px', padding: '0 16px', fontSize: '12px' }}
              onClick={handlePrint}
            >
              <span className="btn-icon">
                <Printer size={14} />
              </span>
              <span>PRINT / PDF</span>
            </motion.button>
            <button 
              style={{ color: '#fafafa', background: 'none', border: 'none', cursor: 'pointer' }}
              onClick={onClose}
            >
              <X size={22} />
            </button>
          </div>
        </div>

        {/* Certificate Printable Inner Frame */}
        <div style={{ 
          border: '2px solid var(--border-color)', 
          padding: '28px',
          backgroundColor: '#000000'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div style={{ fontFamily: 'var(--font-space)', fontSize: '28px', fontWeight: 900, letterSpacing: '-0.05em' }}>
              CIRCLO // 2026
            </div>
            <span style={{ 
              backgroundColor: 'var(--accent-color)', 
              color: '#000000', 
              fontFamily: 'var(--font-space)', 
              fontSize: '11px', 
              fontWeight: 800, 
              padding: '4px 10px' 
            }}>
              CPCB EPR COMPLIANT
            </span>
          </div>

          <p style={{ fontFamily: 'var(--font-inter)', fontSize: '14px', color: 'var(--muted-fg-color)', marginBottom: '24px' }}>
            This document certifies verifiable e-waste diversion from burning landfills, heavy metal recovery, and informal collector economic inclusion.
          </p>

          {/* Key Metrics Grid */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(4, 1fr)', 
            gap: '2px', 
            backgroundColor: 'var(--border-color)',
            border: '2px solid var(--border-color)',
            marginBottom: '24px'
          }}>
            <div style={{ backgroundColor: '#09090b', padding: '16px' }}>
              <strong style={{ fontFamily: 'var(--font-space)', fontSize: '24px', color: '#10b981', display: 'block' }}>
                {certData?.co2Kg || 148} KG
              </strong>
              <span style={{ fontSize: '11px', color: 'var(--muted-fg-color)' }}>CO₂ ABATED</span>
            </div>
            <div style={{ backgroundColor: '#09090b', padding: '16px' }}>
              <strong style={{ fontFamily: 'var(--font-space)', fontSize: '24px', color: 'var(--accent-color)', display: 'block' }}>
                {certData?.goldGrams || 0.45}G
              </strong>
              <span style={{ fontSize: '11px', color: 'var(--muted-fg-color)' }}>GOLD SAVED</span>
            </div>
            <div style={{ backgroundColor: '#09090b', padding: '16px' }}>
              <strong style={{ fontFamily: 'var(--font-space)', fontSize: '24px', color: '#fafafa', display: 'block' }}>
                {certData?.copperKg || 1.85} KG
              </strong>
              <span style={{ fontSize: '11px', color: 'var(--muted-fg-color)' }}>COPPER RECOVERED</span>
            </div>
            <div style={{ backgroundColor: '#09090b', padding: '16px' }}>
              <strong style={{ fontFamily: 'var(--font-space)', fontSize: '24px', color: '#38bdf8', display: 'block' }}>
                100%
              </strong>
              <span style={{ fontSize: '11px', color: 'var(--muted-fg-color)' }}>UPI PAID</span>
            </div>
          </div>

          {/* Verification Hash & Signature */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '2px solid var(--border-color)', paddingTop: '16px', fontSize: '12px' }}>
            <div>
              <span style={{ color: 'var(--muted-fg-color)', display: 'block' }}>TRANSACTION BATCH UID:</span>
              <strong style={{ fontFamily: 'var(--font-space)', color: 'var(--accent-color)' }}>
                CIRCLO-2026-EPR-98124-DELHI
              </strong>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ color: 'var(--muted-fg-color)', display: 'block' }}>POLICY VERIFICATION:</span>
              <strong style={{ fontFamily: 'var(--font-space)', color: '#ffffff' }}>
                CEDAR.SAFE_DISPOSAL.AUTHORIZED
              </strong>
            </div>
          </div>
        </div>

      </motion.div>
    </motion.div>
  );
}
