import React, { useState } from 'react';
import KineticMarquee from './KineticMarquee';
import CircloBrandMark from './CircloBrandMark';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Smartphone, 
  Cloud,
  Globe,
  Menu,
  X,
  ArrowRight,
  ShieldCheck,
  MapPin,
  Camera,
  Activity,
  Award,
  Users
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Header({ activeTab, setActiveTab, onOpenAwsArch }) {
  const { language, toggleLanguage, t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileNav = (tab) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { id: 'overview', label: t('navHowItWorks'), code: '01' },
    { id: 'scanner', label: t('navAiScanner'), code: '02' },
    { id: 'map', label: t('navFindRecyclers'), code: '03' },
    { id: 'kabadiwala', label: t('navCollectorHub'), code: '04' },
    { id: 'cedar', label: t('navFairPriceGuard'), code: '05' },
    { id: 'impact', label: t('navImpactLedger'), code: '06' }
  ];

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

          {/* Desktop Navigation Links */}
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

          {/* Right Action Triggers: Language Switcher, AWS Cloud Arch, Scan & Mobile Menu */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            
            {/* Language Toggle Button (Visible on all devices) */}
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-kinetic-outline"
              style={{ height: '42px', padding: '0 12px', fontSize: '12px' }}
              onClick={toggleLanguage}
              title="Toggle English / Hindi / Bengali localization"
            >
              <Globe size={14} />
              <span>{language === 'en' ? 'हिन्दी' : language === 'hi' ? 'বাংলা' : 'EN'}</span>
            </motion.button>

            {/* AWS Cloud Architecture Trigger Button (Desktop Only) */}
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-kinetic-outline desktop-only-action"
              style={{ height: '42px', padding: '0 14px', fontSize: '12px', borderColor: 'var(--accent-color)', color: 'var(--accent-color)' }}
              onClick={onOpenAwsArch}
              title="Inspect AWS Cloud Architecture & Cedar policies"
            >
              <Cloud size={14} />
              <span>AWS CLOUD</span>
            </motion.button>

            {/* Primary Action Button (Desktop Only) */}
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-kinetic-primary desktop-only-action"
              style={{ height: '42px', padding: '0 18px', fontSize: '13px' }}
              onClick={() => setActiveTab('scanner')}
            >
              <span className="btn-icon">
                <Smartphone size={15} />
              </span>
              <span>{t('navScanDevice')}</span>
            </motion.button>

            {/* Mobile Hamburger Menu Button (Phone / Tablet Only) */}
            <button 
              className="kinetic-mobile-menu-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
              <span>MENU</span>
            </button>

          </div>

        </div>
      </div>

      {/* 3. Kinetic Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              className="kinetic-mobile-drawer-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />

            <motion.aside 
              className="kinetic-mobile-drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="kinetic-mobile-drawer-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div className="kinetic-brand-box" style={{ width: '32px', height: '32px' }}>
                    <CircloBrandMark size={18} color="#000000" />
                  </div>
                  <span style={{ fontFamily: 'var(--font-space)', fontWeight: 900, fontSize: '18px', color: '#ffffff' }}>
                    CIRCLO MENU
                  </span>
                </div>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{ background: 'none', border: 'none', color: '#ffffff', cursor: 'pointer', padding: '6px' }}
                >
                  <X size={22} />
                </button>
              </div>

              <nav className="kinetic-mobile-drawer-nav">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    className={`kinetic-mobile-drawer-item ${activeTab === item.id ? 'active' : ''}`}
                    onClick={() => handleMobileNav(item.id)}
                  >
                    <span>
                      <span style={{ opacity: 0.5, marginRight: '10px', fontSize: '12px' }}>
                        [{item.code}]
                      </span>
                      {item.label}
                    </span>
                    <ArrowRight size={16} />
                  </button>
                ))}
              </nav>

              <div className="kinetic-mobile-drawer-actions">
                <button 
                  className="btn-kinetic-primary"
                  style={{ width: '100%', height: '48px', fontSize: '13px' }}
                  onClick={() => handleMobileNav('scanner')}
                >
                  <Smartphone size={16} />
                  <span>{t('navScanDevice')}</span>
                </button>

                <button 
                  className="btn-kinetic-outline"
                  style={{ width: '100%', height: '48px', fontSize: '12px', borderColor: 'var(--accent-color)', color: 'var(--accent-color)' }}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenAwsArch();
                  }}
                >
                  <Cloud size={16} />
                  <span>AWS CLOUD ARCHITECTURE</span>
                </button>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px', borderTop: '1px solid var(--border-color)', fontSize: '12px', color: 'var(--muted-fg-color)' }}>
                  <span>LOCALIZATION:</span>
                  <button 
                    onClick={toggleLanguage}
                    style={{ background: 'none', border: '1px solid var(--border-color)', color: 'var(--accent-color)', padding: '4px 10px', fontWeight: 800, cursor: 'pointer' }}
                  >
                    {language === 'en' ? 'हिन्दी में बदलें' : language === 'hi' ? 'বাংলায় পরিবর্তন করুন' : 'Switch to EN'}
                  </button>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

    </header>
  );
}

