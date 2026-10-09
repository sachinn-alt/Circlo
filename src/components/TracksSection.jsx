import React from 'react';
import Marquee from 'react-fast-marquee';
import { 
  Smartphone, 
  MapPin, 
  Coins, 
  Scale, 
  ShieldCheck, 
  CheckCircle2, 
  XCircle,
  ArrowRight 
} from 'lucide-react';

export default function TracksSection({ onSelectWasteTrack }) {
  return (
    <div>
      
      {/* Testimonials Slower Marquee Strip */}
      <div className="kinetic-marquee-dark">
        <Marquee speed={45} gradient={false} autoFill={true}>
          <div className="marquee-item">
            <span>★ "EARNED ₹1,240 FOR DEAD SERVER BOARDS IN 15 MINUTES" — ANANYA R. (DELHI)</span>
            <span className="marquee-divider" />
          </div>
          <div className="marquee-item">
            <span>★ "DIGITAL SCALES PREVENTED 30% THEFT ON OUR SCRAP BATCH" — RESIDENTS WELFARE FORUM</span>
            <span className="marquee-divider" />
          </div>
          <div className="marquee-item">
            <span>★ "INCOME INCREASED BY +38% WITH TRANSPARENT DAILY COMMODITY RATES" — RAMESH K. (COLLECTOR)</span>
            <span className="marquee-divider" />
          </div>
          <div className="marquee-item">
            <span>★ "CPCB RECYCLING CERTIFICATES VERIFIED FOR ISO AUDITS" — APEX TECH CLINIC</span>
            <span className="marquee-divider" />
          </div>
        </Marquee>
      </div>

      <section className="kinetic-section" id="how-it-works">
        <div className="kinetic-container">
          
          {/* Section Header */}
          <div className="kinetic-section-header">
            <span style={{ 
              fontFamily: 'var(--font-space)', 
              fontSize: '14px', 
              fontWeight: 800, 
              color: 'var(--accent-color)', 
              letterSpacing: '0.12em' 
            }}>
              [ 02 // THREE-STAGE DISRUPTION PROTOCOL ]
            </span>
            <h2 className="kinetic-section-title" style={{ marginTop: '12px' }}>
              HOW CIRCLO WORKS.
            </h2>
            <p style={{ fontFamily: 'var(--font-inter)', fontSize: '20px', color: 'var(--muted-fg-color)', maxWidth: '640px', marginTop: '16px' }}>
              We eliminate predatory scrap broker cartels with radical transparency, computer vision valuation, and instant digital payments.
            </p>
          </div>

          {/* 3-Cell Connected Hairline Grid (Hard Hover Inversion) */}
          <div className="hairline-grid-3">
            
            {/* Cell 01 */}
            <div className="hairline-grid-cell">
              <div className="kinetic-giant-num">01</div>
              <h3 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '14px' }}>
                SCAN & VALUE TECH
              </h3>
              <p style={{ fontSize: '16px', lineHeight: 1.6, marginBottom: '24px' }}>
                Snap a photo of any broken gadget. Our vision algorithms classify rare components, 
                extract elemental yields (gold, copper, lithium), and compute guaranteed floor prices.
              </p>
              <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '2px solid currentColor' }}>
                <span style={{ fontFamily: 'var(--font-space)', fontSize: '13px', fontWeight: 800 }}>
                  [ LIVE MCX SPOT ORACLES ]
                </span>
              </div>
            </div>

            {/* Cell 02 */}
            <div className="hairline-grid-cell">
              <div className="kinetic-giant-num">02</div>
              <h3 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '14px' }}>
                MATCH LOCAL COLLECTOR
              </h3>
              <p style={{ fontSize: '16px', lineHeight: 1.6, marginBottom: '24px' }}>
                Locate certified neighborhood Kabadiwalas within walking distance. 
                Request a doorstep pickup with certified digital scales or drop off at a verified civic hub.
              </p>
              <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '2px solid currentColor' }}>
                <span style={{ fontFamily: 'var(--font-space)', fontSize: '13px', fontWeight: 800 }}>
                  [ CALIBRATED BLUETOOTH SCALE ]
                </span>
              </div>
            </div>

            {/* Cell 03 */}
            <div className="hairline-grid-cell">
              <div className="kinetic-giant-num">03</div>
              <h3 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '14px' }}>
                INSTANT CASH & PROOF
              </h3>
              <p style={{ fontSize: '16px', lineHeight: 1.6, marginBottom: '24px' }}>
                Get paid immediately to your UPI bank handle without middlemen cuts. 
                Receive an official digital certificate proving zero open-air toxic burning.
              </p>
              <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '2px solid currentColor' }}>
                <span style={{ fontFamily: 'var(--font-space)', fontSize: '13px', fontWeight: 800 }}>
                  [ AUDITED CPCB EPR MINTING ]
                </span>
              </div>
            </div>

          </div>

          {/* Brutalist Comparison Table */}
          <div className="kinetic-table-container">
            
            {/* Header Row */}
            <div className="kinetic-table-row kinetic-table-header">
              <div>CRITERIA</div>
              <div style={{ color: '#f87171' }}>TRADITIONAL SCRAP MIDDLEMEN</div>
              <div style={{ color: 'var(--accent-color)' }}>CIRCLO VERIFIED NETWORK</div>
            </div>

            {/* Row 1 */}
            <div className="kinetic-table-row">
              <strong style={{ color: 'var(--fg-color)' }}>WEIGHING ACCURACY</strong>
              <div style={{ color: '#f87171' }}>Rigged manual spring scales (-20% to -35% weight loss)</div>
              <div style={{ color: 'var(--fg-color)', fontWeight: 700 }}>100% Calibrated digital scale with live in-app photo lock</div>
            </div>

            {/* Row 2 */}
            <div className="kinetic-table-row">
              <strong style={{ color: 'var(--fg-color)' }}>PRICING TRANSPARENCY</strong>
              <div style={{ color: '#f87171' }}>Brokers guess arbitrary rates; pocket 75% of precious metals</div>
              <div style={{ color: 'var(--fg-color)', fontWeight: 700 }}>Live commodity market spot rates + guaranteed 85% floor price</div>
            </div>

            {/* Row 3 */}
            <div className="kinetic-table-row">
              <strong style={{ color: 'var(--fg-color)' }}>WORKER SAFETY & FUMES</strong>
              <div style={{ color: '#f87171' }}>Acid baths & open wire burning releasing neurotoxic lead smoke</div>
              <div style={{ color: 'var(--fg-color)', fontWeight: 700 }}>Zero open burning; protective gear & certified hydrometallurgy</div>
            </div>

            {/* Row 4 */}
            <div className="kinetic-table-row">
              <strong style={{ color: 'var(--fg-color)' }}>PAYMENT & RECORDS</strong>
              <div style={{ color: '#f87171' }}>Delayed cash or IOUs; zero legal disposal proof</div>
              <div style={{ color: 'var(--fg-color)', fontWeight: 700 }}>Instant direct UPI bank transfer + verifiable CPCB certificate</div>
            </div>

          </div>

          {/* Action Trigger */}
          <div style={{ marginTop: '56px', display: 'flex', justifyContent: 'center' }}>
            <button 
              className="btn-kinetic-primary"
              onClick={onSelectWasteTrack}
            >
              <span>TEST THE AI VISION SCANNER RIGHT NOW →</span>
            </button>
          </div>

        </div>
      </section>
    </div>
  );
}
