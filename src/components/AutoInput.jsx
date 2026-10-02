import { useEffect, useRef, useState } from "react";

export default function AutoInput({ value, onChange, suggestions, placeholder, icon }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState(value || "");
  const ref = useRef(null);

  useEffect(() => setQ(value || ""), [value]);

  // Close when clicking outside
  useEffect(() => {
    const onDown = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const filtered = q.length === 0
    ? suggestions
    : suggestions.filter((s) => s.toLowerCase().includes(q.toLowerCase()));

  const pick = (v) => {
    setQ(v);
    onChange(v);
    setOpen(false);
  };

  const clear = () => {
    setQ("");
    onChange("");
    setOpen(false);
  };

  return (
    <div ref={ref} className="autoinput">
      <div className="autoinput__field">
        {icon && <i className={`fa-solid ${icon} autoinput__icon`}></i>}
        <input
          className={`input${icon ? " has-icon" : ""}`}
          value={q}
          placeholder={placeholder}
          onChange={(e) => {
            setQ(e.target.value);
            onChange(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
        />
        {q && (
          <button className="icon-btn autoinput__clear" onClick={clear} aria-label="Clear">
            <i className="fa-solid fa-xmark"></i>
          </button>
        )}
      </div>

      {open && filtered.length > 0 && (
        <div className="autoinput__menu" role="listbox">
          {filtered.slice(0, 10).map((s) => (
            <div key={s} className="autoinput__item" role="option" onClick={() => pick(s)}>
              {s}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
