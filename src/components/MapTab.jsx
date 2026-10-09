import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Search, 
  ShieldCheck, 
  Clock, 
  Truck, 
  AlertCircle,
  ArrowRight,
  Radio
} from 'lucide-react';
import { searchRecyclersOpenSearch } from '../services/openSearchClient';

export default function MapTab({ prefilteredSample, onRequestPickup }) {
  const [userLocation, setUserLocation] = useState({ lat: 28.6139, lon: 77.2090, city: "New Delhi (Connaught Place)" });
  const [radiusKm, setRadiusKm] = useState(8);
  const [selectedMaterial, setSelectedMaterial] = useState(prefilteredSample ? prefilteredSample.category : "");
  const [verifiedOnly, setVerifiedOnly] = useState(true);
  const [selectedRecycler, setSelectedRecycler] = useState(null);

  // Map DOM reference
  const mapContainerRef = useRef(null);
  const leafletMapRef = useRef(null);
  const markersRef = useRef([]);

  // Query Recyclers
  const searchResults = searchRecyclersOpenSearch(
    userLocation.lat,
    userLocation.lon,
    radiusKm,
    selectedMaterial || null,
    verifiedOnly
  );

  const recyclers = searchResults.hits.hits.map(h => h._source);

  // Leaflet Map Lifecycle - Init once, update layers smoothly
  useEffect(() => {
    let isMounted = true;

    import('leaflet').then((leafletModule) => {
      if (!isMounted || !mapContainerRef.current) return;
      const L = leafletModule.default || leafletModule;
      if (!L || !L.map) return;

      try {
        if (!leafletMapRef.current) {
          const map = L.map(mapContainerRef.current, {
            center: [userLocation.lat, userLocation.lon],
            zoom: 13,
            zoomControl: false
          });

          // Carto Dark Matter Tiles
          L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
            subdomains: 'abcd',
            maxZoom: 19
          }).addTo(map);

          L.control.zoom({ position: 'bottomright' }).addTo(map);
          leafletMapRef.current = map;
        }

        const map = leafletMapRef.current;
        if (!map) return;

        // Clear existing markers
        markersRef.current.forEach(m => {
          try { map.removeLayer(m); } catch (e) {}
        });
        markersRef.current = [];

        // User Marker
        const userIcon = L.divIcon({
          className: 'custom-user-marker',
          html: `<div style="width:20px;height:20px;background:#dfe104;border:2px solid #000;box-shadow:0 0 12px #dfe104"></div>`,
          iconSize: [20, 20],
          iconAnchor: [10, 10]
        });
        const userMarker = L.marker([userLocation.lat, userLocation.lon], { icon: userIcon })
          .addTo(map)
          .bindPopup(`<b>YOUR LOCATION</b><br/>${userLocation.city}`);
        markersRef.current.push(userMarker);

        // Search Radius Circle
        const radiusCircle = L.circle([userLocation.lat, userLocation.lon], {
          radius: radiusKm * 1000,
          color: '#dfe104',
          fillColor: '#dfe104',
          fillOpacity: 0.08,
          weight: 2,
          dashArray: '4, 4'
        }).addTo(map);
        markersRef.current.push(radiusCircle);

        // Recycler Pins
        recyclers.forEach(rec => {
          const isSelected = selectedRecycler && selectedRecycler.id === rec.id;
          const recIcon = L.divIcon({
            className: 'custom-rec-marker-kinetic',
            html: `<div class="marker-pin-box ${isSelected ? 'selected' : ''}">
                    ${rec.rating.toFixed(1)}
                   </div>`,
            iconSize: [38, 38],
            iconAnchor: [19, 19]
          });

          const marker = L.marker([rec.location.lat, rec.location.lon], { icon: recIcon })
            .addTo(map)
            .on('click', () => {
              setSelectedRecycler(rec);
            });

          marker.bindTooltip(`<b>${rec.name.toUpperCase()}</b><br/>${rec.distanceKm} KM • ${rec.vehicleType}`);
          markersRef.current.push(marker);
        });
      } catch (err) {
        console.warn('Leaflet map error handled gracefully:', err);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [userLocation, radiusKm, recyclers.length, selectedRecycler?.id]);

  // Clean up on complete unmount
  useEffect(() => {
    return () => {
      if (leafletMapRef.current) {
        try {
          leafletMapRef.current.remove();
        } catch (e) {}
        leafletMapRef.current = null;
      }
    };
  }, []);

  return (
    <div style={{ paddingTop: '20px', paddingBottom: '60px' }}>
      
      {/* Section Header */}
      <div style={{ marginBottom: '32px' }}>
        <span style={{ 
          fontFamily: 'var(--font-space)', 
          fontSize: '13px', 
          fontWeight: 800, 
          letterSpacing: '0.12em', 
          color: 'var(--accent-color)' 
        }}>
          [ CIVIC RADAR // HYPERLOCAL COLLECTOR LOCATOR ]
        </span>
        <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 800, textTransform: 'uppercase', marginTop: '8px' }}>
          FIND NEARBY COLLECTORS.
        </h2>
        <p style={{ fontFamily: 'var(--font-inter)', fontSize: '18px', color: 'var(--muted-fg-color)', maxWidth: '640px', marginTop: '12px' }}>
          Locate certified neighborhood Kabadiwalas within walking distance. 
          All verified partners carry calibrated digital scales and transfer instant UPI payouts.
        </p>
      </div>

      {/* Brutalist 2-Column Grid */}
      <div className="radar-split-brutalist">
        
        {/* Left Column: Filter Controls & Recyclers Scroll List */}
        <div style={{ backgroundColor: 'var(--bg-color)', padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Radius Control */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontFamily: 'var(--font-space)', fontSize: '13px', fontWeight: 800, textTransform: 'uppercase' }}>
                SEARCH RADIUS
              </span>
              <span style={{ fontFamily: 'var(--font-space)', fontSize: '15px', fontWeight: 900, color: 'var(--accent-color)' }}>
                {radiusKm} KM
              </span>
            </div>
            <input 
              type="range" 
              min="1" 
              max="20" 
              value={radiusKm} 
              onChange={(e) => setRadiusKm(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--accent-color)' }}
            />
          </div>

          {/* Recyclers Count Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid var(--border-color)', paddingBottom: '12px' }}>
            <span style={{ fontFamily: 'var(--font-space)', fontSize: '14px', fontWeight: 800, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="kinetic-live-dot" />
              NEARBY COLLECTORS ({recyclers.length})
            </span>
            <span style={{ fontSize: '12px', color: 'var(--muted-fg-color)' }}>
              SORTED BY DISTANCE
            </span>
          </div>

          {/* Collectors List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '360px', overflowY: 'auto' }}>
            {recyclers.map(rec => (
              <motion.div 
                key={rec.id}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  border: '2px solid var(--border-color)',
                  backgroundColor: selectedRecycler?.id === rec.id ? 'var(--accent-color)' : 'var(--muted-color)',
                  color: selectedRecycler?.id === rec.id ? '#000000' : 'var(--fg-color)',
                  padding: '16px',
                  cursor: 'pointer',
                  transition: 'background-color 0.15s ease, color 0.15s ease'
                }}
                onClick={() => setSelectedRecycler(rec)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h4 style={{ 
                      fontSize: '18px', 
                      fontWeight: 800, 
                      textTransform: 'uppercase',
                      color: selectedRecycler?.id === rec.id ? '#000000' : 'var(--fg-color)'
                    }}>
                      {rec.name}
                    </h4>
                    <p style={{ 
                      fontSize: '13px', 
                      color: selectedRecycler?.id === rec.id ? 'rgba(0,0,0,0.7)' : 'var(--muted-fg-color)',
                      marginTop: '2px'
                    }}>
                      {rec.vehicleType} • {rec.pincode}
                    </p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontFamily: 'var(--font-space)', fontWeight: 800, fontSize: '15px' }}>
                      {rec.distanceKm} KM
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px', marginTop: '12px', flexWrap: 'wrap' }}>
                  {(rec.specializations || rec.certifications || []).map((spec, sIdx) => (
                    <span 
                      key={sIdx}
                      style={{ 
                        fontSize: '11px', 
                        fontFamily: 'var(--font-space)',
                        fontWeight: 800, 
                        padding: '2px 6px',
                        border: '1px solid currentColor'
                      }}
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Request Pickup Button with Micro-Interaction */}
          {selectedRecycler && (
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-kinetic-primary"
              style={{ width: '100%', marginTop: 'auto' }}
              onClick={() => onRequestPickup(selectedRecycler)}
            >
              <span>BOOK DOORSTEP PICKUP WITH {selectedRecycler.name}</span>
              <span className="btn-icon">
                <ArrowRight size={18} />
              </span>
            </motion.button>
          )}

        </div>

        {/* Right Column: Leaflet Map Canvas */}
        <div style={{ backgroundColor: '#000000', position: 'relative' }}>
          <div ref={mapContainerRef} className="map-viewport-brutalist" />
          
          {/* Floating Legend */}
          <div style={{ 
            position: 'absolute', 
            bottom: '20px', 
            left: '20px', 
            zIndex: 1000, 
            backgroundColor: '#000000', 
            border: '2px solid var(--border-color)',
            padding: '12px 16px',
            fontFamily: 'var(--font-space)',
            fontSize: '12px',
            fontWeight: 800
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span style={{ width: '10px', height: '10px', backgroundColor: 'var(--accent-color)', border: '1px solid #000' }} />
              <span>VERIFIED KABADIWALA PIN</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '10px', height: '10px', backgroundColor: '#dfe104', border: '1px solid #000', boxShadow: '0 0 6px #dfe104' }} />
              <span>YOUR LOCATION</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
