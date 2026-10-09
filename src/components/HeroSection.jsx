import React from 'react';
import { 
  ArrowRight, 
  MapPin, 
  Globe, 
  Layers, 
  Coins, 
  Cpu, 
  ShieldCheck,
  Server
} from 'lucide-react';

export default function HeroSection({ onNavigateTab }) {
  return (
    <section className="wmd-hero-section">
      <div className="wmd-container">
        {/* Top Tag */}
        <div className="flex flex-wrap items-center gap-2">
          <p className="wmd-event-tag">
            <span>Event 02</span>
            <span className="text-muted-foreground">·</span>
            <span>Bharat Builds Tour</span>
            <span className="text-muted-foreground">·</span>
            <span className="text-theme-3-light">Track 03: Waste & Energy</span>
          </p>
        </div>

        {/* Main Title */}
        <h1 className="wmd-hero-h1">
          Environmental Hacks: Circlo
        </h1>

        {/* Lead Descriptions */}
        <p className="wmd-hero-p">
          Bad air, heatwaves, floods, water shortage and waste are problems we see every day. In this hackathon, we built <strong>Circlo (सर्कलो)</strong> to close the loop on what Indian megacities throw away and eliminate toxic backyard burning.
        </p>

        <p className="wmd-hero-bold-p">
          Circlo empowers 1.5 million informal recyclers (Kabadiwalas) using <strong>AWS OpenSearch</strong> geospatial matching, <strong>AWS Cedar</strong> anti-gouging policies, and multimodal computer vision.
        </p>

        {/* Hybrid Week / Two Ways to Build Box */}
        <div className="wmd-info-box">
          <div className="wmd-info-box-header">
            <p className="flex items-center gap-2.5">
              <span className="text-theme-3-light">Hybrid week</span>
              <span className="text-muted-foreground">/</span>
              <span>Oct 8 – 11, 2026</span>
            </p>
            <p className="text-muted-foreground">Teams of 1 to 4 • Delhi & Online</p>
          </div>

          <dl className="wmd-info-dl-grid">
            <div className="wmd-info-cell">
              <dt className="wmd-cell-dt">
                <span className="flex items-center gap-2">
                  <Server size={14} className="text-theme-3-light" /> Build It Track
                </span>
                <span className="text-muted-foreground">Local / Open Source</span>
              </dt>
              <dd>
                <span className="wmd-cell-dd-main">LocalStack & Finch</span>
                <span className="wmd-cell-dd-sub">OpenSearch + Cedar • No AWS card or bill</span>
              </dd>
            </div>

            <div className="wmd-info-cell">
              <dt className="wmd-cell-dt">
                <span className="flex items-center gap-2 text-theme-3-light">
                  <Globe size={14} /> Ship It Track
                </span>
                <span className="text-muted-foreground">Live Cloud URL</span>
              </dt>
              <dd>
                <span className="wmd-cell-dd-main">AWS Free Tier</span>
                <span className="wmd-cell-dd-sub">Amplify + Lambda + Verified Permissions</span>
              </dd>
            </div>
          </dl>
        </div>

        {/* Fast Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center gap-3" style={{ marginTop: '1.75rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button 
            className="btn-wmd-cta" 
            style={{ height: '2.5rem', padding: '0 1.25rem' }}
            onClick={() => onNavigateTab('scanner')}
          >
            <Cpu size={16} />
            <span>Launch AI E-Waste Scanner</span>
          </button>

          <button 
            className="btn-wmd-outline" 
            style={{ height: '2.5rem', padding: '0 1.25rem' }}
            onClick={() => onNavigateTab('map')}
          >
            <MapPin size={16} className="text-theme-3-light" />
            <span>OpenSearch Civic Radar</span>
          </button>

          <button 
            className="btn-wmd-outline" 
            style={{ height: '2.5rem', padding: '0 1.25rem' }}
            onClick={() => onNavigateTab('cedar')}
          >
            <ShieldCheck size={16} className="text-amber" />
            <span>Cedar Policy Lab</span>
          </button>
        </div>
      </div>
    </section>
  );
}
