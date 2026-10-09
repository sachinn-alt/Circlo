import React from 'react';
import KineticMarquee from './KineticMarquee';
import CircloBrandMark from './CircloBrandMark';
import { motion } from 'framer-motion';
import { 
  Smartphone, 
  Cloud,
  Globe
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Header({ activeTab, setActiveTab, onOpenAwsArch }) {
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <header className="kinetic-nav">
      
      {/* 1. Infinite High-Energy Marquee Strip (No Gradients) */}
      <div className="kinetic-marquee-strip">
        <KineticMarquee speed={75}>
          <div className="marquee-item">
            <span>● {t('marqueeRecyclers')}</span>
            <span className="marquee-divider" />
          </div>
          <div className="marquee-item">
            <span>● {t('marqueeScale')}</span>
            <span className="marquee-divider" />
          </div>
          <div className="marquee-item">
            <span>● {t('marqueeZeroBurn')}</span>
            <span className="marquee-divider" />
          </div>
          <div className="marquee-item">
            <span>● {t('marqueeFairPrice')}</span>
            <span className="marquee-divider" />
          </div>
          <div className="marquee-item">
            <span>● {t('marqueeUpi')}</span>
            <span className="marquee-divider" />
          </div>
          <div className="marquee-item">
            <span>● {t('marqueeCpcb')}</span>
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
              {t('navHowItWorks')}
            </button>
            <button 
              className={`kinetic-nav-btn ${activeTab === 'scanner' ? 'active' : ''}`}
              onClick={() => setActiveTab('scanner')}
            >
              {t('navAiScanner')}
            </button>
            <button 
              className={`kinetic-nav-btn ${activeTab === 'map' ? 'active' : ''}`}
              onClick={() => setActiveTab('map')}
            >
              {t('navFindRecyclers')}
            </button>
            <button 
              className={`kinetic-nav-btn ${activeTab === 'kabadiwala' ? 'active' : ''}`}
              onClick={() => setActiveTab('kabadiwala')}
            >
              {t('navCollectorHub')}
            </button>
            <button 
              className={`kinetic-nav-btn ${activeTab === 'cedar' ? 'active' : ''}`}
              onClick={() => setActiveTab('cedar')}
            >
              {t('navFairPriceGuard')}
            </button>
            <button 
              className={`kinetic-nav-btn ${activeTab === 'impact' ? 'active' : ''}`}
              onClick={() => setActiveTab('impact')}
            >
              {t('navImpactLedger')}
            </button>
          </nav>

          {/* Right Action Triggers: Language Switcher, AWS Cloud Arch & Scan Device */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            
            {/* Language Toggle Button */}
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-kinetic-outline"
              style={{ height: '42px', padding: '0 12px', fontSize: '12px' }}
              onClick={toggleLanguage}
              title="Toggle Hindi / English localization"
            >
              <Globe size={14} />
              <span>{language === 'en' ? 'हिन्दी' : 'EN'}</span>
            </motion.button>

            {/* AWS Cloud Architecture Trigger Button */}
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-kinetic-outline"
              style={{ height: '42px', padding: '0 14px', fontSize: '12px', borderColor: 'var(--accent-color)', color: 'var(--accent-color)' }}
              onClick={onOpenAwsArch}
              title="Inspect AWS Cloud Architecture & Cedar policies"
            >
              <Cloud size={14} />
              <span>AWS CLOUD</span>
            </motion.button>

            {/* Primary Action Button */}
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-kinetic-primary"
              style={{ height: '42px', padding: '0 18px', fontSize: '13px' }}
              onClick={() => setActiveTab('scanner')}
            >
              <span className="btn-icon">
                <Smartphone size={15} />
              </span>
              <span>{t('navScanDevice')}</span>
            </motion.button>
          </div>

        </div>
      </div>
    </header>
  );
}
