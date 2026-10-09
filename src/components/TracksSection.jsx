import React from 'react';
import { ArrowRight, Check, Zap, Server } from 'lucide-react';

export default function TracksSection({ onSelectWasteTrack }) {
  return (
    <section id="tracks" className="wmd-section">
      <div className="wmd-container">
        {/* Section Header */}
        <div className="wmd-section-header-split">
          <div>
            <p className="wmd-section-num">02 / Tracks</p>
            <h2 className="wmd-section-h2">Pick a problem worth fixing</h2>
          </div>
          <p className="wmd-section-desc">
            The problems under each track are a place to start, not a list to pick from. If it makes the air cleaner, the water safer or the city lighter, it fits.
          </p>
        </div>

        {/* The 3 Track Cards */}
        <div className="wmd-tracks-grid">
          {/* Track 01: Air */}
          <article className="wmd-track-card">
            <div className="wmd-track-top">
              <span className="tri-dot-badge">
                <span className="dot-air" />
              </span>
              <span className="wmd-track-idx" style={{ color: 'var(--env-air)' }}>01</span>
            </div>
            <h3 className="wmd-track-title">Air</h3>
            <p className="wmd-track-summary">
              Help people breathe easier. Track what's in the air, warn the people most exposed to it, and change what happens on the bad days.
            </p>
            <ul className="wmd-track-tags">
              <li className="wmd-track-tag-pill"><span className="pill-dot dot-air" />AQI</li>
              <li className="wmd-track-tag-pill"><span className="pill-dot dot-air" />Pollution exposure</li>
              <li className="wmd-track-tag-pill"><span className="pill-dot dot-air" />Stubble burning</li>
              <li className="wmd-track-tag-pill"><span className="pill-dot dot-air" />Indoor air</li>
              <li className="wmd-track-tag-pill"><span className="pill-dot dot-air" />School safety</li>
            </ul>
          </article>

          {/* Track 02: Heat and Water */}
          <article className="wmd-track-card">
            <div className="wmd-track-top">
              <span className="tri-dot-badge">
                <span className="dot-heat" />
              </span>
              <span className="wmd-track-idx" style={{ color: 'var(--env-heat)' }}>02</span>
            </div>
            <h3 className="wmd-track-title">Heat and Water</h3>
            <p className="wmd-track-summary">
              Too much water, too little of it, and the heat in between. Build for the monsoon that floods the street and the summer that dries the tap.
            </p>
            <ul className="wmd-track-tags">
              <li className="wmd-track-tag-pill"><span className="pill-dot dot-heat" />Heatwaves</li>
              <li className="wmd-track-tag-pill"><span className="pill-dot dot-heat" />Floods</li>
              <li className="wmd-track-tag-pill"><span className="pill-dot dot-heat" />Monsoon waterlogging</li>
              <li className="wmd-track-tag-pill"><span className="pill-dot dot-heat" />Water tankers</li>
              <li className="wmd-track-tag-pill"><span className="pill-dot dot-heat" />Groundwater</li>
            </ul>
          </article>

          {/* Track 03: Waste and Energy (Circlo Focus) */}
          <article className="wmd-track-card active-track">
            <div className="wmd-track-top">
              <span className="tri-dot-badge">
                <span className="dot-waste" />
              </span>
              <span className="wmd-track-idx" style={{ color: 'var(--env-waste)' }}>03</span>
            </div>
            <div className="flex items-center gap-2">
              <h3 className="wmd-track-title">Waste and Energy</h3>
            </div>
            <p className="wmd-track-summary">
              Close the loop on what a city throws away and cut what it burns. Sort it, recycle it, power it cleaner, and nudge people out of their cars.
            </p>
            <ul className="wmd-track-tags">
              <li className="wmd-track-tag-pill" style={{ borderColor: 'var(--theme-3-light)', background: 'rgba(16,185,129,0.1)' }}>
                <span className="pill-dot dot-waste" />E-waste (Circlo)
              </li>
              <li className="wmd-track-tag-pill" style={{ borderColor: 'var(--theme-3-light)', background: 'rgba(16,185,129,0.1)' }}>
                <span className="pill-dot dot-waste" />Informal recyclers
              </li>
              <li className="wmd-track-tag-pill"><span className="pill-dot dot-waste" />Segregation</li>
              <li className="wmd-track-tag-pill"><span className="pill-dot dot-waste" />Recycling</li>
              <li className="wmd-track-tag-pill"><span className="pill-dot dot-waste" />Rooftop solar</li>
              <li className="wmd-track-tag-pill"><span className="pill-dot dot-waste" />EV nudges</li>
            </ul>
          </article>
        </div>

        {/* Subtitle: Two ways to build, in any track */}
        <div style={{ marginTop: '3.5rem' }}>
          <p className="wmd-section-num" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="tri-dot-badge">
              <span className="dot-air" />
              <span className="dot-heat" />
              <span className="dot-waste" />
            </span>
            Two ways to build, in any track
          </p>

          <p style={{ marginTop: '0.65rem', maxWidth: '48rem', color: 'var(--muted-foreground)', fontSize: '0.95rem', lineHeight: '1.7' }}>
            You can build with AWS open source tools, AWS cloud services, or both. <strong style={{ color: 'var(--foreground)' }}>To be eligible for prizes, your project needs to either use at least one AWS open source tool or be deployed on AWS.</strong> Beyond that, you're free to bring in any other tools you like.
          </p>

          {/* Table: Build It vs Ship It */}
          <div className="wmd-build-table-container">
            <div className="wmd-build-table-header">
              <div className="wmd-build-th font-mono text-xs uppercase" style={{ color: 'var(--muted-foreground)' }}>
                What you need
              </div>
              <div className="wmd-build-th border-l">
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-xs uppercase" style={{ color: 'var(--theme-3-light)', fontWeight: 700 }}>Build It</span>
                  <span className="text-sm font-medium">Open source, on your machine</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">No AWS account, no card, no bill.</p>
              </div>
              <div className="wmd-build-th border-l">
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-xs uppercase" style={{ color: 'var(--theme-3-light)', fontWeight: 700 }}>Ship It</span>
                  <span className="text-sm font-medium">Deployed, with a URL</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Free tier: up to $200 in credits to start.</p>
              </div>
            </div>

            {/* Row 1: Agents and AI */}
            <div className="wmd-build-table-row">
              <div className="wmd-build-category-col">Agents and AI</div>
              <div className="wmd-build-tools-col">
                <span className="tool-chip highlight-green">Strands Agents SDK</span>
                <span className="tool-chip">PartyRock</span>
              </div>
              <div className="wmd-build-tools-col">
                <span className="tool-chip">SageMaker AI</span>
                <span className="tool-chip">Bedrock</span>
              </div>
            </div>

            {/* Row 2: Containers and Kubernetes */}
            <div className="wmd-build-table-row">
              <div className="wmd-build-category-col">Containers and Kubernetes</div>
              <div className="wmd-build-tools-col">
                <span className="tool-chip highlight-green">Finch</span>
                <span className="tool-chip">EKS Distro</span>
                <span className="tool-chip">EKS Anywhere</span>
              </div>
              <div className="wmd-build-tools-col">
                <span className="tool-chip">EKS</span>
                <span className="tool-chip">ECS</span>
                <span className="tool-chip">Fargate</span>
              </div>
            </div>

            {/* Row 3: Serverless */}
            <div className="wmd-build-table-row">
              <div className="wmd-build-category-col">Serverless</div>
              <div className="wmd-build-tools-col">
                <span className="tool-chip highlight-green">SAM CLI</span>
                <span className="tool-chip highlight-green">LocalStack</span>
              </div>
              <div className="wmd-build-tools-col">
                <span className="tool-chip">Lambda</span>
                <span className="tool-chip">API Gateway</span>
                <span className="tool-chip">Step Functions</span>
              </div>
            </div>

            {/* Row 4: Servers and runtimes */}
            <div className="wmd-build-table-row">
              <div className="wmd-build-category-col">Servers and runtimes</div>
              <div className="wmd-build-tools-col">
                <span className="tool-chip">Firecracker</span>
                <span className="tool-chip">Corretto</span>
              </div>
              <div className="wmd-build-tools-col">
                <span className="tool-chip">EC2</span>
                <span className="tool-chip">Lightsail</span>
                <span className="tool-chip">Amplify Hosting</span>
              </div>
            </div>

            {/* Row 5: Data and search */}
            <div className="wmd-build-table-row">
              <div className="wmd-build-category-col">Data and search</div>
              <div className="wmd-build-tools-col">
                <span className="tool-chip highlight-green">OpenSearch (circlo-recyclers)</span>
              </div>
              <div className="wmd-build-tools-col">
                <span className="tool-chip">S3</span>
                <span className="tool-chip">DynamoDB</span>
                <span className="tool-chip">RDS</span>
              </div>
            </div>

            {/* Row 6: Auth and policy */}
            <div className="wmd-build-table-row">
              <div className="wmd-build-category-col">Auth and policy</div>
              <div className="wmd-build-tools-col">
                <span className="tool-chip highlight-green">Cedar (policies.cedar)</span>
              </div>
              <div className="wmd-build-tools-col">
                <span className="tool-chip">Cognito</span>
                <span className="tool-chip">Verified Permissions</span>
              </div>
            </div>

            {/* Row 7: Plumbing */}
            <div className="wmd-build-table-row" style={{ borderBottom: 'none' }}>
              <div className="wmd-build-category-col">The plumbing</div>
              <div className="wmd-build-tools-col">
                <span className="text-muted-foreground">-</span>
              </div>
              <div className="wmd-build-tools-col">
                <span className="tool-chip">CloudFront</span>
                <span className="tool-chip">EventBridge</span>
                <span className="tool-chip">SQS / SNS</span>
                <span className="tool-chip">CloudWatch</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
