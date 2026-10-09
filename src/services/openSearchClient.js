// ==============================================================================
// AWS OPENSEARCH CLIENT & GEOSPATIAL SEARCH SIMULATOR
// Provides real geo_distance calculations and generates production OpenSearch DSL
// ==============================================================================

import { MOCK_RECYCLERS } from '../data/mockData';

// Haversine formula to compute great-circle distance between two coordinates
export function calculateDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return parseFloat((R * c).toFixed(2));
}

export function buildOpenSearchGeoQuery(userLat, userLon, radiusKm, filterMaterial = null, certifiedOnly = false) {
  const mustClauses = [
    { term: { status: "AVAILABLE" } }
  ];

  if (certifiedOnly) {
    mustClauses.push({ term: { kyc_verified: true } });
  }

  if (filterMaterial) {
    mustClauses.push({ term: { accepted_materials: filterMaterial } });
  }

  return {
    endpoint: "POST /circlo-recyclers/_search",
    body: {
      query: {
        bool: {
          must: mustClauses,
          filter: {
            geo_distance: {
              distance: `${radiusKm}km`,
              location: {
                lat: userLat,
                lon: userLon
              }
            }
          }
        }
      },
      sort: [
        {
          _geo_distance: {
            location: {
              lat: userLat,
              lon: userLon
            },
            order: "asc",
            unit: "km",
            mode: "min",
            distance_type: "arc"
          }
        }
      ]
    }
  };
}

export function searchRecyclersOpenSearch(userLat, userLon, radiusKm = 10, filterMaterial = null, certifiedOnly = false) {
  const queryDsl = buildOpenSearchGeoQuery(userLat, userLon, radiusKm, filterMaterial, certifiedOnly);

  // Execute geospatial filter locally with OpenSearch scoring
  const hits = MOCK_RECYCLERS.map(recycler => {
    const distanceKm = calculateDistanceKm(userLat, userLon, recycler.location.lat, recycler.location.lon);
    return {
      ...recycler,
      distanceKm
    };
  }).filter(recycler => {
    if (recycler.distanceKm > radiusKm) return false;
    if (certifiedOnly && !recycler.kycVerified) return false;
    if (filterMaterial && !recycler.acceptedMaterials.includes(filterMaterial) && !recycler.acceptedMaterials.includes("ALL")) return false;
    return true;
  }).sort((a, b) => a.distanceKm - b.distanceKm);

  return {
    queryDsl,
    tookMs: Math.floor(Math.random() * 8) + 4,
    timedOut: false,
    hits: {
      total: { value: hits.length, relation: "eq" },
      maxScore: 1.0,
      hits: hits.map(h => ({
        _index: "circlo-recyclers",
        _id: h.id,
        _score: (1 / (h.distanceKm + 0.1)).toFixed(3),
        _source: h,
        sort: [h.distanceKm]
      }))
    }
  };
}
