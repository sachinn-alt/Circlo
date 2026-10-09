import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const translations = {
  en: {
    // Navigation
    navHowItWorks: "HOW IT WORKS",
    navAiScanner: "AI SCANNER",
    navFindRecyclers: "FIND RECYCLERS",
    navCollectorHub: "COLLECTOR HUB",
    navFairPriceGuard: "FAIR PRICE GUARD",
    navImpactLedger: "IMPACT LEDGER",
    navScanDevice: "SCAN DEVICE",
    navAwsArchitecture: "AWS ARCHITECTURE",

    // Marquee
    marqueeRecyclers: "1,500,000 INFORMAL RECYCLERS EMPOWERED",
    marqueeScale: "100% DIGITAL SCALE ACCURACY GUARANTEED",
    marqueeZeroBurn: "ZERO TOXIC BACKYARD BURNING",
    marqueeFairPrice: "GUARANTEED 85% FAIR SCRAP FLOOR PRICE",
    marqueeUpi: "DIRECT INSTANT UPI BANK PAYOUTS",
    marqueeCpcb: "AUDITED CPCB GREEN RECYCLING CERTIFICATES",

    // Hero
    heroHeadline1: "RECYCLE TECH.",
    heroHeadline2: "GET PAID CASH.",
    heroHeadline3: "STOP THE BURNING.",
    heroSubhead: "Circlo bridges urban households directly with 1.5 million certified local Kabadiwalas. We eliminate cheating middlemen, enforce digital scale accuracy, and put an end to toxic backyard wire burning.",
    heroScanBtn: "SCAN YOUR GADGET NOW",
    heroFindBtn: "FIND NEARBY COLLECTORS",
    heroStatRecyclers: "INFORMAL RECYCLERS EMPOWERED",
    heroStatPayout: "MCX BENCHMARK VALUE PAID TO RESIDENTS",
    heroStatToxic: "TOXIC BACKYARD BURNING BANNED BY CEDAR",

    // Valuator Card
    valuatorTitle: "INSTANT SCRAP VALUATOR",
    valuatorHover: "[ HOVER TO INVERT ]",
    valuatorGuaranteed: "CIVIC GUARANTEED CASH PAYOUT",
    valuatorPickupBtn: "LOCK FAIR PRICE & DISPATCH KABADIWALA",

    // Scanner
    scannerKicker: "[ SPECTROMETER // REAL-TIME METAL YIELD ORACLE ]",
    scannerHeading: "AI E-WASTE SPECTROMETER.",
    scannerSubhead: "Classifies electronic device architecture, calculates extracted precious metals, and delivers guaranteed market rates.",
    scannerCameraViewport: "CAMERA VIEWPORT",
    scannerLiveSpectrometer: "LIVE SPECTROMETER",
    scannerGuaranteedPayout: "GUARANTEED CIVIC SCRAP VALUE",
    scannerExtractableElements: "EXTRACTABLE PRECIOUS ELEMENTS",
    scannerBookPickup: "BOOK DOORSTEP PICKUP FOR THIS BATCH",
    scannerLiveWebcam: "LIVE WEBCAM SCAN",
    scannerUploadPhoto: "UPLOAD PHOTO",
    scannerCaptureFrame: "CAPTURE & ANALYZE FRAME",
    scannerStopWebcam: "STOP CAMERA",

    // Map
    mapKicker: "[ CIVIC RADAR // HYPERLOCAL COLLECTOR LOCATOR ]",
    mapHeading: "FIND NEARBY COLLECTORS.",
    mapSubhead: "Locate certified neighborhood Kabadiwalas within walking distance. All verified partners carry calibrated digital scales and transfer instant UPI payouts.",
    mapRadius: "SEARCH RADIUS",
    mapNearbyCollectors: "NEARBY COLLECTORS",
    mapBookPickup: "BOOK DOORSTEP PICKUP",

    // Architecture
    archTitle: "PRODUCTION CLOUD ARCHITECTURE",
    archSubhead: "Decentralized AWS OpenSearch Serverless, AWS Cedar Policy Engine, and Bedrock Multimodal AI.",
    
    // Certificate
    certTitle: "CIRCULAR STEWARDSHIP CERTIFICATE",
    certPrint: "PRINT / PDF DOCKET",
    certShareWhatsapp: "SHARE TO WHATSAPP",
    certCopyHash: "COPY AUDIT HASH",
    certHashCopied: "HASH COPIED!",
  },

  hi: {
    // Navigation
    navHowItWorks: "कैसे काम करता है",
    navAiScanner: "एआई स्कैनर",
    navFindRecyclers: "कबाड़ी खोजें",
    navCollectorHub: "कबाड़ी हब",
    navFairPriceGuard: "उचित मूल्य गार्ड",
    navImpactLedger: "प्रभाव खाता",
    navScanDevice: "गैजेट स्कैन करें",
    navAwsArchitecture: "AWS आर्किटेक्चर",

    // Marquee
    marqueeRecyclers: "15,00,000 अनौपचारिक कबाड़ी सशक्त",
    marqueeScale: "100% प्रमाणित डिजिटल वजन गारंटी",
    marqueeZeroBurn: "शून्य जहरीला तार दहन",
    marqueeFairPrice: "85% न्यूनतम उचित मूल्य गारंटी",
    marqueeUpi: "बैंक में सीधा त्वरित UPI भुगतान",
    marqueeCpcb: "CPCB प्रमाणित हरित रीसाइक्लिंग सर्टिफिकेट",

    // Hero
    heroHeadline1: "तकनीक रीसायकल करें।",
    heroHeadline2: "तुरंत नकद पाएं।",
    heroHeadline3: "जलाना बंद करें।",
    heroSubhead: "सर्कलो शहरी घरों को 15 लाख प्रमाणित स्थानीय कबाड़ीवालों से सीधे जोड़ता है। हम बिचौलियों की धोखाधड़ी खत्म करते हैं, डिजिटल तराजू की सटीकता सुनिश्चित करते हैं और जहरीले तार जलाने पर रोक लगाते हैं।",
    heroScanBtn: "अपना गैजेट अभी स्कैन करें",
    heroFindBtn: "पास के कबाड़ी खोजें",
    heroStatRecyclers: "अनौपचारिक कबाड़ी सशक्तिकरण",
    heroStatPayout: "MCX बेंचमार्क मूल्य सीधा नागरिक को",
    heroStatToxic: "CEDAR द्वारा अवैध जहरीला दहन प्रतिबंधित",

    // Valuator Card
    valuatorTitle: "तुरंत ई-स्क्रैप मूल्य जांचें",
    valuatorHover: "[ उलटने के लिए होवर करें ]",
    valuatorGuaranteed: "गारंटीकृत नकद भुगतान",
    valuatorPickupBtn: "उचित मूल्य लॉक करें और कबाड़ी बुलाएं",

    // Scanner
    scannerKicker: "[ स्पेक्ट्रोमीटर // वास्तविक समय धातु मूल्य ]",
    scannerHeading: "एआई ई-कचरा स्पेक्ट्रोमीटर।",
    scannerSubhead: "इलेक्ट्रॉनिक गैजेट की पहचान करता है, कीमती धातुओं की मात्रा आंकता है और गारंटीकृत बाजार मूल्य देता है।",
    scannerCameraViewport: "कैमरा दृश्य",
    scannerLiveSpectrometer: "लाइव स्पेक्ट्रोमीटर",
    scannerGuaranteedPayout: "नागरिक गारंटीकृत स्क्रैप मूल्य",
    scannerExtractableElements: "प्राप्त होने वाली कीमती धातुएं",
    scannerBookPickup: "इस स्क्रैप के लिए घर से पिकअप बुक करें",
    scannerLiveWebcam: "लाइव वेबकैम स्कैन",
    scannerUploadPhoto: "फोटो अपलोड करें",
    scannerCaptureFrame: "फ्रेम कैप्चर और विश्लेषण",
    scannerStopWebcam: "कैमरा बंद करें",

    // Map
    mapKicker: "[ सिविक रडार // स्थानीय कबाड़ी लोकेटर ]",
    mapHeading: "पास के कबाड़ी ढूंढें।",
    mapSubhead: "पैदल दूरी के भीतर प्रमाणित पड़ोस के कबाड़ीवालों का पता लगाएं। सभी साथी डिजिटल तराजू से सही वजन और तुरंत UPI भुगतान करते हैं।",
    mapRadius: "खोज दायरा",
    mapNearbyCollectors: "आसपास के कबाड़ी",
    mapBookPickup: "घर से पिकअप बुक करें",

    // Architecture
    archTitle: "क्लाउड सिस्टम आर्किटेक्चर",
    archSubhead: "AWS OpenSearch सर्वरलेस, AWS Cedar पॉलिसी इंजन और Bedrock मल्टीमॉडल एआई।",

    // Certificate
    certTitle: "सर्कुलर स्टीवर्डशिप प्रमाणपत्र",
    certPrint: "प्रिंट / PDF डॉकेट",
    certShareWhatsapp: "व्हाट्सएप पर शेयर करें",
    certCopyHash: "ऑडिट हैश कॉपी करें",
    certHashCopied: "हैश कॉपी हो गया!",
  }
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en');

  const t = (key) => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'hi' : 'en'));
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
