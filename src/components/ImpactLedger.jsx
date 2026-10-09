import React, { useState } from 'react';
import { 
  Award, 
  Leaf, 
  Droplets, 
  Users, 
  TrendingUp, 
  FileCheck, 
  ShieldCheck, 
  Download, 
  Sparkles,
  QrCode
} from 'lucide-react';
import { IMPACT_STATISTICS } from '../data/mockData';
import confetti from 'canvas-confetti';

export default function ImpactLedger({ onOpenCertificateModal }) {
  const [calcLaptops, setCalcLaptops] = useState(3);
  const [calcPhones, setCalcPhones] = useState(6);
  const [calcBatteries, setCalcBatteries] = useState(4);
  const [certificateGenerated, setCertificateGenerated] = useState(false);

  // Dynamic calculations based on user input
  const estimatedGoldGrams = (calcLaptops * 0.082 + calcPhones * 0.034).toFixed(2);
  const estimatedCopperKg = (calcLaptops * 0.35 + calcPhones * 0.08 + calcBatteries * 0.12).toFixed(2);
  const estimatedCo2AvoidedKg = ((calcLaptops * 32) + (calcPhones * 14) + (calcBatteries * 18)).toFixed(0);
  const waterProtectedLiters = (estimatedCo2AvoidedKg * 22).toLocaleString();

  const handleGenerateCertificate = () => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 }
    });
    setCertificateGenerated(true);
    if (onOpenCertificateModal) {
      onOpenCertificateModal({
        laptops: calcLaptops,
        phones: calcPhones,
        batteries: calcBatteries,
        goldGrams: estimatedGoldGrams,
        copperKg: estimatedCopperKg,
        co2Kg: estimatedCo2AvoidedKg
      });
    }
  };

  return (
    <div className="impact-ledger-container">
      {/* Top Banner */}
      <div className="tab-banner">
        <div>
          <h2>EPR Impact Ledger & Circular Economy Metrics</h2>
          <p>
            Track real ecological diversion metrics, heavy metal soil protection, and fair informal sector economic empowerment.
          </p>
        </div>
        <div className="impact-badge">
          <Award size={16} className="text-emerald" />
          <span>CPCB Registered • ISO 14001 Audit Ready</span>
        </div>
      </div>

      {/* Aggregate Impact Counters Grid */}
      <div className="impact-metrics-grid">
        <div className="metric-card">
          <div className="metric-icon-box bg-emerald">
            <Leaf size={22} />
          </div>
          <div className="metric-content">
            <span className="metric-label">E-Waste Diverted from Dumpsites</span>
            <div className="metric-value">
              {(IMPACT_STATISTICS.totalEwasteDivertedKg / 1000).toFixed(1)} <small>Tonnes</small>
            </div>
            <span className="metric-delta">▲ 142,850 kg certified diverted</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon-box bg-cyan">
            <Droplets size={22} />
          </div>
          <div className="metric-content">
            <span className="metric-label">Groundwater Saved from Toxic Leach</span>
            <div className="metric-value">
              {(IMPACT_STATISTICS.mercuryContaminationSavedLiters / 1000000).toFixed(1)}M <small>Liters</small>
            </div>
            <span className="metric-delta">Zero cadmium / lead contamination</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon-box bg-amber">
            <TrendingUp size={22} />
          </div>
          <div className="metric-content">
            <span className="metric-label">CO₂ Mining Emissions Abated</span>
            <div className="metric-value">
              {(IMPACT_STATISTICS.co2EmissionsAvoidedKg / 1000).toFixed(1)} <small>Tonnes CO₂e</small>
            </div>
            <span className="metric-delta">Equivalent to 44,800 trees planted</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon-box bg-purple">
            <Users size={22} />
          </div>
          <div className="metric-content">
            <span className="metric-label">Informal Livelihoods Supported</span>
            <div className="metric-value">
              {IMPACT_STATISTICS.fairLivelihoodsSupported.toLocaleString()} <small>Workers</small>
            </div>
            <span className="metric-delta text-emerald">+38.5% average income increase</span>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Interactive ROI Calculator + Verifiable Certificate */}
      <div className="impact-interactive-split">
        {/* Left: Household & Corporate Calculator */}
        <div className="calculator-card">
          <div className="calc-header">
            <div>
              <h3>Interactive Circular Footprint Calculator</h3>
              <p>Simulate your household or organization's e-waste recovery impact</p>
            </div>
            <Sparkles size={20} className="text-cyan" />
          </div>

          <div className="calc-inputs-list">
            <div className="calc-row">
              <label>Laptops / Servers to Recycle:</label>
              <div className="counter-controls">
                <button onClick={() => setCalcLaptops(Math.max(0, calcLaptops - 1))}>-</button>
                <span>{calcLaptops} units</span>
                <button onClick={() => setCalcLaptops(calcLaptops + 1)}>+</button>
              </div>
            </div>

            <div className="calc-row">
              <label>Smartphones & Tablets:</label>
              <div className="counter-controls">
                <button onClick={() => setCalcPhones(Math.max(0, calcPhones - 1))}>-</button>
                <span>{calcPhones} units</span>
                <button onClick={() => setCalcPhones(calcPhones + 1)}>+</button>
              </div>
            </div>

            <div className="calc-row">
              <label>Lithium Batteries / Powerbanks:</label>
              <div className="counter-controls">
                <button onClick={() => setCalcBatteries(Math.max(0, calcBatteries - 1))}>-</button>
                <span>{calcBatteries} units</span>
                <button onClick={() => setCalcBatteries(calcBatteries + 1)}>+</button>
              </div>
            </div>
          </div>

          {/* Results Summary Box */}
          <div className="calc-results-box">
            <h4>Estimated Circular Recovery Yield:</h4>
            <div className="calc-results-grid">
              <div className="res-stat">
                <span className="res-val">{estimatedGoldGrams}g</span>
                <span className="res-label">Pure Gold Recovered</span>
              </div>
              <div className="res-stat">
                <span className="res-val">{estimatedCopperKg} kg</span>
                <span className="res-label">High-Purity Copper</span>
              </div>
              <div className="res-stat">
                <span className="res-val">{estimatedCo2AvoidedKg} kg</span>
                <span className="res-label">CO₂ Abated vs Ore</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Verifiable EPR Certificate Card */}
        <div className="certificate-preview-card">
          <div className="cert-card-header">
            <div className="flex-align">
              <ShieldCheck size={20} className="text-emerald" />
              <div>
                <h4>Official Circular EPR Certificate</h4>
                <small>AWS Cedar Verified & Immutable Batch Hash</small>
              </div>
            </div>
            <span className="badge-live-pass">CPCB Compliant</span>
          </div>

          <div className="cert-body">
            <div className="cert-border-ornament">
              <div className="cert-title-stamp">CIRCLO ENVIRONMENTAL AUDIT</div>
              <p className="cert-text">
                Certified that this e-waste batch was collected via <strong>Verified Informal Recycler Network</strong> and transferred to <strong>R2 Clean Refiners Hub</strong> under AWS Cedar Policy #5 compliance guidelines.
              </p>

              <div className="cert-metrics-pill-row">
                <div className="pill-item">
                  <strong>{estimatedCo2AvoidedKg} kg</strong> CO₂ Avoided
                </div>
                <div className="pill-item">
                  <strong>{waterProtectedLiters} L</strong> Water Saved
                </div>
              </div>

              <div className="cert-meta-row">
                <div>
                  <small>Batch Verification Hash:</small>
                  <code>0x7F4B...99A2 (Cedar Permit #5)</code>
                </div>
                <QrCode size={40} className="cert-qr" />
              </div>
            </div>
          </div>

          <button 
            className="btn-download-cert"
            onClick={handleGenerateCertificate}
          >
            <Download size={16} />
            <span>Generate & View Full Certificate</span>
          </button>
        </div>
      </div>
    </div>
  );
}
