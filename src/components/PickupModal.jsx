import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  Truck, 
  Scale, 
  CreditCard 
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
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.85)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2000,
      padding: '20px'
    }} onClick={onClose}>
      
      <div style={{
        backgroundColor: '#09090b',
        border: '2px solid var(--accent-color)',
        maxWidth: '560px',
        width: '100%',
        padding: '36px',
        color: '#fafafa'
      }} onClick={(e) => e.stopPropagation()}>
        
        {/* Modal Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid var(--border-color)', paddingBottom: '16px', marginBottom: '24px' }}>
          <div>
            <span style={{ fontFamily: 'var(--font-space)', fontSize: '11px', fontWeight: 800, color: 'var(--accent-color)', letterSpacing: '0.1em' }}>
              [ DOORSTEP DISPATCH PROTOCOL ]
            </span>
            <h3 style={{ fontFamily: 'var(--font-space)', fontSize: '24px', fontWeight: 800, textTransform: 'uppercase', marginTop: '4px' }}>
              {pickupConfirmed ? "PICKUP DISPATCHED!" : "CONFIRM DOORSTEP PICKUP"}
            </h3>
          </div>
          <button 
            style={{ color: '#fafafa', background: 'none', border: 'none', cursor: 'pointer' }}
            onClick={onClose}
          >
            <X size={22} />
          </button>
        </div>

        {!pickupConfirmed ? (
          <div>
            {/* Collector Recap */}
            <div style={{ 
              backgroundColor: 'var(--muted-color)', 
              border: '2px solid var(--border-color)', 
              padding: '16px',
              display: 'flex',
              gap: '16px',
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <img 
                src={recycler.avatar} 
                alt={recycler.name} 
                style={{ width: '48px', height: '48px', objectFit: 'cover', border: '2px solid var(--accent-color)' }}
              />
              <div>
                <strong style={{ fontFamily: 'var(--font-space)', fontSize: '16px', textTransform: 'uppercase' }}>
                  {recycler.name}
                </strong>
                <p style={{ fontSize: '12px', color: 'var(--muted-fg-color)', marginTop: '2px' }}>
                  {recycler.vehicleType} • ETA ~{recycler.currentEtaMinutes} MINS • PINCODE: {recycler.pincode}
                </p>
              </div>
            </div>

            {/* Address & Phone */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontFamily: 'var(--font-space)', fontWeight: 800, textTransform: 'uppercase', marginBottom: '6px' }}>
                  PICKUP ADDRESS:
                </label>
                <input 
                  type="text" 
                  value={address} 
                  onChange={(e) => setAddress(e.target.value)} 
                  style={{
                    width: '100%',
                    backgroundColor: '#000000',
                    border: '2px solid var(--border-color)',
                    color: '#fafafa',
                    padding: '12px 14px',
                    fontFamily: 'var(--font-space)',
                    fontSize: '14px'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontFamily: 'var(--font-space)', fontWeight: 800, textTransform: 'uppercase', marginBottom: '6px' }}>
                  RESIDENT PHONE FOR OTP:
                </label>
                <input 
                  type="text" 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)} 
                  style={{
                    width: '100%',
                    backgroundColor: '#000000',
                    border: '2px solid var(--border-color)',
                    color: '#fafafa',
                    padding: '12px 14px',
                    fontFamily: 'var(--font-space)',
                    fontSize: '14px'
                  }}
                />
              </div>
            </div>

            {/* Action Trigger */}
            <button 
              className="btn-kinetic-primary"
              style={{ width: '100%' }}
              onClick={handleConfirm}
            >
              <span>CONFIRM PICKUP & DISPATCH OTP →</span>
            </button>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <div style={{ 
              width: '64px', 
              height: '64px', 
              backgroundColor: 'var(--accent-color)', 
              color: '#000000', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              margin: '0 auto 20px auto',
              fontWeight: 900,
              fontSize: '28px'
            }}>
              ✓
            </div>
            <h4 style={{ fontFamily: 'var(--font-space)', fontSize: '24px', fontWeight: 800, textTransform: 'uppercase' }}>
              DISPATCH CONFIRMED!
            </h4>
            <p style={{ fontSize: '15px', color: 'var(--muted-fg-color)', margin: '12px 0 24px 0' }}>
              {recycler.name} is on the way. Your calibrated Bluetooth scale security pin is <strong>#4821</strong>.
            </p>
            <button 
              className="btn-kinetic-primary"
              onClick={onClose}
            >
              <span>RETURN TO PLATFORM</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
