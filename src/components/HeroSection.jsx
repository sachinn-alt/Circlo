import React from 'react';
import { 
  ArrowRight, 
  MapPin, 
  ShieldCheck, 
  Cpu, 
  Sparkles, 
  Check, 
  Flame, 
  Leaf,
  Layers,
  Award
} from 'lucide-react';

export default function HeroSection({ onNavigateTab }) {
  return (
    <section className="evergreen-hero">
      <div className="evergreen-container">
        
        {/* Eyebrow Pill Tag */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
          <span className="pill-tag sage">
            <Leaf size={14} color="#000000" />
            <span>Event 02 · Bharat Builds Tour · Track 03: Waste & Energy</span>
          </span>
        </div>

        {/* 1. IvyPresto / Didone 74px Editorial Headline with Inline Sage Avatar Circles */}
        <h1 className="hero-editorial-headline">
          Connecting informal recyclers{' '}
          <span className="inline-headline-avatar" title="Rajesh Kumar, Master Recycler (Seelampur)">
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80" 
              alt="Rajesh Kumar, Recycler" 
            />
          </span>
          {' '}with citizen stewards{' '}
          <span className="inline-headline-avatar" title="Sunita Sharma, Civic Validator">
            <img 
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80" 
              alt="Sunita Sharma, Citizen" 
            />
          </span>
          {' '}to close the loop on urban waste.
        </h1>

        {/* 2. Body Text Block: Rubik 400, 19px, line-height 1.9, centered max-width 680px */}
        <p className="hero-body-text">
          Bad air, heatwaves, and toxic backyard burning are daily realities in Indian megacities. 
          Circlo empowers 1.5 million Kabadiwalas using AWS OpenSearch geospatial dispatch, 
          AWS Cedar verified anti-gouging policies, and open-source computer vision.
        </p>

        {/* 3. Primary & Secondary Pill Buttons (40.5px pill radius, #000000 fill) */}
        <div className="hero-cta-group">
          <button 
            className="btn-primary-pill"
            onClick={() => onNavigateTab('scanner')}
          >
            <Cpu size={18} />
            <span>Launch AI E-Waste Scanner</span>
          </button>

          <button 
            className="btn-ghost-pill"
            onClick={() => onNavigateTab('map')}
          >
            <MapPin size={17} />
            <span>OpenSearch Civic Radar</span>
          </button>

          <button 
            className="btn-ghost-pill"
            onClick={() => onNavigateTab('cedar')}
          >
            <ShieldCheck size={17} />
            <span>Cedar Policy Lab</span>
          </button>
        </div>

        {/* Social Proof Stat Pills (46px radius, bone card fill, hairline border) */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '12px', 
          marginTop: '40px', 
          flexWrap: 'wrap' 
        }}>
          <span className="pill-tag">
            <strong>1.5M+</strong> Informal Recyclers Indexed
          </span>
          <span className="pill-tag sage">
            <strong>₹48,250</strong> Fair Payouts Protected
          </span>
          <span className="pill-tag">
            <strong>0 kg</strong> Toxic Open Burning
          </span>
        </div>

        {/* 4. Product Mockup Frame with Hand-Drawn Leaf Bleed */}
        <div className="mockup-frame-card">
          {/* Hand-drawn Botanical Leaf Illustrations Bleeding Past Edges */}
          <svg className="leaf-bleed-left" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 80 C 10 30, 60 10, 95 15 C 80 50, 45 85, 10 80 Z" fill="#4d7254" />
            <path d="M10 80 Q 55 45 95 15" stroke="#beedc0" strokeWidth="2" strokeLinecap="round" />
            <path d="M40 58 Q 50 48 60 52" stroke="#beedc0" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M60 40 Q 70 32 80 36" stroke="#beedc0" strokeWidth="1.5" strokeLinecap="round" />
            {/* Small secondary leaf */}
            <path d="M5 90 C 2 65, 28 50, 45 55 C 38 75, 20 92, 5 90 Z" fill="#3b5940" />
            <path d="M5 90 Q 25 72 45 55" stroke="#beedc0" strokeWidth="1.5" strokeLinecap="round" />
          </svg>

          <svg className="leaf-bleed-right" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M90 85 C 90 35, 40 10, 5 15 C 20 50, 55 90, 90 85 Z" fill="#4d7254" />
            <path d="M90 85 Q 45 50 5 15" stroke="#beedc0" strokeWidth="2" strokeLinecap="round" />
            <path d="M60 62 Q 50 52 40 56" stroke="#beedc0" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M40 44 Q 30 36 20 40" stroke="#beedc0" strokeWidth="1.5" strokeLinecap="round" />
            {/* Small secondary leaf */}
            <path d="M95 95 C 98 70, 72 55, 55 60 C 62 80, 80 97, 95 95 Z" fill="#3b5940" />
            <path d="M95 95 Q 75 77 55 60" stroke="#beedc0" strokeWidth="1.5" strokeLinecap="round" />
          </svg>

          {/* Inner Product UI: Dark Plum Sidebar + White Recognition Feed */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '260px 1fr',
            backgroundColor: 'var(--color-pure-white)',
            borderRadius: 'var(--radius-cards)',
            overflow: 'hidden',
            border: '1px solid rgba(51, 51, 51, 0.15)',
            textAlign: 'left'
          }}>
            {/* Dark Plum Sidebar */}
            <div style={{
              backgroundColor: '#1e1622',
              color: '#ffffff',
              padding: '24px 20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px'
            }}>
              <div>
                <p style={{ 
                  fontFamily: 'var(--font-ivypresto-headline)', 
                  fontSize: '20px', 
                  color: '#ffffff', 
                  marginBottom: '4px' 
                }}>
                  Circlo Console
                </p>
                <p style={{ 
                  fontFamily: 'var(--font-rubik)', 
                  fontSize: '12px', 
                  color: 'rgba(255, 255, 255, 0.65)' 
                }}>
                  AWS OpenSearch · Cedar v3
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
                <div style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.12)',
                  padding: '10px 14px',
                  borderRadius: '7px',
                  color: '#ffffff',
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-sage-mint)' }}></span>
                  Recognition Feed
                </div>

                <div 
                  style={{
                    padding: '10px 14px',
                    borderRadius: '7px',
                    color: 'rgba(255, 255, 255, 0.7)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                  onClick={() => onNavigateTab('map')}
                >
                  <MapPin size={14} />
                  Civic Radar (12 km)
                </div>

                <div 
                  style={{
                    padding: '10px 14px',
                    borderRadius: '7px',
                    color: 'rgba(255, 255, 255, 0.7)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                  onClick={() => onNavigateTab('cedar')}
                >
                  <ShieldCheck size={14} />
                  Fair Price Guard (Cedar)
                </div>
              </div>

              <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <p style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.5)' }}>AWS LOCALSTACK STATUS</p>
                <p style={{ fontSize: '12px', color: 'var(--color-sage-mint)', fontWeight: 500, marginTop: '2px' }}>
                  ● Port 4566 Online (OpenSearch + Cedar)
                </p>
              </div>
            </div>

            {/* White Recognition Feed Area */}
            <div style={{
              backgroundColor: '#fbfbf7',
              padding: '24px 28px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ 
                    fontFamily: 'var(--font-ivypresto-headline)', 
                    fontSize: '22px', 
                    color: 'var(--color-ink-black)',
                    fontWeight: 600
                  }}>
                    Live Material Recognition Feed
                  </h3>
                  <p style={{ fontFamily: 'var(--font-rubik)', fontSize: '13px', color: 'var(--color-charcoal)' }}>
                    Verified batches processed through AI spectrometry and Cedar anti-gouging checks
                  </p>
                </div>
                <span className="pill-tag sage" style={{ fontSize: '12px', padding: '4px 12px' }}>
                  ● 34 Active Dispatches
                </span>
              </div>

              {/* Recognition Feed Card 1 */}
              <div style={{
                backgroundColor: 'var(--color-pure-white)',
                borderRadius: 'var(--radius-cards)',
                border: '1px solid rgba(51, 51, 51, 0.15)',
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  {/* Avatar Circle on Sage Halo */}
                  <div className="avatar-sage-halo" style={{ width: '48px', height: '48px' }}>
                    <img 
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" 
                      alt="Ananya Roy" 
                      style={{ width: '40px', height: '40px' }}
                    />
                  </div>
                  <div>
                    <p style={{ fontFamily: 'var(--font-rubik)', fontSize: '15px', color: 'var(--color-ink-black)', fontWeight: 500 }}>
                      Ananya Roy handed over <strong>1.4 kg Telecomm PCBs</strong> to <strong>Ramesh Kumar</strong>
                    </p>
                    <p style={{ fontFamily: 'var(--font-rubik)', fontSize: '13px', color: 'var(--color-charcoal)' }}>
                      South Delhi Hub · 2.1 km away · OpenSearch matched
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="pill-tag sage" style={{ fontSize: '13px', padding: '4px 12px' }}>
                    ₹1,240 Paid
                  </span>
                  <span className="pill-tag" style={{ fontSize: '13px', padding: '4px 12px' }}>
                    Gold 0.42g
                  </span>
                </div>
              </div>

              {/* Recognition Feed Card 2 */}
              <div style={{
                backgroundColor: 'var(--color-pure-white)',
                borderRadius: 'var(--radius-cards)',
                border: '1px solid rgba(51, 51, 51, 0.15)',
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  {/* Avatar Circle on Sage Halo */}
                  <div className="avatar-sage-halo" style={{ width: '48px', height: '48px' }}>
                    <img 
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80" 
                      alt="Vikram Mehta" 
                      style={{ width: '40px', height: '40px' }}
                    />
                  </div>
                  <div>
                    <p style={{ fontFamily: 'var(--font-rubik)', fontSize: '15px', color: 'var(--color-ink-black)', fontWeight: 500 }}>
                      Vikram Mehta recycled <strong>650g LiFePO4 Laptop Cells</strong> via <strong>Noor Ahmed</strong>
                    </p>
                    <p style={{ fontFamily: 'var(--font-rubik)', fontSize: '13px', color: 'var(--color-charcoal)' }}>
                      Indiranagar Hub · Cedar Policy Validated · 0% Fire Risk
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="pill-tag sage" style={{ fontSize: '13px', padding: '4px 12px' }}>
                    ₹385 Paid
                  </span>
                  <span className="pill-tag" style={{ fontSize: '13px', padding: '4px 12px' }}>
                    Cobalt 210g
                  </span>
                </div>
              </div>

              {/* Footer Note */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
                <span style={{ fontSize: '12px', color: 'var(--color-charcoal)' }}>
                  Separation achieved through Bone (#fffff3) & Pure White (#ffffff) on Linen (#edede2). Zero shadow.
                </span>
                <button 
                  className="btn-ghost-pill sm"
                  onClick={() => onNavigateTab('scanner')}
                >
                  Inspect Live AI Camera Feed →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 5. Integrations Strip: Horizontal row on cream background */}
        <div style={{ 
          marginTop: '70px', 
          textAlign: 'center', 
          borderTop: '1px solid rgba(51, 51, 51, 0.1)', 
          paddingTop: '36px' 
        }}>
          <p style={{ 
            fontFamily: 'var(--font-rubik)', 
            fontSize: '13px', 
            textTransform: 'uppercase', 
            letterSpacing: '0.08em', 
            color: 'var(--color-charcoal)', 
            marginBottom: '20px' 
          }}>
            Integrated with Open Source AWS Ecosystem & Urban Dispatch Channels
          </p>

          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            gap: '36px', 
            flexWrap: 'wrap' 
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-rubik)', fontSize: '15px', fontWeight: 500 }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ec7211' }}></span>
              AWS OpenSearch 2.19
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-rubik)', fontSize: '15px', fontWeight: 500 }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#00a4e4' }}></span>
              AWS Cedar Language
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-rubik)', fontSize: '15px', fontWeight: 500 }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#2e7d32' }}></span>
              LocalStack & Finch
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-rubik)', fontSize: '15px', fontWeight: 500 }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#4a154b' }}></span>
              Slack Dispatch Webhook
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-rubik)', fontSize: '15px', fontWeight: 500 }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#5059c9' }}></span>
              Microsoft Teams Civic Bot
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
