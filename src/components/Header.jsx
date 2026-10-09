import React from 'react';
import KineticMarquee from './KineticMarquee';
import CircloBrandMark from './CircloBrandMark';
import { motion } from 'framer-motion';
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
        <KineticMarquee speed={75}>
          <div className="marquee-item">
            <span>● 1,500,000 INFORMAL RECYCLERS EMPOWERED</span>
            <span className="marquee-divider" />
          </div>
          <div className="marquee-item">
            <span>● 100% DIGITAL SCALE ACCURACY GUARANTEED</span>
            <span className="marquee-divider" />
          </div>
          <div className="marquee-item">
            <span>● ZERO TOXIC BACKYARD BURNING</span>
            <span className="marquee-divider" />
          </div>
          <div className="marquee-item">
            <span>● GUARANTEED 85% FAIR SCRAP FLOOR PRICE</span>
            <span className="marquee-divider" />
          </div>
          <div className="marquee-item">
            <span>● DIRECT INSTANT UPI BANK PAYOUTS</span>
            <span className="marquee-divider" />
          </div>
          <div className="marquee-item">
            <span>● AUDITED CPCB GREEN RECYCLING CERTIFICATES</span>
            <span className="marquee-divider" />
          </div>
        </KineticMarquee>
      </div>

      {/* 2. Brutalist Navigation Bar */}
      <div className="kinetic-container">
        <div className="kinetic-nav-inner">
          
          {/* Brand Mark with Hover Scale */}
          <motion.div 
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="kinetic-brand"
            onClick={() => setActiveTab('overview')}
          >
            <div className="kinetic-brand-box" title="Circlo — Fair Trade Circular E-Waste Protocol">
              <CircloBrandMark size={26} color="#000000" />
            </div>
            <div>
              <span className="kinetic-brand-title">CIRCLO</span>
            </div>
          </motion.div>

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

          {/* Right Action Trigger with Motion */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-kinetic-primary"
              style={{ height: '48px', padding: '0 24px', fontSize: '14px' }}
              onClick={() => setActiveTab('scanner')}
            >
              <span className="btn-icon">
                <Smartphone size={16} />
              </span>
              <span>SCAN DEVICE</span>
            </motion.button>
          </div>

        </div>
      </div>
    </header>
  );
}
