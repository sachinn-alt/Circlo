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
import { Recycle, ShieldCheck, Heart, Sparkles } from 'lucide-react';
import './App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Cross-tab workflows
  const [prefilteredSample, setPrefilteredSample] = useState(null);
  const [pickupRecycler, setPickupRecycler] = useState(null);
  const [pickupItem, setPickupItem] = useState(null);
  
  // Modals
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
    <div className="app-shell">
      {/* Top Floating Navbar */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
      />

      <main style={{ flex: 1 }}>
        {activeTab === 'overview' && (
          <>
            <HeroSection onNavigateTab={(tab) => setActiveTab(tab)} />
            <TracksSection onSelectWasteTrack={() => setActiveTab('scanner')} />
            
            {/* Live Interactive Scanner Playground directly in Overview */}
            <section className="section-wrapper" style={{ paddingTop: '20px' }}>
              <div className="app-container">
                <div className="section-head">
                  <div className="section-eyebrow">Interactive Studio</div>
                  <h2 className="section-h2">Try the AI Vision Scanner Live</h2>
                  <p className="section-desc">
                    Select any sample device below or upload a photo to immediately detect components, 
                    view precious metal yields, and check your guaranteed cash payout.
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
          <div className="section-wrapper">
            <div className="app-container">
              <ScannerTab 
                onSelectRecyclerForScrap={handleSelectRecyclerForScrap}
                onOpenCedarForBatch={handleOpenCedarForBatch}
              />
            </div>
          </div>
        )}

        {activeTab === 'map' && (
          <div className="section-wrapper">
            <div className="app-container">
              <MapTab 
                prefilteredSample={prefilteredSample}
                onRequestPickup={handleRequestPickup}
              />
            </div>
          </div>
        )}

        {activeTab === 'kabadiwala' && (
          <div className="section-wrapper">
            <div className="app-container">
              <KabadiwalaHub 
                onRequestPickup={handleRequestPickup}
              />
            </div>
          </div>
        )}

        {activeTab === 'cedar' && (
          <div className="section-wrapper">
            <div className="app-container">
              <CedarPolicyLab 
                preselectedBatch={pickupItem}
              />
            </div>
          </div>
        )}

        {activeTab === 'impact' && (
          <div className="section-wrapper">
            <div className="app-container">
              <ImpactLedger 
                onOpenCertificateModal={(data) => setCertModalData(data)}
              />
            </div>
          </div>
        )}
      </main>

      {/* Clean Modern Platform Footer */}
      <footer className="app-footer">
        <div className="app-container">
          <div className="footer-top">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div className="nav-brand-logo" style={{ width: '32px', height: '32px' }}>
                <Recycle size={18} />
              </div>
              <div>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '18px', color: '#ffffff' }}>
                  Circlo
                </span>
                <span style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)' }}>
                  Decentralized Circular E-Waste & Fair Scrap Economy
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', fontSize: '14px' }}>
              <button 
                style={{ color: 'var(--text-secondary)' }}
                onClick={() => setActiveTab('overview')}
              >
                How It Works
              </button>
              <button 
                style={{ color: 'var(--text-secondary)' }}
                onClick={() => setActiveTab('scanner')}
              >
                AI Scanner
              </button>
              <button 
                style={{ color: 'var(--text-secondary)' }}
                onClick={() => setActiveTab('map')}
              >
                Find Recyclers
              </button>
              <button 
                style={{ color: 'var(--text-secondary)' }}
                onClick={() => setActiveTab('kabadiwala')}
              >
                Collector Welfare
              </button>
              <button 
                style={{ color: 'var(--text-secondary)' }}
                onClick={() => setActiveTab('impact')}
              >
                Green Impact
              </button>
            </div>
          </div>

          <div className="footer-bottom">
            <p>
              © 2026 Circlo Network. Dedicated to the health, dignity, and economic empowerment of 1.5 million grassroots recycling workers.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary-emerald)', fontSize: '12px', fontWeight: 600 }}>
              <ShieldCheck size={14} />
              <span>CPCB Safe E-Waste Rules 2022 Compliant</span>
            </div>
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
