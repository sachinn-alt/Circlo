import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  Truck, 
  MapPin, 
  ShieldCheck, 
  QrCode, 
  CreditCard,
  Scale
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function PickupModal({ recycler, item, onClose }) {
  const [address, setAddress] = useState("Flat 402, Barakhamba Towers, Connaught Place, New Delhi");
  const [phone, setPhone] = useState("+91 98112 00000");
  const [pickupConfirmed, setPickupConfirmed] = useState(false);

  const handleConfirm = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    setPickupConfirmed(true);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="flex-align">
            <Truck size={20} className="text-emerald" />
            <h3>{pickupConfirmed ? "Pickup Dispatched!" : "Confirm Doorstep E-Waste Pickup"}</h3>
          </div>
          <button className="btn-modal-close" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {!pickupConfirmed ? (
          <div className="modal-body">
            {/* Collector Summary Card */}
            <div className="modal-collector-card">
              <img src={recycler.avatar} alt={recycler.name} className="modal-avatar" />
              <div>
                <div className="modal-collector-name">{recycler.name}</div>
                <div className="modal-collector-meta">
                  <span>{recycler.vehicleType}</span> • <span>ETA ~{recycler.currentEtaMinutes} mins</span>
                </div>
                <div className="modal-badges-row">
                  <span className="badge-fair-price">★ Fair Floor Pledge</span>
                  {recycler.certifications.includes("HAZMAT_EWASTE_L2") && (
                    <span className="badge-hazmat">⚡ Hazmat L2 Certified</span>
                  )}
                </div>
              </div>
            </div>

            {/* Item being recycled */}
            {item && (
              <div className="modal-item-recap">
                <span className="recap-label">Item for Pickup:</span>
                <strong className="recap-title">{item.title}</strong>
                <span className="recap-value">Est. Payout: ₹{item.recoveryValue?.fairBenchmark}</span>
              </div>
            )}

            {/* Address & Contact Input */}
            <div className="modal-form">
              <label>
                <span>Pickup Address:</span>
                <input 
                  type="text" 
                  value={address} 
                  onChange={(e) => setAddress(e.target.value)} 
                  className="modal-input"
                />
              </label>

              <label>
                <span>Resident Contact Phone (for SMS PIN):</span>
                <input 
                  type="text" 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)} 
                  className="modal-input"
                />
              </label>
            </div>

            {/* Circlo Trust Guarantees */}
            <div className="modal-guarantees">
              <div className="guarantee-row">
                <Scale size={16} className="text-cyan" />
                <span><strong>Calibrated Digital Scale:</strong> Weight verified digitally via QR code.</span>
              </div>
              <div className="guarantee-row">
                <CreditCard size={16} className="text-emerald" />
                <span><strong>Direct UPI Instant Payout:</strong> Zero commission deducted from informal worker.</span>
              </div>
              <div className="guarantee-row">
                <ShieldCheck size={16} className="text-amber" />
                <span><strong>AWS Cedar Policy Guard:</strong> Zero landfill / zero toxic burning contract.</span>
              </div>
            </div>

            <button className="btn-confirm-pickup" onClick={handleConfirm}>
              <span>Confirm & Dispatch {recycler.name}</span>
            </button>
          </div>
        ) : (
          <div className="modal-success-state">
            <CheckCircle2 size={54} className="text-emerald" />
            <h3>Collector Dispatched!</h3>
            <p>
              <strong>{recycler.name}</strong> is on their way in an <strong>{recycler.vehicleType}</strong>.
            </p>
            <div className="eta-badge-large">
              Estimated Arrival: ~{recycler.currentEtaMinutes} Minutes
            </div>

            <div className="qr-pass-box">
              <QrCode size={90} className="qr-code-img" />
              <div className="qr-pass-info">
                <span>Handover Verification Code:</span>
                <strong className="otp-code">7492</strong>
                <small>Show this to {recycler.name} upon weight confirmation.</small>
              </div>
            </div>

            <button className="btn-done" onClick={onClose}>
              Done & Return to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
