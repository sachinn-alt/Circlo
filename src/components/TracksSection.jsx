import React from 'react';
import { 
  Smartphone, 
  MapPin, 
  Coins, 
  Scale, 
  ShieldCheck, 
  Flame, 
  CheckCircle2, 
  XCircle,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export default function TracksSection({ onSelectWasteTrack }) {
  return (
    <section className="section-wrapper" id="how-it-works">
      <div className="app-container">
        
        {/* Section Heading */}
        <div className="section-head">
          <div className="section-eyebrow">Zero Hassle · Fair Pricing</div>
          <h2 className="section-h2">How Circlo Works in 3 Easy Steps</h2>
          <p className="section-desc">
            Recycling your old electronics should be effortless. We eliminate middlemen cheating 
            so you get maximum value while protecting local recycling workers.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="steps-grid">
          
          {/* Step 1 */}
          <div className="step-card">
            <div className="step-number-tag">01</div>
            <h3 className="step-title">Snap & Instant Valuation</h3>
            <p className="step-text">
              Take a photo of any broken gadget or dead battery. 
              Our smart camera instantly identifies the materials inside (gold, copper, lithium) 
              and calculates your guaranteed cash payout.
            </p>
            <div className="step-features-list">
              <div className="step-feature-item">
                <CheckCircle2 size={16} className="text-emerald" />
                <span>AI Material Identification</span>
              </div>
              <div className="step-feature-item">
                <CheckCircle2 size={16} className="text-emerald" />
                <span>Live Gold & Copper Scrap Rates</span>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="step-card">
            <div className="step-number-tag">02</div>
            <h3 className="step-title">Match Nearby Collector</h3>
            <p className="step-text">
              View verified neighborhood Kabadiwalas within 2 to 5 km. 
              Book a free doorstep pickup at your preferred time or drop off at a verified civic collection point.
            </p>
            <div className="step-features-list">
              <div className="step-feature-item">
                <CheckCircle2 size={16} className="text-emerald" />
                <span>100% Calibrated Digital Scale</span>
              </div>
              <div className="step-feature-item">
                <CheckCircle2 size={16} className="text-emerald" />
                <span>Verified Collector ID & Badges</span>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="step-card" style={{ borderColor: 'rgba(16, 185, 129, 0.35)', background: 'linear-gradient(180deg, #111827 0%, rgba(16, 185, 129, 0.05) 100%)' }}>
            <div className="step-number-tag" style={{ background: 'var(--emerald-gradient)', color: '#ffffff' }}>03</div>
            <h3 className="step-title">Instant Cash & Certificate</h3>
            <p className="step-text">
              The collector weighs your batch, verifies the price on the app, and pays you immediately via UPI. 
              You instantly receive an official digital disposal certificate.
            </p>
            <div className="step-features-list">
              <div className="step-feature-item">
                <CheckCircle2 size={16} className="text-emerald" />
                <span>Zero Middlemen Deductions</span>
              </div>
              <div className="step-feature-item">
                <CheckCircle2 size={16} className="text-emerald" />
                <span>Audited CPCB Green Certificate</span>
              </div>
            </div>
          </div>

        </div>

        {/* Comparison Table: Traditional Scrap vs Circlo */}
        <div className="comparison-card">
          <div className="comparison-header">
            <span style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)' }}>
              Standard Feature
            </span>
            <span style={{ color: '#f87171', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <XCircle size={16} /> Traditional Scrap Market
            </span>
            <span style={{ color: 'var(--primary-emerald)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle2 size={16} /> Circlo Verified Network
            </span>
          </div>

          {/* Row 1 */}
          <div className="comparison-row">
            <strong style={{ color: 'var(--text-white)' }}>Weighing Scales</strong>
            <span className="col-traditional">Manual spring scales frequently rigged by 20–30% against you</span>
            <span className="col-circlo">Certified digital Bluetooth scale with live photo verification</span>
          </div>

          {/* Row 2 */}
          <div className="comparison-row">
            <strong style={{ color: 'var(--text-white)' }}>Scrap Pricing</strong>
            <span className="col-traditional">Arbitrary broker guessing; middlemen keep 75% of precious metal value</span>
            <span className="col-circlo">MCX commodity spot pricing with strict 85% minimum price floor</span>
          </div>

          {/* Row 3 */}
          <div className="comparison-row">
            <strong style={{ color: 'var(--text-white)' }}>Worker Safety & Fumes</strong>
            <span className="col-traditional">Burning wires in open backyards, releasing toxic lead & mercury smoke</span>
            <span className="col-circlo">Zero open-air burning; certified protective safety gear for collectors</span>
          </div>

          {/* Row 4 */}
          <div className="comparison-row" style={{ borderBottom: 'none' }}>
            <strong style={{ color: 'var(--text-white)' }}>Payment & Proof</strong>
            <span className="col-traditional">Untraced cash with zero receipt; discarded parts end up in landfills</span>
            <span className="col-circlo">Instant direct UPI bank transfer + verifiable CPCB recycling certificate</span>
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div style={{ 
          marginTop: '48px', 
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'center',
          gap: '16px',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
          <button 
            className="btn-emerald"
            onClick={onSelectWasteTrack}
          >
            <Smartphone size={17} />
            <span>Launch the AI Scanner & Test a Device</span>
          </button>
        </div>

      </div>
    </section>
  );
}
