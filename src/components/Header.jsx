import React from 'react';
import Marquee from 'react-fast-marquee';
import { 
  ArrowRight, 
  Smartphone, 
  TrendingUp, 
  ShieldCheck 
} from 'lucide-react';

export default function Header({ activeTab, setActiveTab }) {
  return (
    <header className="kinetic-nav">
      
      {/* 1. Infinite High-Energy Marquee Strip (No Gradients) */}
      <div className="kinetic-marquee-strip">
        <Marquee speed={75} gradient={false} autoFill={true}>
          <div className="marquee-item">
            <span>1,500,000 INFORMAL RECYCLERS EMPOWERED</span>
            <span className="marquee-divider" />
          </div>
          <div className="marquee-item">
            <span>100% DIGITAL SCALE ACCURACY GUARANTEED</span>
            <span className="marquee-divider" />
          </div>
          <div className="marquee-item">
            <span>ZERO TOXIC BACKYARD BURNING</span>
            <span className="marquee-divider" />
          </div>
          <div className="marquee-item">
            <span>GUARANTEED 85% FAIR SCRAP FLOOR PRICE</span>
            <span className="marquee-divider" />
          </div>
          <div className="marquee-item">
            <span>DIRECT INSTANT UPI BANK PAYOUTS</span>
            <span className="marquee-divider" />
          </div>
          <div className="marquee-item">
            <span>AUDITED CPCB GREEN RECYCLING CERTIFICATES</span>
            <span className="marquee-divider" />
          </div>
        </Marquee>
      </div>

      {/* 2. Brutalist Navigation Bar */}
      <div className="kinetic-container">
        <div className="kinetic-nav-inner">
          
          {/* Brand Mark */}
          <div 
            className="kinetic-brand"
            onClick={() => setActiveTab('overview')}
          >
            <div className="kinetic-brand-box">
              C
            </div>
            <div>
              <span className="kinetic-brand-title">CIRCLO</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="kinetic-nav-links">
            <button 
              className={`kinetic-nav-btn ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              HOW IT WORKS
            </button>
            <button 
              className={`kinetic-nav-btn ${activeTab === 'scanner' ? 'active' : ''}`}
              onClick={() => setActiveTab('scanner')}
            >
              AI SCANNER
            </button>
            <button 
              className={`kinetic-nav-btn ${activeTab === 'map' ? 'active' : ''}`}
              onClick={() => setActiveTab('map')}
            >
              FIND RECYCLERS
            </button>
            <button 
              className={`kinetic-nav-btn ${activeTab === 'kabadiwala' ? 'active' : ''}`}
              onClick={() => setActiveTab('kabadiwala')}
            >
              COLLECTOR HUB
            </button>
            <button 
              className={`kinetic-nav-btn ${activeTab === 'cedar' ? 'active' : ''}`}
              onClick={() => setActiveTab('cedar')}
            >
              FAIR PRICE GUARD
            </button>
            <button 
              className={`kinetic-nav-btn ${activeTab === 'impact' ? 'active' : ''}`}
              onClick={() => setActiveTab('impact')}
            >
              IMPACT LEDGER
            </button>
          </nav>

          {/* Right Action Trigger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button 
              className="btn-kinetic-primary"
              style={{ height: '48px', padding: '0 24px', fontSize: '14px' }}
              onClick={() => setActiveTab('scanner')}
            >
              <Smartphone size={16} />
              <span>SCAN DEVICE</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
