// ==============================================================================
// CIRCLO WHATSAPP DISPATCH & LEAD NOTIFICATION SERVICE
// Creates universal pre-formatted WhatsApp deep links for 1-tap doorstep pickup booking
// and direct kabadiwala lead acceptance in India.
// ==============================================================================

/**
 * Generates a WhatsApp URL to book a doorstep e-waste pickup.
 * @param {Object} details 
 * @param {string} details.itemName
 * @param {string} details.estimatedWeight
 * @param {string} details.payout
 * @param {string} details.city
 * @returns {string} Universal WhatsApp Web/App URL
 */
export function generateWhatsAppBookingUrl({ itemName, estimatedWeight, payout, city = "Kolkata / Salt Lake" }) {
  const text = 
`*🔄 CIRCLO DOORSTEP E-WASTE PICKUP REQUEST*
----------------------------------------
📦 *Item:* ${itemName}
⚖️ *Est. Weight:* ${estimatedWeight}
💰 *Guaranteed Payout:* ${payout}
📍 *Pickup Location:* ${city}
🛡️ *Protocol:* Calibrated Digital Scale + Instant UPI
----------------------------------------
_Please dispatch a verified nearby Kabadiwala under CPCB E-Waste Rules 2022._`;

  return `https://wa.me/?text=${encodeURIComponent(text)}`;
}

/**
 * Generates a WhatsApp URL for a Kabadiwala to claim an active lead.
 * @param {Object} lead
 * @returns {string} Universal WhatsApp URL
 */
export function generateWhatsAppLeadAcceptUrl(lead) {
  const text = 
`*🤝 CIRCLO LEAD CLAIMED — KABADIWALA DISPATCH*
----------------------------------------
👤 *Resident:* ${lead.resident}
📍 *Area:* ${lead.area}
📦 *Scrap Batch:* ${lead.items} (${lead.weight})
💵 *Authorized Civic Cash:* ${lead.payout}
⚖️ *Scale Protocol:* Verified Zero-Tampering
----------------------------------------
_I am on my way with a calibrated digital scale and EV rickshaw._`;

  return `https://wa.me/?text=${encodeURIComponent(text)}`;
}
