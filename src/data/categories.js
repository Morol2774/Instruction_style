export const CATEGORIES = [
  "Card Printers", "Consumables", "Cradles", "Desktop Printers", "Headset",
  "Industrial Printers", "Kiosk", "Mobile Computers", "Mobile Printers",
  "PSION products", "Scanners", "Tablets", "Terminals", "Touch Computers",
];

export const SUBCATEGORIES = [
  "Screen", "Camera", "Button", "Motherboard", "Battery",
  "Speaker", "Charging Port", "Keyboard", "Touchpad", "Housing",
];

export const JOB_TYPES = [
  "Billable (Fixed Price Repair)",
  "Comprehensive Coverage Repair",
  "Non-comprehensive coverage repair / Z1C SV Contract / Non-Billable",
  "Spare pool repair as new",
  "Spare pool repair as standard",
  "Warranty repair",
];

export const ACTIONS = [
  "Replace",
  "Repair",
  "Replace - send the unit to verifications for quote",
  "Send for quote",
  "Do not replace",
];

// One hue per category; the badge tints itself from it for both themes.
export const CAT_COLOR = {
  "Card Printers": "#60a5fa",
  "Consumables": "#a78bfa",
  "Cradles": "#34d399",
  "Desktop Printers": "#f59e0b",
  "Headset": "#f472b6",
  "Industrial Printers": "#f87171",
  "Kiosk": "#22d3ee",
  "Mobile Computers": "#86efac",
  "Mobile Printers": "#38bdf8",
  "PSION products": "#c084fc",
  "Scanners": "#4ade80",
  "Tablets": "#e879f9",
  "Terminals": "#fb923c",
  "Touch Computers": "#67e8f9",
  "Other": "#94a3b8",
};

export const catColor = (cat) => CAT_COLOR[cat] || CAT_COLOR.Other;
