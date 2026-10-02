import { useEffect, useState } from "react";
import { formatDate } from "../lib/utils.js";
import { CatBadge, PartTag, SubTag, SymptomTag } from "./Tags.jsx";

export default function InstructionCard({ ins, isAdmin, onEdit, activeId, setActiveId }) {
  const [expanded, setExpanded] = useState(false);

  // Opened from the sidebar quick list
  useEffect(() => {
    if (activeId === ins.id) setExpanded(true);
  }, [activeId, ins.id]);

  const toggle = () => {
    setExpanded((p) => !p);
    setActiveId?.(null);
  };

  return (
    <div className={`icard glass${expanded ? " is-open" : ""}`}>
      <div className="icard__head" onClick={toggle}>
        <div className="icard__info">
          <div className="tags">
            <CatBadge cat={ins.category} />
            <PartTag part={ins.partNumber} />
            <SubTag>{ins.subcategory}</SubTag>
            <SymptomTag>{ins.symptom}</SymptomTag>
          </div>
          <div className="icard__title">{ins.title}</div>
          <div className="icard__meta">
            {ins.id} · Updated {formatDate(ins.updatedAt)}
          </div>
        </div>

        <div className="icard__side">
          {isAdmin && (
            <button
              className="btn btn-ghost btn-sm"
              aria-label="Edit instruction"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(ins);
              }}
            >
              <i className="fa-solid fa-pen"></i>
            </button>
          )}
          <i className={`fa-solid fa-chevron-${expanded ? "up" : "down"} icard__chevron`}></i>
        </div>
      </div>

      {expanded && (
        <div className="icard__body">
          <div className="icard__grid">
            {/* Left: photo + notes */}
            <div>
              <div className="section-label">
                <i className="fa-solid fa-image"></i>Photo
              </div>
              {ins.photo ? (
                <div className="photo">
                  <img src={ins.photo} alt={ins.title} />
                </div>
              ) : (
                <div className="photo photo--empty">
                  <i className="fa-solid fa-image"></i>
                  <span>No photo</span>
                </div>
              )}

              {ins.notes && (
                <div className="note">
                  <div className="note__title">
                    <i className="fa-solid fa-lightbulb"></i>Notes
                  </div>
                  <div className="note__text">{ins.notes}</div>
                </div>
              )}
            </div>

            {/* Right: tables */}
            <div className="icard__col">
              {ins.jobTypes?.length > 0 && (
                <div>
                  <div className="section-label">
                    <i className="fa-solid fa-briefcase"></i>Job Type · Required Action
                  </div>
                  <table className="dtable">
                    <thead>
                      <tr>
                        <th className="col-60">Job Type</th>
                        <th>Required Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ins.jobTypes.map((row, i) => (
                        <tr key={i}>
                          <td>{row.jobType}</td>
                          <td className={`td-action${row.action.includes("quote") ? " is-quote" : ""}`}>
                            {row.action}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {ins.faultCodes?.length > 0 && (
                <div>
                  <div className="section-label">
                    <i className="fa-solid fa-code"></i>System · Fault Code
                  </div>
                  <table className="dtable">
                    <thead>
                      <tr>
                        <th className="col-35">System</th>
                        <th>Fault Code</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ins.faultCodes.map((row, i) => (
                        <tr key={i}>
                          <td>{row.system}</td>
                          <td className="td-code">{row.code}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
