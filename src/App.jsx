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
    <div className="evergreen-app">
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
            
            {/* Live Demo Teaser in Overview */}
            <section className="evergreen-section">
              <div className="evergreen-container">
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                  <span className="pill-tag" style={{ marginBottom: '12px' }}>Live Demo / Interactive Engine</span>
                  <h2 className="section-title">Test Circlo Live Right Now</h2>
                  <p className="section-subtitle">
                    Switch between the AI Vision Spectrometer, OpenSearch Civic Radar, and AWS Cedar policy engine below.
                  </p>
                </div>
                <div>
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
          <div className="evergreen-section">
            <div className="evergreen-container">
              <ScannerTab 
                onSelectRecyclerForScrap={handleSelectRecyclerForScrap}
                onOpenCedarForBatch={handleOpenCedarForBatch}
              />
            </div>
          </div>
        )}

        {activeTab === 'map' && (
          <div className="evergreen-section">
            <div className="evergreen-container">
              <MapTab 
                prefilteredSample={prefilteredSample}
                onRequestPickup={handleRequestPickup}
              />
            </div>
          </div>
        )}

        {activeTab === 'kabadiwala' && (
          <div className="evergreen-section">
            <div className="evergreen-container">
              <KabadiwalaHub 
                onRequestPickup={handleRequestPickup}
              />
            </div>
          </div>
        )}

        {activeTab === 'cedar' && (
          <div className="evergreen-section">
            <div className="evergreen-container">
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
          <div className="evergreen-section">
            <div className="evergreen-container">
              <ImpactLedger 
                onOpenCertificateModal={(data) => setCertModalData(data)}
              />
            </div>
          </div>
        )}
      </main>

      {/* Evergreen Footer */}
      <footer className="evergreen-footer">
        <div className="evergreen-container">
          <div className="footer-content">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span className="pill-tag sage" style={{ fontSize: '13px', padding: '4px 14px' }}>
                Circlo · Track 03: Waste & Energy
              </span>
              <span style={{ color: 'var(--color-charcoal)' }}>•</span>
              <span style={{ fontFamily: 'var(--font-rubik)', fontSize: '14px', fontWeight: 500 }}>
                WeMakeDevs Bharat Builds Tour × AWS
              </span>
            </div>
            <p style={{ fontFamily: 'var(--font-rubik)', fontSize: '14px', color: 'var(--color-charcoal)', maxWidth: '580px', lineHeight: 1.6 }}>
              Built with AWS OpenSearch geospatial indexes, AWS Cedar verification engine, and Finch / LocalStack tooling. Dedicated to India's 1.5 million frontline recycling workers.
            </p>
            <p style={{ fontFamily: 'var(--font-rubik)', fontSize: '12px', color: 'rgba(51, 51, 51, 0.6)' }}>
              Environmental Hacks • Event 02 • Oct 8 – 11, 2026 • Sunlit Greenhouse on Linen Paper
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
