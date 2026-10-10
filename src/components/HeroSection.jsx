import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  ArrowRight, 
  MapPin, 
  Smartphone, 
  Scale, 
  Coins, 
  Zap,
  ShieldCheck,
  Cloud,
  MessageCircle
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { generateWhatsAppBookingUrl } from '../services/whatsappService';

const KINETIC_SAMPLES = [
  {
    id: 'pcb',
    label: '01 / TELECOM PCBS',
    name: 'HIGH-DENSITY SERVER BOARD',
    weight: '1.4 KG',
    gold: '0.42G GOLD',
    copper: '580G COPPER',
    payout: '₹1,240',
    status: 'HAZMAT VERIFIED'
  },
  {
    id: 'laptop',
    label: '02 / DEAD LAPTOP',
    name: 'DELL CORE I5 OBSOLETE CHASSIS',
    weight: '2.1 KG',
    gold: '0.18G GOLD',
    copper: '350G COPPER',
    payout: '₹890',
    status: 'LITHIUM PROTECTED'
  },
  {
    id: 'phones',
    label: '03 / OLD PHONES (X3)',
    name: '3 DISCARDED ANDROID PHONES',
    weight: '520 GRAMS',
    gold: '0.11G GOLD',
    copper: '110G COPPER',
    payout: '₹460',
    status: 'INSTANT UPI READY'
  }
];

