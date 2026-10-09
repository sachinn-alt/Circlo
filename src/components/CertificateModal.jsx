import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  X, 
  Printer, 
  Share2, 
  Copy, 
  Check, 
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function CertificateModal({ certData, onClose }) {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const auditHash = certData?.hash || "CIRCLO-2026-EPR-98124-DELHI";

  const handlePrint = () => {
    window.print();
  };

  const handleCopyHash = () => {
    navigator.clipboard?.writeText(auditHash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleShareWhatsapp = () => {
    const text = `♻️ Certified E-Waste Circular Recovery Docket from CIRCLO (सर्कलो)\n\n• Diverted: ${certData?.weightKg || 142.8}kg toxic scrap\n• CO₂ Prevented: ${certData?.co2Kg || 148}kg\n• Reclaimed Gold: ${certData?.goldGrams || 0.45}g\n• Verified CPCB EPR Audit Hash: ${auditHash}\n\nVerify live on platform: https://circlo-eight.vercel.app/`;
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
        backgroundColor: 'rgba(0, 0, 0, 0.90)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2500,
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
          maxWidth: '780px',
          width: '100%',
          padding: '36px',
          color: '#fafafa'
        }} 
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header Controls */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid var(--border-color)', paddingBottom: '16px', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <span style={{ fontFamily: 'var(--font-space)', fontSize: '11px', fontWeight: 800, color: 'var(--accent-color)', letterSpacing: '0.1em' }}>
              [ CPCB VERIFIABLE AUDIT DOCKET ]
            </span>
            <h3 style={{ fontFamily: 'var(--font-space)', fontSize: '24px', fontWeight: 800, textTransform: 'uppercase', marginTop: '4px' }}>
              {t('certTitle')}
            </h3>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
            {/* WhatsApp Share Button */}
            <motion.button 
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="btn-kinetic-outline"
              style={{ height: '38px', padding: '0 14px', fontSize: '12px', borderColor: '#25D366', color: '#25D366' }}
              onClick={handleShareWhatsapp}
              title="Share verified certificate to WhatsApp"
            >
              <Share2 size={14} />
              <span>{t('certShareWhatsapp')}</span>
            </motion.button>

            {/* Print / PDF Trigger */}
            <motion.button 
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="btn-kinetic-outline"
              style={{ height: '38px', padding: '0 14px', fontSize: '12px' }}
              onClick={handlePrint}
            >
              <Printer size={14} />
              <span>{t('certPrint')}</span>
            </motion.button>

            {/* Close Button */}
            <button 
              style={{ color: '#fafafa', background: 'none', border: 'none', cursor: 'pointer', padding: '6px' }}
              onClick={onClose}
            >
              <X size={22} />
            </button>
          </div>
        </div>

        {/* Certificate Printable Inner Frame */}
        <div 
          id="circlo-printable-certificate"
          style={{ 
            border: '2px solid var(--border-color)', 
            padding: '28px',
            backgroundColor: '#000000'
          }}
        >
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
            This document certifies verifiable e-waste diversion from burning landfills, heavy metal recovery, and informal collector economic inclusion under India E-Waste Management Rules 2022.
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

          {/* Verification Hash & Signature with Copy Trigger */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '2px solid var(--border-color)', paddingTop: '16px', fontSize: '12px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <span style={{ color: 'var(--muted-fg-color)', display: 'block' }}>TRANSACTION BATCH UID:</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px' }}>
                <strong style={{ fontFamily: 'var(--font-space)', color: 'var(--accent-color)', fontSize: '13px' }}>
                  {auditHash}
                </strong>
                <button 
                  onClick={handleCopyHash}
                  style={{ 
                    background: 'none', 
                    border: '1px solid var(--border-color)', 
                    color: copied ? 'var(--accent-color)' : '#fafafa', 
                    cursor: 'pointer', 
                    padding: '2px 6px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '10px',
                    fontFamily: 'var(--font-space)',
                    fontWeight: 800
                  }}
                  title="Copy Audit Hash"
                >
                  {copied ? <Check size={10} /> : <Copy size={10} />}
                  <span>{copied ? t('certHashCopied') : t('certCopyHash')}</span>
                </button>
              </div>
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
