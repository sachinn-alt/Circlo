import React, { useState } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import TracksSection from './components/TracksSection';
import ScannerTab from './components/ScannerTab';
import MapTab from './components/MapTab';
import KabadiwalaHub from './components/KabadiwalaHub';
import CedarPolicyLab from './components/CedarPolicyLab';
import ImpactLedger from './components/ImpactLedger';
import PickupModal from './components/PickupModal';
import CertificateModal from './components/CertificateModal';
import Marquee from 'react-fast-marquee';
import './App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Cross-tab workflows
  const [prefilteredSample, setPrefilteredSample] = useState(null);
  const [pickupRecycler, setPickupRecycler] = useState(null);
  const [pickupItem, setPickupItem] = useState(null);
  
  // Certificate Modal State
  const [certModalData, setCertModalData] = useState(null);

  const handleSelectRecyclerForScrap = (sample) => {
    setPrefilteredSample(sample);
    setPickupItem(sample);
    setActiveTab('map');
  };

  const handleOpenCedarForBatch = (sample) => {
    setActiveTab('cedar');
  };

  const handleRequestPickup = (recycler) => {
    setPickupRecycler(recycler);
  };

  return (
    <div className="kinetic-shell">
      
      {/* Subtle Noise Texture Overlay */}
      <svg className="kinetic-noise-overlay" aria-hidden="true">
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>

      {/* Top Floating Navbar with Marquee */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />

      {/* Main Content Area */}
      <main style={{ flex: 1 }}>
        {activeTab === 'overview' && (
          <>
            <HeroSection onNavigateTab={(tab) => setActiveTab(tab)} />
            <TracksSection onSelectWasteTrack={() => setActiveTab('scanner')} />
            
            {/* Live Interactive Scanner Playground directly in Overview */}
            <section className="kinetic-section" style={{ borderBottom: 'none' }}>
              <div className="kinetic-container">
                <div style={{ marginBottom: '40px' }}>
                  <span style={{ 
                    fontFamily: 'var(--font-space)', 
                    fontSize: '13px', 
                    fontWeight: 800, 
                    color: 'var(--accent-color)', 
                    letterSpacing: '0.12em' 
                  }}>
                    [ 03 // LIVE CAMERA ENGINE ]
                  </span>
                  <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 800, textTransform: 'uppercase', marginTop: '12px' }}>
                    TEST THE AI SPECTROMETER.
                  </h2>
                  <p style={{ fontFamily: 'var(--font-inter)', fontSize: '18px', color: 'var(--muted-fg-color)', maxWidth: '640px', marginTop: '14px' }}>
                    Click any sample preset below to inspect bounding box computer vision, extracted metal rates, and verified payouts.
                  </p>
                </div>

                <ScannerTab 
                  onSelectRecyclerForScrap={handleSelectRecyclerForScrap}
                  onOpenCedarForBatch={handleOpenCedarForBatch}
                />
              </div>
            </section>
          </>
        )}

        {activeTab === 'scanner' && (
          <div className="kinetic-container">
            <ScannerTab 
              onSelectRecyclerForScrap={handleSelectRecyclerForScrap}
              onOpenCedarForBatch={handleOpenCedarForBatch}
            />
          </div>
        )}

        {activeTab === 'map' && (
          <div className="kinetic-container">
            <MapTab 
              prefilteredSample={prefilteredSample}
              onRequestPickup={handleRequestPickup}
            />
          </div>
        )}

        {activeTab === 'kabadiwala' && (
          <div className="kinetic-container">
            <KabadiwalaHub 
              onRequestPickup={handleRequestPickup}
            />
          </div>
        )}

        {activeTab === 'cedar' && (
          <div className="kinetic-container">
            <CedarPolicyLab 
              preselectedBatch={pickupItem}
            />
          </div>
        )}

        {activeTab === 'impact' && (
          <div className="kinetic-container">
            <ImpactLedger 
              onOpenCertificateModal={(data) => setCertModalData(data)}
            />
          </div>
        )}
      </main>

      {/* Full Bleed Marquee Before Footer */}
      <div className="kinetic-marquee-strip">
        <Marquee speed={85} gradient={false} autoFill={true}>
          <div className="marquee-item">
            <span>NO RIGGED SCALES</span>
            <span className="marquee-divider" />
          </div>
          <div className="marquee-item">
            <span>NO BACKYARD WIRE BURNING</span>
            <span className="marquee-divider" />
          </div>
          <div className="marquee-item">
            <span>DIRECT TO COLLECTOR UPI PAYOUTS</span>
            <span className="marquee-divider" />
          </div>
          <div className="marquee-item">
            <span>85% COMMODITY FLOOR PRICE MANDATE</span>
            <span className="marquee-divider" />
          </div>
          <div className="marquee-item">
            <span>AUDITED CPCB CERTIFICATION</span>
            <span className="marquee-divider" />
          </div>
        </Marquee>
      </div>

      {/* Monumental Kinetic Footer */}
      <footer className="kinetic-footer">
        <div className="kinetic-container">
          
          <div className="footer-massive-text">
            CLOSE THE LOOP.<br />
            PROTECT THE STREETS.
          </div>

          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            flexWrap: 'wrap', 
            gap: '24px',
            borderTop: '2px solid var(--border-color)',
            paddingTop: '32px'
          }}>
            <div>
              <span style={{ fontFamily: 'var(--font-space)', fontWeight: 900, fontSize: '24px', color: '#ffffff' }}>
                CIRCLO.
              </span>
              <p style={{ fontSize: '13px', color: 'var(--muted-fg-color)', marginTop: '4px' }}>
                DECENTRALIZED CIRCULAR E-WASTE & FAIR SCRAP NETWORK
              </p>
            </div>

            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              <button 
                className="btn-kinetic-ghost"
                onClick={() => setActiveTab('overview')}
              >
                HOW IT WORKS
              </button>
              <button 
                className="btn-kinetic-ghost"
                onClick={() => setActiveTab('scanner')}
              >
                AI SCANNER
              </button>
              <button 
                className="btn-kinetic-ghost"
                onClick={() => setActiveTab('map')}
              >
                FIND RECYCLERS
              </button>
              <button 
                className="btn-kinetic-ghost"
                onClick={() => setActiveTab('kabadiwala')}
              >
                COLLECTOR HUB
              </button>
              <button 
                className="btn-kinetic-ghost"
                onClick={() => setActiveTab('impact')}
              >
                IMPACT LEDGER
              </button>
            </div>
          </div>

          <div style={{ marginTop: '24px', fontSize: '12px', color: 'var(--muted-fg-color)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
            <span>© 2026 CIRCLO // DEDICATED TO 1.5 MILLION FRONTLINE KABADIWALAS</span>
            <span style={{ color: 'var(--accent-color)' }}>[ CPCB E-WASTE MANAGEMENT RULES 2022 COMPLIANT ]</span>
          </div>

        </div>
      </footer>

      {/* Booking Pickup Modal */}
      {pickupRecycler && (
        <PickupModal 
          recycler={pickupRecycler}
          item={pickupItem}
          onClose={() => setPickupRecycler(null)}
        />
      )}

      {/* Verification Certificate Modal */}
      {certModalData && (
        <CertificateModal 
          certData={certModalData}
          onClose={() => setCertModalData(null)}
        />
      )}

    </div>
  );
}
