import React from 'react';
import { 
  Recycle, 
  Sparkles, 
  ShieldCheck, 
  Smartphone,
  TrendingUp
} from 'lucide-react';

export default function Header({ activeTab, setActiveTab }) {
  return (
    <header className="circlo-nav">
      <div className="app-container">
        <div className="circlo-nav-inner">
          
          {/* Brand Logo */}
          <div 
            className="nav-brand"
            onClick={() => setActiveTab('overview')}
          >
            <div className="nav-brand-logo">
              <Recycle size={22} />
            </div>
            <div className="nav-brand-text">
              <span className="nav-brand-name">Circlo</span>
              <span className="nav-brand-sub">Circular Scrap Network</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="nav-links">
            <button 
              className={`nav-link-btn ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              How It Works
            </button>
            <button 
              className={`nav-link-btn ${activeTab === 'scanner' ? 'active' : ''}`}
              onClick={() => setActiveTab('scanner')}
            >
              AI Scanner
            </button>
            <button 
              className={`nav-link-btn ${activeTab === 'map' ? 'active' : ''}`}
              onClick={() => setActiveTab('map')}
            >
              Find Recyclers
            </button>
            <button 
              className={`nav-link-btn ${activeTab === 'kabadiwala' ? 'active' : ''}`}
              onClick={() => setActiveTab('kabadiwala')}
            >
              Collector Hub
            </button>
            <button 
              className={`nav-link-btn ${activeTab === 'cedar' ? 'active' : ''}`}
              onClick={() => setActiveTab('cedar')}
            >
              Fair Price Guard
            </button>
            <button 
              className={`nav-link-btn ${activeTab === 'impact' ? 'active' : ''}`}
              onClick={() => setActiveTab('impact')}
            >
              Impact Ledger
            </button>
          </nav>

          {/* Nav Actions */}
          <div className="nav-actions">
            <button 
              className="btn-outline sm"
              onClick={() => setActiveTab('kabadiwala')}
            >
              <TrendingUp size={14} className="text-emerald" />
              <span>Today's Rates</span>
            </button>
            <button 
              className="btn-emerald sm"
              onClick={() => setActiveTab('scanner')}
            >
              <Smartphone size={15} />
              <span>Scan Device</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
