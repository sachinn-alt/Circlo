import React, { useState } from 'react';
import { 
  ArrowRight, 
  MapPin, 
  Smartphone, 
  Scale, 
  Coins, 
  Zap,
  ShieldCheck 
} from 'lucide-react';

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

export default function HeroSection({ onNavigateTab }) {
  const [activeSample, setActiveSample] = useState(KINETIC_SAMPLES[0]);

  return (
    <section className="kinetic-hero">
      <div className="kinetic-container">
        
        {/* Massive Viewport-Scaled Headline */}
        <div style={{ marginBottom: '20px' }}>
          <span style={{ 
            fontFamily: 'var(--font-space)', 
            fontSize: '14px', 
            fontWeight: 800, 
            letterSpacing: '0.15em', 
            color: 'var(--accent-color)' 
          }}>
            [ 01 // FAIR TRADE RECYCLING ENGINE ]
          </span>
        </div>

        <h1 className="kinetic-hero-headline">
          RECYCLE TECH.<br />
          <span className="text-accent">GET PAID CASH.</span><br />
          STOP THE BURNING.
        </h1>

        {/* 2-Column Split: Mission & Interactive Hard Inversion Estimator */}
        <div className="kinetic-hero-grid">
          
          {/* Left Column: Mission, Oversized Stats, and Action Buttons */}
          <div>
            <p className="hero-body-paragraph">
              Circlo bridges urban households directly with <strong>1.5 million certified local Kabadiwalas</strong>. 
              We eliminate cheating middlemen, enforce digital scale accuracy, and put an end to toxic backyard wire burning.
            </p>

            {/* Kinetic Action Buttons */}
            <div style={{ display: 'flex', gap: '16px', marginTop: '36px', flexWrap: 'wrap' }}>
              <button 
                className="btn-kinetic-primary"
                onClick={() => onNavigateTab('scanner')}
              >
                <Smartphone size={18} />
                <span>SCAN YOUR GADGET NOW</span>
              </button>

              <button 
                className="btn-kinetic-outline"
                onClick={() => onNavigateTab('map')}
              >
                <MapPin size={18} />
                <span>FIND NEARBY COLLECTORS</span>
              </button>
            </div>

            {/* Massive Numerical Graphic Stats */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr', 
              gap: '24px', 
              marginTop: '56px',
              paddingTop: '32px',
              borderTop: '2px solid var(--border-color)'
            }}>
              <div>
                <div className="kinetic-giant-num">1.5M</div>
                <p style={{ fontFamily: 'var(--font-space)', fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--muted-fg-color)' }}>
                  VERIFIED LOCAL COLLECTORS
                </p>
              </div>

              <div>
                <div className="kinetic-giant-num" style={{ color: 'var(--accent-color)' }}>85%</div>
                <p style={{ fontFamily: 'var(--font-space)', fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--muted-fg-color)' }}>
                  GUARANTEED FLOOR PRICE MINIMUM
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Hard Inversion Interactive Card */}
          <div className="kinetic-card-inversion">
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
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
                    color: activeSample.id === sample.id ? '#000000' : 'var(--fg-color)'
                  }}
                  onClick={() => setActiveSample(sample)}
                >
                  {sample.label}
                </button>
              ))}
            </div>

            {/* Big Payout Number */}
            <div style={{ marginBottom: '24px', borderTop: '2px solid var(--border-color)', borderBottom: '2px solid var(--border-color)', padding: '20px 0' }}>
              <span style={{ fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--muted-fg-color)' }}>
                CIVIC GUARANTEED CASH PAYOUT
              </span>
              <div className="payout-big-number">
                {activeSample.payout}
              </div>
              <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--muted-fg-color)' }}>
                WEIGHT: {activeSample.weight} · {activeSample.status}
              </span>
            </div>

            {/* Extracted Metal Breakdown */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', fontSize: '14px', fontWeight: 700 }}>
              <span>{activeSample.gold}</span>
              <span>{activeSample.copper}</span>
              <span>DIRECT UPI TRANSFER</span>
            </div>

            <button 
              className="btn-kinetic-primary" 
              style={{ width: '100%' }}
              onClick={() => onNavigateTab('scanner')}
            >
              <span>LAUNCH FULL AI SPECTROMETER →</span>
            </button>

          </div>

        </div>

      </div>
    </section>
  );
}
