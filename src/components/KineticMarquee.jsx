import React from 'react';
import RawMarquee from 'react-fast-marquee';

// Resolve CJS / ESM nested default export safely
const MarqueeComp = 
  typeof RawMarquee === 'function' || RawMarquee?.$$typeof
    ? RawMarquee
    : (RawMarquee?.default?.default || RawMarquee?.default || RawMarquee);

export default function KineticMarquee({ speed = 60, children, className = '', style = {} }) {
  if (MarqueeComp && (typeof MarqueeComp === 'function' || MarqueeComp.$$typeof)) {
    return (
      <MarqueeComp speed={speed} gradient={false} autoFill={true} className={className} style={style}>
        {children}
      </MarqueeComp>
    );
  }

  // Graceful pure CSS fallback
  return (
    <div className={className} style={{ overflow: 'hidden', whiteSpace: 'nowrap', ...style }}>
      <div style={{ display: 'inline-flex' }}>
        {children}
        {children}
      </div>
    </div>
  );
}
