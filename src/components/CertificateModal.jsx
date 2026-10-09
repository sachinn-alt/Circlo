import React from 'react';
import { X, Award, ShieldCheck, QrCode, Printer, CheckCircle2 } from 'lucide-react';

export default function CertificateModal({ certData, onClose }) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card cert-print-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header no-print">
          <div className="flex-align">
            <Award size={20} className="text-emerald" />
            <h3>Circular Economy & EPR Compliance Certificate</h3>
          </div>
          <div className="flex-align">
            <button className="btn-print" onClick={handlePrint}>
              <Printer size={15} />
              <span>Print / Save PDF</span>
            </button>
            <button className="btn-modal-close" onClick={onClose}>
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Certificate Printable Body */}
        <div className="cert-document-frame">
          <div className="cert-inner-border">
            <div className="cert-logo-row">
              <div className="cert-logo-mark">CIRCLO</div>
              <div className="cert-badge-tag">CPCB / EPR COMPLIANT</div>
            </div>

            <h1 className="cert-main-title">Certificate of Circular Stewardship</h1>
            <p className="cert-lead">
              This document officially certifies verifiable e-waste recovery, toxic diversion, and informal recycler economic inclusion under the Central Pollution Control Board (CPCB) E-Waste Management Rules.
            </p>

            <div className="cert-recipient-box">
              <span className="recip-label">Issued to:</span>
              <strong className="recip-name">Household Environmental Contributor / Circlo Member</strong>
              <span className="recip-id">Transaction Batch UID: CIRCLO-2026-EW-98124</span>
            </div>

            <div className="cert-metrics-showcase">
              <div className="cert-stat-box">
                <span className="val">{certData?.co2Kg || 148} kg</span>
                <span className="lbl">CO₂ Emissions Abated</span>
              </div>
              <div className="cert-stat-box">
                <span className="val">{certData?.goldGrams || 0.45}g</span>
                <span className="lbl">Gold Diverted from Ore Mining</span>
              </div>
              <div className="cert-stat-box">
                <span className="val">{certData?.copperKg || 1.85} kg</span>
                <span className="lbl">Grade-1 Pure Copper Saved</span>
              </div>
              <div className="cert-stat-box">
                <span className="val">100%</span>
                <span className="lbl">Informal Fair Payout Honored</span>
              </div>
            </div>

            <div className="cert-footer-row">
              <div className="cert-signatures">
                <div className="sig-block">
                  <div className="sig-line">CedarPolicyEngine()</div>
                  <span>AWS Cedar Authorization Signer</span>
                </div>
                <div className="sig-block">
                  <div className="sig-line">CPCB / C-Circle Registry</div>
                  <span>Civic Sustainability Officer</span>
                </div>
              </div>

              <div className="cert-qr-block">
                <QrCode size={64} />
                <small>Scan to verify on-chain & OpenSearch ledger</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
