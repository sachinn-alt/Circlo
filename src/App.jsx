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
import ArchitectureModal from './components/ArchitectureModal';
import CertificateModal from './components/CertificateModal';
import './App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Cross-tab workflows
  const [prefilteredSample, setPrefilteredSample] = useState(null);
  const [pickupRecycler, setPickupRecycler] = useState(null);
  const [pickupItem, setPickupItem] = useState(null);
  
  // Modals
  const [showArchModal, setShowArchModal] = useState(false);
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
    <div className="min-h-screen bg-background text-foreground">
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        onOpenArchitectureModal={() => setShowArchModal(true)}
      />

      <main>
        {activeTab === 'overview' && (
          <>
            <HeroSection onNavigateTab={(tab) => setActiveTab(tab)} />
            <TracksSection onSelectWasteTrack={() => setActiveTab('scanner')} />
            
            {/* Quick Teaser for Scanner in Overview */}
            <section className="wmd-section">
              <div className="wmd-container">
                <div className="wmd-section-header-split">
                  <div>
                    <p className="wmd-section-num">Live Demo / Interactive Engine</p>
                    <h2 className="wmd-section-h2">Test Circlo Live Right Now</h2>
                  </div>
                  <p className="wmd-section-desc">
                    Switch between the AI Vision Spectrometer, OpenSearch Civic Radar, and AWS Cedar policy engine below.
                  </p>
                </div>
                <div style={{ marginTop: '2rem' }}>
                  <ScannerTab 
                    onSelectRecyclerForScrap={handleSelectRecyclerForScrap}
                    onOpenCedarForBatch={handleOpenCedarForBatch}
                  />
                </div>
              </div>
            </section>
          </>
        )}

        {activeTab === 'tracks' && (
          <TracksSection onSelectWasteTrack={() => setActiveTab('scanner')} />
        )}

        {activeTab === 'scanner' && (
          <div className="wmd-section">
            <div className="wmd-container">
              <ScannerTab 
                onSelectRecyclerForScrap={handleSelectRecyclerForScrap}
                onOpenCedarForBatch={handleOpenCedarForBatch}
              />
            </div>
          </div>
        )}

        {activeTab === 'map' && (
          <div className="wmd-section">
            <div className="wmd-container">
              <MapTab 
                prefilteredSample={prefilteredSample}
                onRequestPickup={handleRequestPickup}
              />
            </div>
          </div>
        )}

        {activeTab === 'kabadiwala' && (
          <div className="wmd-section">
            <div className="wmd-container">
              <KabadiwalaHub 
                onRequestPickup={handleRequestPickup}
              />
            </div>
          </div>
        )}

        {activeTab === 'cedar' && (
          <div className="wmd-section">
            <div className="wmd-container">
              <CedarPolicyLab 
                preselectedBatch={pickupItem}
              />
            </div>
          </div>
        )}

        {activeTab === 'build' && (
          <TracksSection onSelectWasteTrack={() => setActiveTab('scanner')} />
        )}

        {activeTab === 'impact' && (
          <div className="wmd-section">
            <div className="wmd-container">
              <ImpactLedger 
                onOpenCertificateModal={(data) => setCertModalData(data)}
              />
            </div>
          </div>
        )}
      </main>

      {/* Footer matching WeMakeDevs */}
      <footer className="border-t border-border" style={{ borderTop: '1px solid var(--border)', background: 'var(--background)', padding: '3rem 0' }}>
        <div className="wmd-container">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
            <div className="flex items-center gap-3" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div className="wmd-logo-icon">W</div>
              <span className="font-mono text-xs uppercase text-muted-foreground" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>
                WeMakeDevs Bharat Builds Tour × AWS
              </span>
            </div>
            <p className="font-mono text-xs text-muted-foreground" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>
              Environmental Hacks • Event 02 • Oct 8 – 11, 2026
            </p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {pickupRecycler && (
        <PickupModal 
          recycler={pickupRecycler}
          item={pickupItem}
          onClose={() => setPickupRecycler(null)}
        />
      )}

      {showArchModal && (
        <ArchitectureModal 
          onClose={() => setShowArchModal(false)}
        />
      )}

      {certModalData && (
        <CertificateModal 
          certData={certModalData}
          onClose={() => setCertModalData(null)}
        />
      )}
    </div>
  );
}