export default function HeroSection({ onNavigateTab, onOpenAwsArch }) {
  const { t } = useLanguage();
  const [activeSample, setActiveSample] = useState(KINETIC_SAMPLES[0]);

  // Framer Motion scroll parallax effect on hero
  const { scrollY } = useScroll();
  const headlineScale = useTransform(scrollY, [0, 400], [1, 1.05]);
  const headlineOpacity = useTransform(scrollY, [0, 500], [1, 0.85]);

  return (
    <section className="kinetic-hero">
      <div className="kinetic-container">
        
        {/* Kinetic Header Eyebrow with Pulsing Live Dot */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}
        >
          <span className="kinetic-live-dot" />
          <span style={{ 
            fontFamily: 'var(--font-space)', 
            fontSize: '14px', 
            fontWeight: 800, 
            letterSpacing: '0.15em', 
            color: 'var(--accent-color)' 
          }}>
            [ 01 // FAIR TRADE RECYCLING PROTOCOL · LIVE SPOT ORACLES ]
          </span>
        </motion.div>

        {/* Massive Viewport-Scaled Headline with Framer Motion Masked Stagger */}
        <motion.div 
          style={{ scale: headlineScale, opacity: headlineOpacity, transformOrigin: 'top left' }}
        >
          <h1 className="kinetic-hero-headline">
            {/* Line 1: RECYCLE TECH. */}
            <span className="text-mask-wrapper">
              <motion.span 
                className="kinetic-text-line"
                initial={{ y: '115%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              >
                RECYCLE TECH.
              </motion.span>
            </span>

            {/* Line 2: GET PAID CASH. */}
            <span className="text-mask-wrapper">
              <motion.span 
                className="kinetic-text-line text-accent"
                initial={{ y: '115%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
              >
                GET PAID CASH.
              </motion.span>
            </span>

            {/* Line 3: STOP THE BURNING. */}
            <span className="text-mask-wrapper">
              <motion.span 
                className="kinetic-text-line"
                initial={{ y: '115%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
              >
                STOP THE BURNING.
              </motion.span>
            </span>
          </h1>
        </motion.div>

        {/* 2-Column Split: Mission & Interactive Hard Inversion Estimator */}
        <div className="kinetic-hero-grid">
          
          {/* Left Column: Mission, Oversized Stats, and Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="hero-body-paragraph">
              Circlo bridges urban households directly with <strong>1.5 million certified local Kabadiwalas</strong>. 
              We eliminate cheating middlemen, enforce digital scale accuracy, and put an end to toxic backyard wire burning.
            </p>

            {/* Kinetic Action Buttons with Micro-Animations */}
            <div style={{ display: 'flex', gap: '14px', marginTop: '32px', flexWrap: 'wrap' }}>
              <motion.button 
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="btn-kinetic-primary"
                style={{ flex: '1 1 240px' }}
                onClick={() => onNavigateTab('scanner')}
              >
                <span className="btn-icon">
                  <Smartphone size={18} />
                </span>
                <span>SCAN YOUR GADGET NOW</span>
                <span className="btn-icon">
                  <ArrowRight size={16} />
                </span>
              </motion.button>

              <motion.button 
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="btn-kinetic-outline"
                style={{ flex: '1 1 200px' }}
                onClick={() => onNavigateTab('map')}
              >
                <span className="btn-icon">
                  <MapPin size={18} />
                </span>
                <span>FIND NEARBY COLLECTORS</span>
              </motion.button>

              <motion.button 
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="btn-kinetic-outline"
                style={{ flex: '1 1 180px', borderColor: 'var(--accent-color)', color: 'var(--accent-color)' }}
                onClick={onOpenAwsArch}
              >
                <span className="btn-icon">
                  <Cloud size={18} />
                </span>
                <span>AWS ARCHITECTURE</span>
              </motion.button>
            </div>

            {/* Massive Numerical Graphic Stats with Hover Scale */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', 
              gap: '20px', 
              marginTop: '44px',
              paddingTop: '28px',
              borderTop: '2px solid var(--border-color)'
            }}>
              <motion.div whileHover={{ x: 4 }}>
                <div className="kinetic-giant-num">1.5M</div>
                <p style={{ fontFamily: 'var(--font-space)', fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--muted-fg-color)', marginTop: '6px' }}>
                  VERIFIED LOCAL COLLECTORS
                </p>
              </motion.div>

              <motion.div whileHover={{ x: 4 }}>
                <div className="kinetic-giant-num" style={{ color: 'var(--accent-color)' }}>85%</div>
                <p style={{ fontFamily: 'var(--font-space)', fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--muted-fg-color)', marginTop: '6px' }}>
                  GUARANTEED FLOOR PRICE MINIMUM
                </p>
              </motion.div>
            </div>

          </motion.div>

          {/* Right Column: Hard Inversion Interactive Card with Motion */}
          <motion.div 
            className="kinetic-card-inversion"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4 }}
          >
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '6px' }}>
              <span className="kinetic-card-eyebrow">
                INSTANT SCRAP VALUATOR
              </span>
              <span style={{ fontFamily: 'var(--font-space)', fontSize: '12px', fontWeight: 700, color: 'var(--muted-fg-color)' }}>
                [ HOVER TO INVERT ]
              </span>
            </div>

            <h3 className="kinetic-card-title">
              {activeSample.name}
            </h3>

            {/* 3 Preset Switchers */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
              {KINETIC_SAMPLES.map(sample => (
                <button
                  key={sample.id}
                  style={{
                    padding: '8px 14px',
                    fontSize: '12px',
                    fontWeight: 800,
                    border: '2px solid var(--border-color)',
                    backgroundColor: activeSample.id === sample.id ? 'var(--accent-color)' : 'transparent',
                    color: activeSample.id === sample.id ? '#000000' : 'var(--fg-color)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                  onClick={() => setActiveSample(sample)}
                >
                  {sample.label}
                </button>
              ))}
            </div>

            {/* Big Payout Number with Animated Shift */}
            <div style={{ marginBottom: '24px', borderTop: '2px solid var(--border-color)', borderBottom: '2px solid var(--border-color)', padding: '20px 0' }}>
              <span style={{ fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--muted-fg-color)' }}>
                CIVIC GUARANTEED CASH PAYOUT
              </span>
              <motion.div 
                key={activeSample.payout}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="payout-big-number"
              >
                {activeSample.payout}
              </motion.div>
              <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--muted-fg-color)' }}>
                WEIGHT: {activeSample.weight} · {activeSample.status}
              </span>
            </div>

            {/* Extracted Metal Breakdown */}
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', flexWrap: 'wrap', marginBottom: '24px', fontSize: '13px', fontWeight: 700 }}>
              <span style={{ backgroundColor: 'var(--muted-color)', padding: '4px 8px' }}>{activeSample.gold}</span>
              <span style={{ backgroundColor: 'var(--muted-color)', padding: '4px 8px' }}>{activeSample.copper}</span>
              <span style={{ color: 'var(--accent-color)', padding: '4px 0' }}>DIRECT UPI TRANSFER</span>
            </div>


            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  const url = generateWhatsAppBookingUrl({
                    itemName: activeSample.name,
                    estimatedWeight: activeSample.weight,
                    payout: activeSample.payout,
                    city: "Kolkata / Salt Lake (Doorstep Dispatch)"
                  });
                  window.open(url, '_blank');
                }}
                style={{
                  width: '100%',
                  padding: '14px',
                  backgroundColor: '#25D366',
                  color: '#000000',
                  fontWeight: 900,
                  fontSize: '13px',
                  fontFamily: 'var(--font-space)',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <MessageCircle size={16} />
                <span>BOOK THIS CASH VIA WHATSAPP (1-TAP)</span>
              </motion.button>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-kinetic-primary" 
                style={{ width: '100%' }}
                onClick={() => onNavigateTab('scanner')}
              >
                <span>LAUNCH FULL AI SPECTROMETER</span>
                <span className="btn-icon">
                  <ArrowRight size={18} />
                </span>
              </motion.button>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}
