import { useEffect, useMemo, useState } from "react";
import { STORAGE_KEYS } from "./config.js";
import { DEMO_INSTRUCTIONS } from "./data/demo.js";
import { storage } from "./lib/storage.js";
import { includesCI, migrateInstructions, uniqueSorted } from "./lib/utils.js";

import Header from "./components/Header.jsx";
import Sidebar from "./components/Sidebar.jsx";
import SearchPanel from "./components/SearchPanel.jsx";
import InstructionList from "./components/InstructionList.jsx";
import EditModal from "./components/EditModal.jsx";
import LoginModal from "./components/LoginModal.jsx";
import Toast from "./components/Toast.jsx";

export default function App() {
  const [instructions, setInstructions] = useState(() =>
    migrateInstructions(storage.get(STORAGE_KEYS.instructions, DEMO_INSTRUCTIONS))
  );
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || "dark");
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [editIns, setEditIns] = useState(null); // null | instruction ({} = new)
  const [toast, setToast] = useState(null);

  // Search
  const [partNum, setPartNum] = useState("");
  const [subcat, setSubcat] = useState("");
  const [symptom, setSymptom] = useState("");
  const [activeId, setActiveId] = useState(null);

  // Persist
  useEffect(() => storage.set(STORAGE_KEYS.instructions, instructions), [instructions]);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    storage.set(STORAGE_KEYS.theme, theme);
  }, [theme]);

  const notify = (msg, ok = true) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3000);
  };

  // ── Suggestion lists ──────────────────────────────────────
  const byPart = useMemo(
    () => (partNum ? instructions.filter((i) => i.partNumber.toLowerCase() === partNum.toLowerCase()) : instructions),
    [instructions, partNum]
  );
  const partOptions = useMemo(() => uniqueSorted(instructions.map((i) => i.partNumber)), [instructions]);
  const subcatOptions = useMemo(() => uniqueSorted(byPart.map((i) => i.subcategory)), [byPart]);
  const symptomOptions = useMemo(() => {
    const base = subcat ? byPart.filter((i) => includesCI(i.subcategory, subcat)) : byPart;
    return uniqueSorted(base.map((i) => i.symptom));
  }, [byPart, subcat]);

  // ── Search results ────────────────────────────────────────
  const hasSearch = Boolean(partNum.trim() || subcat.trim() || symptom.trim());

  const results = useMemo(() => {
    if (!hasSearch) return [];
    return instructions.filter(
      (i) =>
        (!partNum.trim() || includesCI(i.partNumber, partNum)) &&
        (!subcat.trim() || includesCI(i.subcategory, subcat)) &&
        (!symptom.trim() || includesCI(i.symptom, symptom) || includesCI(i.title, symptom))
    );
  }, [instructions, hasSearch, partNum, subcat, symptom]);

  const sidebarList = partNum.trim() ? instructions.filter((i) => includesCI(i.partNumber, partNum)) : instructions;

  const stats = useMemo(
    () => [
      { icon: "fa-file-lines", val: instructions.length, label: "instructions" },
      { icon: "fa-mobile-screen", val: new Set(instructions.map((i) => i.partNumber)).size, label: "models" },
      { icon: "fa-layer-group", val: new Set(instructions.map((i) => i.category)).size, label: "categories" },
    ],
    [instructions]
  );

  // ── CRUD ──────────────────────────────────────────────────
  const saveIns = (ins) => {
    const exists = instructions.some((i) => i.id === ins.id);
    setInstructions((prev) => (exists ? prev.map((i) => (i.id === ins.id ? ins : i)) : [ins, ...prev]));
    setEditIns(null);
    notify(exists ? "Instruction updated" : "Instruction added");
  };

  const deleteIns = (id) => {
    if (!window.confirm("Delete this instruction permanently?")) return;
    setInstructions((prev) => prev.filter((i) => i.id !== id));
    setEditIns(null);
    notify("Instruction deleted", false);
  };

  const clearSearch = () => {
    setPartNum("");
    setSubcat("");
    setSymptom("");
  };

  return (
    <>
      <Toast toast={toast} />

      {showLogin && (
        <LoginModal
          onLogin={() => {
            setIsAdmin(true);
            setShowLogin(false);
            notify("Signed in as admin");
          }}
          onClose={() => setShowLogin(false)}
        />
      )}
      {editIns && (
        <EditModal ins={editIns} onSave={saveIns} onDelete={deleteIns} onClose={() => setEditIns(null)} />
      )}

      <Header
        theme={theme}
        onToggleTheme={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
        isAdmin={isAdmin}
        onAdd={() => setEditIns({})}
        onAdminClick={() => (isAdmin ? setIsAdmin(false) : setShowLogin(true))}
      />

      <main className="page">
        <div className="layout">
          <div className="layout__side">
            <Sidebar list={sidebarList} activeId={activeId} setActiveId={setActiveId} />
          </div>

          <div className="layout__main">
            <section className="hero">
              <div className="hero__head">
                <h1 className="hero__title">Find repair instructions</h1>
                <p className="hero__sub">Search by device model, then filter by component or symptom</p>
              </div>

              <div className="stats">
                {stats.map(({ icon, val, label }) => (
                  <div key={label} className="stat glass">
                    <i className={`fa-solid ${icon}`}></i>
                    <span className="stat__val">{val}</span>
                    <span className="stat__label">{label}</span>
                  </div>
                ))}
              </div>

              <SearchPanel
                partNum={partNum} setPartNum={setPartNum}
                subcat={subcat} setSubcat={setSubcat}
                symptom={symptom} setSymptom={setSymptom}
                partOptions={partOptions}
                subcatOptions={subcatOptions}
                symptomOptions={symptomOptions}
                hasSearch={hasSearch}
                resultCount={results.length}
                onClear={clearSearch}
              />
            </section>

            {!hasSearch && (
              <InstructionList
                title={`All instructions (${instructions.length})`}
                items={instructions}
                isAdmin={isAdmin}
                onEdit={setEditIns}
                activeId={activeId}
                setActiveId={setActiveId}
              />
            )}

            {hasSearch && results.length > 0 && (
              <InstructionList
                title="Results"
                items={results}
                isAdmin={isAdmin}
                onEdit={setEditIns}
                activeId={activeId}
                setActiveId={setActiveId}
              />
            )}

            {hasSearch && results.length === 0 && (
              <div className="empty">
                <i className="fa-solid fa-magnifying-glass"></i>
                <div className="empty__title">No instructions found</div>
                <div className="empty__text">Try a different model number or broader search terms</div>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
