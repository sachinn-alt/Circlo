import React, { useState } from 'react';
import { 
  ArrowRight, 
  MapPin, 
  ShieldCheck, 
  Smartphone, 
  Sparkles, 
  CheckCircle2, 
  Scale, 
  Flame, 
  Leaf,
  Coins
} from 'lucide-react';

const HERO_SAMPLES = [
  {
    id: 'pcb',
    label: 'Telecom PCBs',
    device: 'High-Density Server Motherboard',
    weight: '1.4 kg',
    gold: '0.42g',
    copper: '580g',
    payout: '₹1,240',
    hazard: 'Low Risk · Safe Sort'
  },
  {
    id: 'laptop',
    label: 'Dead Laptop',
    device: 'Obsolete Dell Core i5 Laptop',
    weight: '2.1 kg',
    gold: '0.18g',
    copper: '350g',
    payout: '₹890',
    hazard: 'Lithium Battery Present'
  },
  {
    id: 'phones',
    label: 'Old Phones (x3)',
    device: '3 Discarded Android Phones',
    weight: '520g',
    gold: '0.11g',
    copper: '110g',
    payout: '₹460',
    hazard: 'Low Risk · Instant Cash'
  }
];

export default function HeroSection({ onNavigateTab }) {
  const [activeSample, setActiveSample] = useState(HERO_SAMPLES[0]);

  return (
    <section className="hero-wrapper">
      <div className="ambient-glow-top" />
      <div className="app-container">
        
        <div className="hero-grid">
          
          {/* Left Column: Headline & Value Proposition */}
          <div className="hero-content">
            
            {/* Live Badge */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span className="badge-pill">
                <span className="status-live-dot" />
                <span>Fair Trade E-Waste Network · 100% Digital Scale Guarantee</span>
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="hero-h1">
              Turn Broken Gadgets into <span className="hero-highlight">Fair Cash.</span> Protect Local Recyclers.
            </h1>

            {/* Lead Copy */}
            <p className="hero-lead">
              Circlo directly connects your household with verified neighborhood Kabadiwalas. 
              Get paid fair market rates via instant UPI, verify weight on calibrated digital scales, 
              and stop toxic backyard wire burning.
            </p>

            {/* CTA Buttons */}
            <div className="hero-cta-row">
              <button 
                className="btn-emerald"
                onClick={() => onNavigateTab('scanner')}
              >
                <Smartphone size={18} />
                <span>Scan Your Broken Device</span>
              </button>

              <button 
                className="btn-outline"
                onClick={() => onNavigateTab('map')}
              >
                <MapPin size={17} />
                <span>Find Nearby Collector</span>
              </button>
            </div>

            {/* Live Stats Ticker */}
            <div className="hero-stats-row">
              <div className="stat-item">
                <span className="stat-item-num">1.5M+</span>
                <span className="stat-item-lbl">Verified Local Collectors</span>
              </div>
              <div className="stat-item">
                <span className="stat-item-num" style={{ color: 'var(--primary-emerald)' }}>₹48,250</span>
                <span className="stat-item-lbl">Fair Payouts Protected</span>
              </div>
              <div className="stat-item">
                <span className="stat-item-num" style={{ color: '#38bdf8' }}>0 kg</span>
                <span className="stat-item-lbl">Toxic Backyard Burning</span>
              </div>
            </div>

          </div>

          {/* Right Column: Live Interactive Scrap Valuation Widget */}
          <div className="hero-widget-card">
            
            <div className="hero-widget-header">
              <div className="widget-title">
                <Sparkles size={18} className="text-emerald" />
                <span>Instant Scrap Cash Estimator</span>
              </div>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                Live MCX Spot Rates
              </span>
            </div>

            {/* Quick Sample Selector */}
            <div className="widget-sample-selector">
              <span style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 600 }}>
                Select a test household item:
              </span>
              <div className="sample-pills">
                {HERO_SAMPLES.map(sample => (
                  <button
                    key={sample.id}
                    className={`sample-pill-btn ${activeSample.id === sample.id ? 'active' : ''}`}
                    onClick={() => setActiveSample(sample)}
                  >
                    {sample.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Payout Display */}
            <div className="widget-payout-box">
              <div>
                <span style={{ fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
                  Guaranteed Cash Payout
                </span>
                <div className="widget-payout-val">{activeSample.payout}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span className="badge-pill" style={{ fontSize: '12px', padding: '4px 10px' }}>
                  <Scale size={13} />
                  <span>{activeSample.weight}</span>
                </span>
              </div>
            </div>

            {/* Material Recovery Breakdown */}
            <div style={{ marginBottom: '20px' }}>
              <div className="widget-breakdown-row">
                <span>Gold (Au) Recovered</span>
                <strong style={{ color: 'var(--gold-accent)' }}>{activeSample.gold}</strong>
              </div>
              <div className="widget-breakdown-row">
                <span>Copper (Cu) Recovered</span>
                <strong>{activeSample.copper}</strong>
              </div>
              <div className="widget-breakdown-row">
                <span>Safety Classification</span>
                <span style={{ color: 'var(--primary-emerald)' }}>{activeSample.hazard}</span>
              </div>
            </div>

            {/* Action Trigger */}
            <button 
              className="btn-emerald" 
              style={{ width: '100%' }}
              onClick={() => onNavigateTab('scanner')}
            >
              <span>Scan Your Item with AI Camera →</span>
            </button>

          </div>

        </div>

      </div>
    </section>
  );
}
