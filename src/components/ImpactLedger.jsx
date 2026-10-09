import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { motion } from 'framer-motion';
import { 
  Award, 
  Leaf, 
  Droplets, 
  Coins, 
  Sparkles, 
  Download,
  CheckCircle2,
  ArrowRight 
} from 'lucide-react';
import { IMPACT_STATISTICS } from '../data/mockData';

export default function ImpactLedger({ onOpenCertificateModal }) {
  const [calcLaptops, setCalcLaptops] = useState(3);
  const [calcPhones, setCalcPhones] = useState(6);
  const [calcBatteries, setCalcBatteries] = useState(4);

  const estimatedGoldGrams = (calcLaptops * 0.082 + calcPhones * 0.034).toFixed(2);
  const estimatedCopperKg = (calcLaptops * 0.35 + calcPhones * 0.08 + calcBatteries * 0.12).toFixed(2);
  const estimatedCo2AvoidedKg = ((calcLaptops * 32) + (calcPhones * 14) + (calcBatteries * 18)).toFixed(0);

  const handleGenerateCertificate = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    if (onOpenCertificateModal) {
      onOpenCertificateModal({
        laptops: calcLaptops,
        phones: calcPhones,
        batteries: calcBatteries,
        goldGrams: estimatedGoldGrams,
        copperKg: estimatedCopperKg,
        co2Kg: estimatedCo2AvoidedKg
      });
    }
  };

  return (
    <div style={{ paddingTop: '20px', paddingBottom: '60px' }}>
      
      {/* Section Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ marginBottom: '32px' }}
      >
        <span style={{ 
          fontFamily: 'var(--font-space)', 
          fontSize: '13px', 
          fontWeight: 800, 
          letterSpacing: '0.12em', 
          color: 'var(--accent-color)',
          display: 'inline-flex',
          alignItems: 'center'
        }}>
          <span className="kinetic-live-dot" />
          [ IMPACT AUDIT // CPCB EXTENDED PRODUCER RESPONSIBILITY LEDGER ]
        </span>
        <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 800, textTransform: 'uppercase', marginTop: '8px' }}>
          ENVIRONMENTAL IMPACT LEDGER.
        </h2>
        <p style={{ fontFamily: 'var(--font-inter)', fontSize: '18px', color: 'var(--muted-fg-color)', maxWidth: '640px', marginTop: '12px' }}>
          Real ecological diversion numbers, neurotoxic lead protection, and formal Extended Producer Responsibility (EPR) compliance audit metrics.
        </p>
      </motion.div>

      {/* Massive Graphic Metric Numbers in Hairline Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(3, 1fr)', 
        gap: '2px', 
        backgroundColor: 'var(--border-color)',
        border: '2px solid var(--border-color)',
        marginBottom: '40px'
      }}>
        <motion.div 
          whileHover={{ y: -4, backgroundColor: 'var(--muted-color)' }}
          style={{ backgroundColor: 'var(--bg-color)', padding: '36px', transition: 'background-color 0.2s ease' }}
        >
          <div className="kinetic-giant-num">142.8</div>
          <h4 style={{ fontSize: '20px', fontWeight: 800, textTransform: 'uppercase', marginTop: '8px' }}>
            TONNES DIVERTED
          </h4>
          <p style={{ fontSize: '14px', color: 'var(--muted-fg-color)', marginTop: '4px' }}>
            Intercepted from Ghazipur & Bhalaswa burning dumpsites.
          </p>
        </motion.div>

        <motion.div 
          whileHover={{ y: -4, backgroundColor: 'var(--muted-color)' }}
          style={{ backgroundColor: 'var(--bg-color)', padding: '36px', transition: 'background-color 0.2s ease' }}
        >
          <div className="kinetic-giant-num" style={{ color: 'var(--accent-color)' }}>3.1M</div>
          <h4 style={{ fontSize: '20px', fontWeight: 800, textTransform: 'uppercase', marginTop: '8px' }}>
            LITERS WATER SAVED
          </h4>
          <p style={{ fontSize: '14px', color: 'var(--muted-fg-color)', marginTop: '4px' }}>
            Groundwater protected from mercury & cadmium acid leach.
          </p>
        </motion.div>

        <motion.div 
          whileHover={{ y: -4, backgroundColor: 'var(--muted-color)' }}
          style={{ backgroundColor: 'var(--bg-color)', padding: '36px', transition: 'background-color 0.2s ease' }}
        >
          <div className="kinetic-giant-num">₹48.2K</div>
          <h4 style={{ fontSize: '20px', fontWeight: 800, textTransform: 'uppercase', marginTop: '8px' }}>
            FAIR VALUE PAID
          </h4>
          <p style={{ fontSize: '14px', color: 'var(--muted-fg-color)', marginTop: '4px' }}>
            Disbursed directly into citizen and collector UPI accounts.
          </p>
        </motion.div>
      </div>

      {/* Interactive Certificate Generator Calculator */}
      <div style={{ 
        border: '2px solid var(--border-color)', 
        backgroundColor: 'var(--muted-color)', 
        padding: '36px' 
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h3 style={{ fontSize: '22px', fontWeight: 800, textTransform: 'uppercase' }}>
              CALCULATE YOUR HOUSEHOLD CIRCULAR FOOTPRINT
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--muted-fg-color)', marginTop: '4px' }}>
              Adjust your obsolete devices to compute exact carbon savings and mint a verifiable CPCB certificate.
            </p>
          </div>
          <motion.button 
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="btn-kinetic-primary"
            onClick={handleGenerateCertificate}
          >
            <span className="btn-icon">
              <Award size={18} />
            </span>
            <span>GENERATE VERIFIED CERTIFICATE</span>
          </motion.button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '32px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '8px' }}>
              OBSOLETE LAPTOPS: {calcLaptops} UNITS
            </label>
            <input 
              type="range" 
              min="0" 
              max="20" 
              value={calcLaptops} 
              onChange={(e) => setCalcLaptops(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--accent-color)' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '8px' }}>
              OLD SMARTPHONES: {calcPhones} UNITS
            </label>
            <input 
              type="range" 
              min="0" 
              max="30" 
              value={calcPhones} 
              onChange={(e) => setCalcPhones(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--accent-color)' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '8px' }}>
              BATTERY PACKS: {calcBatteries} UNITS
            </label>
            <input 
              type="range" 
              min="0" 
              max="20" 
              value={calcBatteries} 
              onChange={(e) => setCalcBatteries(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--accent-color)' }}
            />
          </div>
        </div>

        {/* Calculated Yield Banner */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(3, 1fr)', 
          gap: '16px',
          borderTop: '2px solid var(--border-color)',
          paddingTop: '24px'
        }}>
          <div>
            <span style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--muted-fg-color)' }}>
              GOLD (AU) EXTRACTABLE:
            </span>
            <div style={{ fontFamily: 'var(--font-space)', fontSize: '28px', fontWeight: 800, color: 'var(--accent-color)' }}>
              {estimatedGoldGrams} GRAMS
            </div>
          </div>

          <div>
            <span style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--muted-fg-color)' }}>
              COPPER (CU) SAVED:
            </span>
            <div style={{ fontFamily: 'var(--font-space)', fontSize: '28px', fontWeight: 800, color: 'var(--fg-color)' }}>
              {estimatedCopperKg} KG
            </div>
          </div>

          <div>
            <span style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--muted-fg-color)' }}>
              CO₂ EMISSIONS PREVENTED:
            </span>
            <div style={{ fontFamily: 'var(--font-space)', fontSize: '28px', fontWeight: 800, color: '#10b981' }}>
              {estimatedCo2AvoidedKg} KG CO₂e
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
