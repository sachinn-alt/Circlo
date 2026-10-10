import React from 'react';
import { TrendingUp, TrendingDown, Minus, ShieldCheck } from 'lucide-react';
import { getLiveCommodityPrices } from '../services/commodityOracle';

export default function CommodityTicker() {
  const prices = getLiveCommodityPrices();
  // Duplicate array for seamless infinite marquee
  const tickerItems = [...prices, ...prices];

  return (
    <div className="ticker-wrapper">
      <div className="ticker-badge">
        <span className="live-dot" />
        <span className="ticker-title">MCX / CIVIC SCRAP INDEX</span>
      </div>
      <div className="ticker-viewport">
        <div className="ticker-track">
          {tickerItems.map((item, index) => (
            <div key={`${item.id}-${index}`} className="ticker-item">
              <span className="ticker-item-name">{item.name}</span>
              <span className="ticker-item-price">{item.pricePerKg} <small>{item.unit}</small></span>
              <span className={`ticker-item-change ${item.trend}`}>
                {item.trend === 'up' && <TrendingUp size={12} />}
                {item.trend === 'down' && <TrendingDown size={12} />}
                {item.trend === 'neutral' && <Minus size={12} />}
                {item.change24h}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="ticker-cta">
        <ShieldCheck size={14} className="text-emerald" />
        <span>Cedar Floor Price Protected</span>
      </div>
    </div>
  );
}
