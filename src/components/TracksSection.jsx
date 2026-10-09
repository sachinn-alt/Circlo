import React from 'react';
import { 
  ArrowRight, 
  Check, 
  Zap, 
  Server, 
  Wind, 
  Droplets, 
  Trash2, 
  Globe, 
  Cpu, 
  Layers, 
  ShieldCheck 
} from 'lucide-react';

export default function TracksSection({ onSelectWasteTrack }) {
  return (
    <section id="tracks" className="evergreen-section">
      <div className="evergreen-container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <p style={{
            fontFamily: 'var(--font-rubik)',
            fontSize: '14px',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: 'var(--color-charcoal)',
            marginBottom: '12px'
          }}>
            02 / Tracks · Bharat Builds Tour
          </p>
          <h2 className="section-title">
            Pick a problem worth fixing
          </h2>
          <p className="section-subtitle">
            The problems under each track are a place to start, not a list to pick from. 
            If it makes the air cleaner, the water safer or the city lighter, it fits.
          </p>
        </div>

        {/* 3 Track Cards Grid: Equal thirds, bone card surfaces (#fffff3), zero shadow */}
        <div className="three-up-grid">
          
          {/* Track 01: Air */}
          <article className="track-feature-card">
            <div className="track-card-eyebrow">
              <span className="pill-tag" style={{ fontSize: '12px', padding: '3px 12px' }}>
                <Wind size={13} style={{ marginRight: '4px' }} /> Atmosphere
              </span>
              <span className="track-num-serif">01</span>
            </div>
            <h3 className="track-headline">Air</h3>
            <p className="track-copy">
              Help people breathe easier. Track what's in the air, warn the people most exposed to it, and change what happens on the bad days.
            </p>
            <div className="track-tags-list">
              <span className="pill-tag">AQI Monitoring</span>
              <span className="pill-tag">Pollution exposure</span>
              <span className="pill-tag">Stubble burning</span>
              <span className="pill-tag">Indoor air filtration</span>
              <span className="pill-tag">School safety on bad days</span>
            </div>
          </article>

          {/* Track 02: Heat and Water */}
          <article className="track-feature-card">
            <div className="track-card-eyebrow">
              <span className="pill-tag" style={{ fontSize: '12px', padding: '3px 12px' }}>
                <Droplets size={13} style={{ marginRight: '4px' }} /> Climate
              </span>
              <span className="track-num-serif">02</span>
            </div>
            <h3 className="track-headline">Heat and Water</h3>
            <p className="track-copy">
              Too much water, too little of it, and the heat in between. Build for the monsoon that floods the street and the summer that dries the tap.
            </p>
            <div className="track-tags-list">
              <span className="pill-tag">Heatwaves</span>
              <span className="pill-tag">Monsoon waterlogging</span>
              <span className="pill-tag">Urban flash floods</span>
              <span className="pill-tag">Water tanker logistics</span>
              <span className="pill-tag">Groundwater depletion</span>
            </div>
          </article>

          {/* Track 03: Waste and Energy (Circlo Focus) */}
          <article 
            className="track-feature-card" 
            style={{ 
              borderColor: 'var(--color-ink-black)',
              borderWidth: '1.5px',
              position: 'relative'
            }}
          >
            <div className="track-card-eyebrow">
              <span className="pill-tag sage" style={{ fontSize: '12px', padding: '3px 12px' }}>
                <Trash2 size={13} style={{ marginRight: '4px' }} /> Circlo Active Solution
              </span>
              <span className="track-num-serif">03</span>
            </div>
            <h3 className="track-headline">Waste and Energy</h3>
            <p className="track-copy">
              Close the loop on what a city throws away and cut what it burns. Sort it, recycle it, power it cleaner, and nudge people out of their cars.
            </p>
            <div className="track-tags-list">
              <span className="pill-tag sage">
                <strong>E-waste (Circlo)</strong>
              </span>
              <span className="pill-tag sage">
                <strong>Informal recyclers</strong>
              </span>
              <span className="pill-tag">Segregation</span>
              <span className="pill-tag">Precious metals</span>
              <span className="pill-tag">Rooftop solar</span>
              <span className="pill-tag">EV nudges</span>
            </div>
            
            <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid rgba(51, 51, 51, 0.12)' }}>
              <button 
                className="btn-primary-pill"
                style={{ width: '100%', padding: '10px 20px', fontSize: '15px' }}
                onClick={onSelectWasteTrack}
              >
                <span>Explore Circlo E-Waste Hub →</span>
              </button>
            </div>
          </article>

        </div>

        {/* ==============================================================================
           "Two ways to build, in any track" Matrix
           ============================================================================== */}
        <div style={{ marginTop: '90px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span className="pill-tag" style={{ marginBottom: '12px' }}>
              Architecture Options
            </span>
            <h2 className="section-title">
              Two ways to build, in any track
            </h2>
            <p className="section-subtitle">
              You can build with AWS open source tools, AWS cloud services, or both.{' '}
              <strong style={{ color: 'var(--color-ink-black)' }}>
                To be eligible for prizes, your project needs to either use at least one AWS open source tool or be deployed on AWS.
              </strong>
            </p>
          </div>

          {/* Table: Build It vs Ship It on Bone Card */}
          <div style={{
            backgroundColor: 'var(--color-bone-card)',
            borderRadius: 'var(--radius-cards)',
            border: '1px solid rgba(51, 51, 51, 0.2)',
            overflow: 'hidden'
          }}>
            {/* Header */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '240px 1fr 1fr',
              borderBottom: '1px solid rgba(51, 51, 51, 0.2)',
              backgroundColor: 'rgba(237, 237, 226, 0.6)'
            }}>
              <div style={{ 
                padding: '20px 24px', 
                fontFamily: 'var(--font-rubik)', 
                fontSize: '12px', 
                fontWeight: 600, 
                textTransform: 'uppercase', 
                letterSpacing: '0.08em', 
                color: 'var(--color-charcoal)' 
              }}>
                What you need
              </div>

              <div style={{ 
                padding: '20px 24px', 
                borderLeft: '1px solid rgba(51, 51, 51, 0.2)' 
              }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                  <span style={{ 
                    fontFamily: 'var(--font-rubik)', 
                    fontSize: '13px', 
                    fontWeight: 700, 
                    textTransform: 'uppercase', 
                    letterSpacing: '0.05em', 
                    color: 'var(--color-ink-black)' 
                  }}>
                    Build It
                  </span>
                  <span style={{ fontFamily: 'var(--font-rubik)', fontSize: '15px', fontWeight: 500 }}>
                    Open source, on your machine
                  </span>
                </div>
                <p style={{ fontFamily: 'var(--font-rubik)', fontSize: '13px', color: 'var(--color-charcoal)', marginTop: '4px' }}>
                  No AWS account, no card, no bill.
                </p>
              </div>

              <div style={{ 
                padding: '20px 24px', 
                borderLeft: '1px solid rgba(51, 51, 51, 0.2)' 
              }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                  <span style={{ 
                    fontFamily: 'var(--font-rubik)', 
                    fontSize: '13px', 
                    fontWeight: 700, 
                    textTransform: 'uppercase', 
                    letterSpacing: '0.05em', 
                    color: 'var(--color-ink-black)' 
                  }}>
                    Ship It
                  </span>
                  <span style={{ fontFamily: 'var(--font-rubik)', fontSize: '15px', fontWeight: 500 }}>
                    Deployed, with a URL
                  </span>
                </div>
                <p style={{ fontFamily: 'var(--font-rubik)', fontSize: '13px', color: 'var(--color-charcoal)', marginTop: '4px' }}>
                  Free tier: up to $200 in credits to start.
                </p>
              </div>
            </div>

            {/* Row 1: Agents and AI */}
            <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr 1fr', borderBottom: '1px solid rgba(51, 51, 51, 0.12)' }}>
              <div style={{ padding: '16px 24px', fontFamily: 'var(--font-rubik)', fontSize: '15px', fontWeight: 500, color: 'var(--color-ink-black)' }}>
                Agents and AI
              </div>
              <div style={{ padding: '16px 24px', borderLeft: '1px solid rgba(51, 51, 51, 0.12)', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <span className="pill-tag sage" style={{ fontSize: '13px', padding: '3px 12px' }}>Strands Agents SDK</span>
                <span className="pill-tag" style={{ fontSize: '13px', padding: '3px 12px' }}>PartyRock</span>
              </div>
              <div style={{ padding: '16px 24px', borderLeft: '1px solid rgba(51, 51, 51, 0.12)', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <span className="pill-tag" style={{ fontSize: '13px', padding: '3px 12px' }}>SageMaker AI</span>
                <span className="pill-tag" style={{ fontSize: '13px', padding: '3px 12px' }}>Amazon Bedrock</span>
              </div>
            </div>

            {/* Row 2: Containers */}
            <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr 1fr', borderBottom: '1px solid rgba(51, 51, 51, 0.12)' }}>
              <div style={{ padding: '16px 24px', fontFamily: 'var(--font-rubik)', fontSize: '15px', fontWeight: 500, color: 'var(--color-ink-black)' }}>
                Containers & Kubernetes
              </div>
              <div style={{ padding: '16px 24px', borderLeft: '1px solid rgba(51, 51, 51, 0.12)', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <span className="pill-tag sage" style={{ fontSize: '13px', padding: '3px 12px' }}>Finch Container Engine</span>
                <span className="pill-tag" style={{ fontSize: '13px', padding: '3px 12px' }}>EKS Distro</span>
              </div>
              <div style={{ padding: '16px 24px', borderLeft: '1px solid rgba(51, 51, 51, 0.12)', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <span className="pill-tag" style={{ fontSize: '13px', padding: '3px 12px' }}>Amazon EKS</span>
                <span className="pill-tag" style={{ fontSize: '13px', padding: '3px 12px' }}>ECS on Fargate</span>
              </div>
            </div>

            {/* Row 3: Serverless */}
            <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr 1fr', borderBottom: '1px solid rgba(51, 51, 51, 0.12)' }}>
              <div style={{ padding: '16px 24px', fontFamily: 'var(--font-rubik)', fontSize: '15px', fontWeight: 500, color: 'var(--color-ink-black)' }}>
                Serverless
              </div>
              <div style={{ padding: '16px 24px', borderLeft: '1px solid rgba(51, 51, 51, 0.12)', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <span className="pill-tag sage" style={{ fontSize: '13px', padding: '3px 12px' }}>SAM CLI (template.yaml)</span>
                <span className="pill-tag sage" style={{ fontSize: '13px', padding: '3px 12px' }}>LocalStack Engine</span>
              </div>
              <div style={{ padding: '16px 24px', borderLeft: '1px solid rgba(51, 51, 51, 0.12)', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <span className="pill-tag" style={{ fontSize: '13px', padding: '3px 12px' }}>AWS Lambda</span>
                <span className="pill-tag" style={{ fontSize: '13px', padding: '3px 12px' }}>API Gateway</span>
              </div>
            </div>

            {/* Row 4: Data and search */}
            <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr 1fr', borderBottom: '1px solid rgba(51, 51, 51, 0.12)' }}>
              <div style={{ padding: '16px 24px', fontFamily: 'var(--font-rubik)', fontSize: '15px', fontWeight: 500, color: 'var(--color-ink-black)' }}>
                Data and search
              </div>
              <div style={{ padding: '16px 24px', borderLeft: '1px solid rgba(51, 51, 51, 0.12)', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <span className="pill-tag sage" style={{ fontSize: '13px', padding: '3px 12px' }}>
                  <strong>OpenSearch 2.19 (circlo-recyclers index)</strong>
                </span>
              </div>
              <div style={{ padding: '16px 24px', borderLeft: '1px solid rgba(51, 51, 51, 0.12)', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <span className="pill-tag" style={{ fontSize: '13px', padding: '3px 12px' }}>Amazon DynamoDB</span>
                <span className="pill-tag" style={{ fontSize: '13px', padding: '3px 12px' }}>Amazon S3 Raw Data</span>
              </div>
            </div>

            {/* Row 5: Auth and policy */}
            <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr 1fr' }}>
              <div style={{ padding: '16px 24px', fontFamily: 'var(--font-rubik)', fontSize: '15px', fontWeight: 500, color: 'var(--color-ink-black)' }}>
                Auth and policy
              </div>
              <div style={{ padding: '16px 24px', borderLeft: '1px solid rgba(51, 51, 51, 0.12)', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <span className="pill-tag sage" style={{ fontSize: '13px', padding: '3px 12px' }}>
                  <strong>Cedar Language (policies.cedar)</strong>
                </span>
              </div>
              <div style={{ padding: '16px 24px', borderLeft: '1px solid rgba(51, 51, 51, 0.12)', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <span className="pill-tag" style={{ fontSize: '13px', padding: '3px 12px' }}>Amazon Cognito</span>
                <span className="pill-tag" style={{ fontSize: '13px', padding: '3px 12px' }}>Amazon Verified Permissions</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
