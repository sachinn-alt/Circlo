import React from 'react';
import { 
  Sprout, 
  Layers, 
  ArrowRight,
  ExternalLink
} from 'lucide-react';

export default function Header({ 
  activeTab, 
  setActiveTab, 
  onOpenArchitectureModal 
}) {
  return (
    <header className="evergreen-header">
      {/* 1. Ink Announcement Bar */}
      <div className="ink-announcement-bar">
        <span>Environmental Hacks · Bharat Builds Tour · Oct 8 to 11 · ₹20 Lakh Prize Pool</span>
        <a 
          href="https://bit.ly/wmd-aws-free" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          Claim $25 AWS Credits →
        </a>
      </div>

      {/* 2. Top Navigation Bar */}
      <nav className="evergreen-nav">
        <div className="evergreen-container">
          <div className="evergreen-nav-inner">
            {/* Brand Logo with Botanical Leaf */}
            <a 
              href="#overview" 
              className="evergreen-brand"
              onClick={() => setActiveTab('overview')}
            >
              <Sprout className="evergreen-leaf-icon" />
              <span className="evergreen-brand-name">Circlo</span>
              <span className="evergreen-brand-tag">Track 03: Waste & Energy</span>
            </a>

            {/* Navigation Links */}
            <div className="evergreen-nav-links">
              <button 
                className={`evergreen-nav-link ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                Overview
              </button>
              <button 
                className={`evergreen-nav-link ${activeTab === 'tracks' ? 'active' : ''}`}
                onClick={() => setActiveTab('tracks')}
              >
                Tracks
              </button>
              <button 
                className={`evergreen-nav-link ${activeTab === 'scanner' ? 'active' : ''}`}
                onClick={() => setActiveTab('scanner')}
              >
                AI Scanner
              </button>
              <button 
                className={`evergreen-nav-link ${activeTab === 'map' ? 'active' : ''}`}
                onClick={() => setActiveTab('map')}
              >
                Civic Radar
              </button>
              <button 
                className={`evergreen-nav-link ${activeTab === 'kabadiwala' ? 'active' : ''}`}
                onClick={() => setActiveTab('kabadiwala')}
              >
                Kabadiwala Hub
              </button>
              <button 
                className={`evergreen-nav-link ${activeTab === 'cedar' ? 'active' : ''}`}
                onClick={() => setActiveTab('cedar')}
              >
                Cedar Policies
              </button>
              <button 
                className={`evergreen-nav-link ${activeTab === 'build' ? 'active' : ''}`}
                onClick={() => setActiveTab('build')}
              >
                Build Matrix
              </button>
              <button 
                className={`evergreen-nav-link ${activeTab === 'impact' ? 'active' : ''}`}
                onClick={() => setActiveTab('impact')}
              >
                Impact
              </button>
            </div>

            {/* Actions */}
            <div className="evergreen-nav-actions">
              <button 
                className="btn-ghost-pill sm"
                onClick={onOpenArchitectureModal}
              >
                <Layers size={14} />
                <span>AWS Specs</span>
              </button>
              <button 
                className="btn-primary-pill"
                style={{ padding: '8px 20px', fontSize: '15px' }}
                onClick={() => setActiveTab('scanner')}
              >
                <span>Start Intake</span>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
