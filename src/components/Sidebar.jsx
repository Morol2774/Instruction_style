import { useState } from "react";
import { createPortal } from "react-dom";
import { catColor } from "../data/categories.js";
import { CatBadge, PartTag, SubTag, SymptomTag } from "./Tags.jsx";

const TOOLTIP_HEIGHT = 290;

export default function Sidebar({ list, activeId, setActiveId }) {
  const [hoverId, setHoverId] = useState(null);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const hoverIns = list.find((i) => i.id === hoverId);

  const open = (ins) => {
    setActiveId(ins.id);
    setTimeout(() => {
      document.getElementById(`card-${ins.id}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 50);
  };

  const showPreview = (e, id) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPos({ top: rect.top, left: rect.right + 10 });
    setHoverId(id);
  };

  return (
    <aside className="sidebar">
      <div className="sidebar__panel glass">
        <div className="sidebar__head">
          <i className="fa-solid fa-list"></i>
          Quick list
          <span className="count">{list.length}</span>
        </div>

        {list.length === 0 && <div className="sidebar__empty">No results</div>}

        {list.map((ins) => (
          <div
            key={ins.id}
            className={`qitem${ins.id === activeId ? " is-active" : ""}`}
            onClick={() => open(ins)}
            onMouseEnter={(e) => showPreview(e, ins.id)}
            onMouseLeave={() => setHoverId(null)}
          >
            <div className="qitem__top">
              <span className="dot" style={{ "--cat": catColor(ins.category) }}></span>
              <span className="qitem__part">{ins.partNumber}</span>
            </div>
            <div className="qitem__title">{ins.title}</div>
            <div className="qitem__sub">{ins.subcategory}</div>
          </div>
        ))}
      </div>

      {/* Hover preview — portal to <body> so it escapes the sidebar's stacking context */}
      {hoverIns &&
        createPortal(
          <div
            className="tooltip"
            style={{ left: pos.left, top: Math.min(pos.top, window.innerHeight - TOOLTIP_HEIGHT) }}
          >
            {hoverIns.photo ? (
              <img className="tooltip__img" src={hoverIns.photo} alt="" />
            ) : (
              <div className="tooltip__ph">
                <i className="fa-solid fa-image"></i>
              </div>
            )}
            <div className="tooltip__body">
              <div className="tags tags--tight">
                <CatBadge cat={hoverIns.category} />
                <PartTag part={hoverIns.partNumber} small />
              </div>
              <div className="tooltip__title">{hoverIns.title}</div>
              <div className="tags tags--tight">
                <SubTag small>{hoverIns.subcategory}</SubTag>
                <SymptomTag small icon={false}>{hoverIns.symptom}</SymptomTag>
              </div>
            </div>
          </div>,
          document.body
        )}
    </aside>
  );
}
