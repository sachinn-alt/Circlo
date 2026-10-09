import React from 'react';
import { 
  Recycle, 
  Layers, 
  Coins, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export default function Header({ 
  activeTab, 
  setActiveTab, 
  onOpenArchitectureModal 
}) {
  return (
    <header className="wmd-navbar">
      {/* Top Navbar */}
      <div className="wmd-container">
        <div className="wmd-nav-inner">
          <div className="wmd-nav-left">
            <a href="#overview" className="wmd-brand-lockup" onClick={() => setActiveTab('overview')}>
              <div className="wmd-logo-icon">W</div>
              <span>WeMakeDevs</span>
              <span className="wmd-sep-x">×</span>
              <span className="wmd-aws-text">aws</span>
            </a>

            <nav className="wmd-nav-links">
              <button 
                className={`wmd-nav-link ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                Overview
              </button>
              <button 
                className={`wmd-nav-link ${activeTab === 'tracks' ? 'active' : ''}`}
                onClick={() => setActiveTab('tracks')}
              >
                Tracks
              </button>
              <button 
                className={`wmd-nav-link ${activeTab === 'scanner' ? 'active' : ''}`}
                onClick={() => setActiveTab('scanner')}
              >
                AI Scanner
              </button>
              <button 
                className={`wmd-nav-link ${activeTab === 'map' ? 'active' : ''}`}
                onClick={() => setActiveTab('map')}
              >
                Civic Radar
              </button>
              <button 
                className={`wmd-nav-link ${activeTab === 'cedar' ? 'active' : ''}`}
                onClick={() => setActiveTab('cedar')}
              >
                Cedar Policies
              </button>
              <button 
                className={`wmd-nav-link ${activeTab === 'build' ? 'active' : ''}`}
                onClick={() => setActiveTab('build')}
              >
                Two Ways to Build
              </button>
              <button 
                className={`wmd-nav-link ${activeTab === 'impact' ? 'active' : ''}`}
                onClick={() => setActiveTab('impact')}
              >
                Impact Ledger
              </button>
            </nav>
          </div>

          <div className="wmd-nav-actions">
            <button 
              className="btn-wmd-outline"
              onClick={onOpenArchitectureModal}
            >
              <Layers size={14} className="text-emerald" />
              <span>AWS Specs</span>
            </button>

            <a 
              href="https://bit.ly/wmd-aws-free" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-wmd-cta"
            >
              <Coins size={14} />
              <span>Claim $25 Credits</span>
            </a>
          </div>
        </div>
      </div>

      {/* Sticky Sub-Navigation */}
      <div className="wmd-subnav-bar">
        <div className="wmd-container">
          <div className="wmd-subnav-track">
            <button 
              className={`wmd-subnav-item ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button 
              className={`wmd-subnav-item ${activeTab === 'tracks' ? 'active' : ''}`}
              onClick={() => setActiveTab('tracks')}
            >
              02 / Tracks
            </button>
            <button 
              className={`wmd-subnav-item ${activeTab === 'scanner' ? 'active' : ''}`}
              onClick={() => setActiveTab('scanner')}
            >
              AI Vision Scanner
            </button>
            <button 
              className={`wmd-subnav-item ${activeTab === 'map' ? 'active' : ''}`}
              onClick={() => setActiveTab('map')}
            >
              Civic Radar (OpenSearch)
            </button>
            <button 
              className={`wmd-subnav-item ${activeTab === 'kabadiwala' ? 'active' : ''}`}
              onClick={() => setActiveTab('kabadiwala')}
            >
              Kabadiwala Hub
            </button>
            <button 
              className={`wmd-subnav-item ${activeTab === 'cedar' ? 'active' : ''}`}
              onClick={() => setActiveTab('cedar')}
            >
              Cedar Policy Lab
            </button>
            <button 
              className={`wmd-subnav-item ${activeTab === 'build' ? 'active' : ''}`}
              onClick={() => setActiveTab('build')}
            >
              Two Ways to Build
            </button>
            <button 
              className={`wmd-subnav-item ${activeTab === 'impact' ? 'active' : ''}`}
              onClick={() => setActiveTab('impact')}
            >
              EPR Impact Ledger
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
