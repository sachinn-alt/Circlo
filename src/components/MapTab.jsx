import React, { useState, useEffect, useRef } from 'react';
import { 
  MapPin, 
  Search, 
  Sliders, 
  ShieldCheck, 
  Navigation, 
  Clock, 
  Code, 
  ChevronDown, 
  ChevronUp, 
  Sparkles,
  Truck,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { searchRecyclersOpenSearch, calculateDistanceKm } from '../services/openSearchClient';

export default function MapTab({ prefilteredSample, onRequestPickup }) {
  const [userLocation, setUserLocation] = useState({ lat: 28.6139, lon: 77.2090, city: "New Delhi (Connaught Place)" });
  const [radiusKm, setRadiusKm] = useState(8);
  const [selectedMaterial, setSelectedMaterial] = useState(prefilteredSample ? prefilteredSample.category : "");
  const [verifiedOnly, setVerifiedOnly] = useState(true);
  const [showQueryDsl, setShowQueryDsl] = useState(false);
  const [selectedRecycler, setSelectedRecycler] = useState(null);

  // Map DOM reference
  const mapContainerRef = useRef(null);
  const leafletMapRef = useRef(null);
  const markersRef = useRef([]);

  // Perform OpenSearch Query
  const searchResults = searchRecyclersOpenSearch(
    userLocation.lat,
    userLocation.lon,
    radiusKm,
    selectedMaterial || null,
    verifiedOnly
  );

  const recyclers = searchResults.hits.hits.map(h => h._source);

  // Initialize and update Leaflet Map
  useEffect(() => {
    let L;
    import('leaflet').then((leaflet) => {
      L = leaflet.default;

      if (!leafletMapRef.current && mapContainerRef.current) {
        // Initialize map
        const map = L.map(mapContainerRef.current, {
          center: [userLocation.lat, userLocation.lon],
          zoom: 13,
          zoomControl: false
        });

        // CARTO Voyager Light Tile Layer for Warm Linen Paper Aesthetic
        L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
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
      markersRef.current.forEach(m => map.removeLayer(m));
      markersRef.current = [];

      // Add User Marker (Cyan pulsing pin)
      const userIcon = L.divIcon({
        className: 'custom-user-marker',
        html: `<div class="marker-user-pulse"><div class="marker-center-dot"></div></div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 14]
      });
      const userMarker = L.marker([userLocation.lat, userLocation.lon], { icon: userIcon })
        .addTo(map)
        .bindPopup(`<b>Your Intake Location</b><br/>${userLocation.city}`);
      markersRef.current.push(userMarker);

      // Add OpenSearch search radius circle (Sage Mint Wash on Linen)
      const radiusCircle = L.circle([userLocation.lat, userLocation.lon], {
        radius: radiusKm * 1000,
        color: '#000000',
        fillColor: '#beedc0',
        fillOpacity: 0.22,
        weight: 1.5,
        dashArray: '5, 5'
      }).addTo(map);
      markersRef.current.push(radiusCircle);

      // Add Recycler Markers
      recyclers.forEach(rec => {
        const isSelected = selectedRecycler && selectedRecycler.id === rec.id;
        const color = rec.collectorType === 'FORMAL_R2_FACILITY' 
          ? '#06b6d4' 
          : rec.kycVerified ? '#10b981' : '#ef4444';

        const recIcon = L.divIcon({
          className: 'custom-rec-marker',
          html: `<div class="marker-pin ${isSelected ? 'selected' : ''}" style="background: ${color}; border-color: #ffffff">
                  <span>${rec.rating.toFixed(1)}</span>
                 </div>`,
          iconSize: [34, 34],
          iconAnchor: [17, 34]
        });

        const marker = L.marker([rec.location.lat, rec.location.lon], { icon: recIcon })
          .addTo(map)
          .on('click', () => {
            setSelectedRecycler(rec);
          });

        marker.bindTooltip(`<b>${rec.name}</b><br/>${rec.distanceKm} km away • ${rec.vehicleType}`);
        markersRef.current.push(marker);
      });
    });

    return () => {
      // Cleanup map on unmount
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
    };
  }, [userLocation, radiusKm, recyclers.length, selectedRecycler?.id]);

  return (
    <div className="map-view-container">
      {/* Search & Control Filters Bar */}
      <div className="map-controls-panel">
        <div className="controls-row">
          {/* Radius Slider */}
          <div className="control-group slider-group">
            <div className="control-label-row">
              <span className="control-label">
                <Navigation size={14} className="text-emerald" /> OpenSearch Geo-Distance:
              </span>
              <strong className="text-emerald">{radiusKm} km</strong>
            </div>
            <input 
              type="range" 
              min="1" 
              max="20" 
              value={radiusKm} 
              onChange={(e) => setRadiusKm(Number(e.target.value))}
              className="range-slider"
            />
          </div>

          {/* Material Specialty Filter */}
          <div className="control-group">
            <span className="control-label">Material Specialization:</span>
            <select 
              value={selectedMaterial} 
              onChange={(e) => setSelectedMaterial(e.target.value)}
              className="control-select"
            >
              <option value="">All Categories</option>
              <option value="PRINTED_CIRCUIT_BOARDS">Printed Circuit Boards (PCBs)</option>
              <option value="LITHIUM_ION_BATTERY">Lithium-Ion Batteries (Hazmat)</option>
              <option value="COPPER_WINDINGS">Copper Windings & Motors</option>
              <option value="POWER_ELECTRONICS">Solar & Power Electronics</option>
            </select>
          </div>

          {/* Verified Toggle */}
          <div className="control-group toggle-group">
            <label className="toggle-label">
              <input 
                type="checkbox" 
                checked={verifiedOnly} 
                onChange={(e) => setVerifiedOnly(e.target.checked)} 
              />
              <span className="checkbox-custom" />
              <span>Verified KYC & Fair Price Only</span>
            </label>
          </div>

          {/* DSL Inspector Toggle */}
          <button 
            className={`btn-dsl-toggle ${showQueryDsl ? 'active' : ''}`}
            onClick={() => setShowQueryDsl(!showQueryDsl)}
          >
            <Code size={14} />
            <span>OpenSearch DSL</span>
            {showQueryDsl ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        </div>

        {/* Collapsible OpenSearch Query DSL Viewer */}
        {showQueryDsl && (
          <div className="dsl-code-container">
            <div className="dsl-header">
              <span>OpenSearch Geospatial Query DSL (Executed in {searchResults.tookMs}ms)</span>
              <span className="dsl-hits">{searchResults.hits.total.value} Matching Hits</span>
            </div>
            <pre className="dsl-pre">
              <code>{JSON.stringify(searchResults.queryDsl, null, 2)}</code>
            </pre>
          </div>
        )}
      </div>

      {/* Map Layout Split */}
      <div className="map-content-split">
        {/* Left: Leaflet Interactive Map Viewport */}
        <div className="map-canvas-card">
          <div ref={mapContainerRef} className="leaflet-map-element" />

          {/* Floating Map Legend */}
          <div className="map-floating-legend">
            <div className="legend-item">
              <span className="legend-dot user-dot" />
              <span>Your Location</span>
            </div>
            <div className="legend-item">
              <span className="legend-dot green-dot" />
              <span>Verified Kabadiwala</span>
            </div>
            <div className="legend-item">
              <span className="legend-dot cyan-dot" />
              <span>Formal R2 Hub</span>
            </div>
            <div className="legend-item">
              <span className="legend-dot red-dot" />
              <span>Flagged / Unverified</span>
            </div>
          </div>
        </div>

        {/* Right: Recycler Hits List */}
        <div className="recyclers-list-panel">
          <div className="list-panel-header">
            <h3>Nearby Verified Collectors ({recyclers.length})</h3>
            <span className="text-dim">Sorted by Geo-Distance</span>
          </div>

          <div className="recyclers-scroll">
            {recyclers.length === 0 ? (
              <div className="no-hits-state">
                <AlertCircle size={32} className="text-amber" />
                <p>No collectors found within {radiusKm} km.</p>
                <button 
                  className="btn-expand-radius"
                  onClick={() => setRadiusKm(15)}
                >
                  Expand Search Radius to 15 km
                </button>
              </div>
            ) : (
              recyclers.map(rec => (
                <div 
                  key={rec.id}
                  className={`recycler-card ${selectedRecycler?.id === rec.id ? 'active' : ''}`}
                  onClick={() => setSelectedRecycler(rec)}
                >
                  <div className="rec-card-top">
                    <img src={rec.avatar} alt={rec.name} className="rec-avatar" />
                    <div className="rec-info">
                      <div className="rec-name-row">
                        <h4>{rec.name}</h4>
                        {rec.kycVerified && (
                          <ShieldCheck size={16} className="text-emerald" title="KYC Verified" />
                        )}
                      </div>
                      <span className="rec-vehicle">
                        <Truck size={13} /> {rec.vehicleType}
                      </span>
                    </div>
                    <div className="rec-distance-badge">
                      <strong>{rec.distanceKm} km</strong>
                      <span>~{rec.currentEtaMinutes} mins</span>
                    </div>
                  </div>

                  {/* Certifications & Badges */}
                  <div className="rec-badges-row">
                    {rec.fairPricePledge && (
                      <span className="badge-fair-price">★ Fair Floor Pledge</span>
                    )}
                    {rec.certifications.includes("HAZMAT_EWASTE_L2") && (
                      <span className="badge-hazmat">⚡ Hazmat L2 Certified</span>
                    )}
                    <span className="badge-rating">⭐ {rec.rating.toFixed(1)} ({rec.totalBatchesCollected} pickups)</span>
                  </div>

                  {/* Dispatch Button */}
                  <div className="rec-card-actions">
                    <button 
                      className="btn-book-pickup"
                      onClick={(e) => {
                        e.stopPropagation();
                        onRequestPickup(rec);
                      }}
                    >
                      <Navigation size={14} />
                      <span>Dispatch Doorstep Pickup</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
