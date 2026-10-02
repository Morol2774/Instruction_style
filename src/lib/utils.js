const pad = (n) => String(n).padStart(2, "0");

export function genId() {
  const d = new Date();
  return `INS-${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}-${pad(d.getHours())}${pad(d.getMinutes())}-${Math.floor(Math.random() * 900) + 100}`;
}

export function formatDate(s) {
  if (!s) return "—";
  try {
    return new Date(s).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  } catch {
    return s;
  }
}

export const today = () => new Date().toISOString().split("T")[0];

// Old category names → new names
const CAT_MIGRATE = {
  Phone: "Mobile Computers",
  Printer: "Mobile Printers",
  Scanner: "Scanners",
  Tablet: "Tablets",
};

export function migrateInstructions(list) {
  return list.map((i) => (CAT_MIGRATE[i.category] ? { ...i, category: CAT_MIGRATE[i.category] } : i));
}

export const includesCI = (text, q) => text.toLowerCase().includes(q.toLowerCase());
export const uniqueSorted = (arr) => [...new Set(arr)].sort();
