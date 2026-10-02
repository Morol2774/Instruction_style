import { useState } from "react";
import { CATEGORIES, SUBCATEGORIES, JOB_TYPES, ACTIONS } from "../data/categories.js";
import { genId, today } from "../lib/utils.js";

const BLANK = {
  id: "",
  category: "Mobile Computers",
  partNumber: "",
  subcategory: "",
  symptom: "",
  title: "",
  jobTypes: [{ jobType: "", action: "" }],
  faultCodes: [{ system: "Siebel", code: "" }],
  notes: "",
  photo: "",
  updatedAt: "",
};

const REQUIRED = ["partNumber", "subcategory", "symptom", "title"];

function Label({ children }) {
  return <div className="label">{children}</div>;
}

function FieldError({ show }) {
  return show ? <div className="field-error">Required</div> : null;
}

export default function EditModal({ ins, onSave, onDelete, onClose }) {
  const isNew = !ins.id;
  const [form, setForm] = useState(
    isNew
      ? BLANK
      : {
          ...ins,
          jobTypes: ins.jobTypes || [{ jobType: "", action: "" }],
          faultCodes: ins.faultCodes || [{ system: "", code: "" }],
        }
  );
  const [err, setErr] = useState({});

  const set = (field, value) => setForm((p) => ({ ...p, [field]: value }));

  // Generic helpers for the two repeating-row lists
  const setRow = (list, i, field, value) =>
    setForm((p) => ({ ...p, [list]: p[list].map((r, j) => (j === i ? { ...r, [field]: value } : r)) }));
  const addRow = (list, row) => setForm((p) => ({ ...p, [list]: [...p[list], row] }));
  const delRow = (list, i) => setForm((p) => ({ ...p, [list]: p[list].filter((_, j) => j !== i) }));

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => set("photo", ev.target.result);
    reader.readAsDataURL(file);
  };

  const validate = () => {
    const e = {};
    REQUIRED.forEach((f) => {
      if (!form[f].trim()) e[f] = true;
    });
    setErr(e);
    return Object.keys(e).length === 0;
  };

  const save = () => {
    if (!validate()) return;
    onSave({
      ...form,
      jobTypes: form.jobTypes.filter((r) => r.jobType.trim()),
      faultCodes: form.faultCodes.filter((r) => r.code.trim()),
      id: form.id || genId(),
      updatedAt: today(),
    });
  };

  const inputCls = (field) => `input${err[field] ? " is-error" : ""}`;

  return (
    <div className="overlay">
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="edit-title">
        <div className="modal__head">
          <div className="modal__title" id="edit-title">
            <i className={`fa-solid ${isNew ? "fa-plus" : "fa-pen"}`}></i>
            {isNew ? "New Instruction" : "Edit Instruction"}
          </div>
          <button className="icon-btn icon-btn--lg" onClick={onClose} aria-label="Close">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="modal__body">
          {/* Category + Part number */}
          <div className="grid-2">
            <div>
              <Label>Category *</Label>
              <select className="input" value={form.category} onChange={(e) => set("category", e.target.value)}>
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <Label>Part Number *</Label>
              <input
                className={inputCls("partNumber")}
                value={form.partNumber}
                onChange={(e) => set("partNumber", e.target.value.toUpperCase())}
                placeholder="e.g. TC210"
              />
              <FieldError show={err.partNumber} />
            </div>
          </div>

          {/* Subcategory + Symptom */}
          <div className="grid-2">
            <div>
              <Label>Subcategory *</Label>
              <input
                list="subs-list"
                className={inputCls("subcategory")}
                value={form.subcategory}
                onChange={(e) => set("subcategory", e.target.value)}
                placeholder="e.g. Screen"
              />
              <datalist id="subs-list">
                {SUBCATEGORIES.map((s) => <option key={s} value={s} />)}
              </datalist>
              <FieldError show={err.subcategory} />
            </div>
            <div>
              <Label>Symptom *</Label>
              <input
                className={inputCls("symptom")}
                value={form.symptom}
                onChange={(e) => set("symptom", e.target.value)}
                placeholder="e.g. Broken screen"
              />
              <FieldError show={err.symptom} />
            </div>
          </div>

          {/* Title */}
          <div>
            <Label>Instruction Title *</Label>
            <input
              className={inputCls("title")}
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              placeholder="e.g. TC210 Screen Replacement Procedure"
            />
            <FieldError show={err.title} />
          </div>

          {/* Job types */}
          <div>
            <Label>Job Type · Required Action</Label>
            <div className="rows">
              <div className="rows__head">
                <div className="rows__label">Job Type</div>
                <div className="rows__label">Required Action</div>
                <div />
              </div>
              {form.jobTypes.map((row, i) => (
                <div key={i} className="row">
                  <input
                    list="jobtypes-list"
                    className="input"
                    value={row.jobType}
                    onChange={(e) => setRow("jobTypes", i, "jobType", e.target.value)}
                    placeholder="e.g. Billable (Fixed Price Repair)"
                  />
                  <input
                    list="actions-list"
                    className="input"
                    value={row.action}
                    onChange={(e) => setRow("jobTypes", i, "action", e.target.value)}
                    placeholder="e.g. Replace"
                  />
                  <button
                    className="row-del"
                    aria-label="Remove row"
                    onClick={() => delRow("jobTypes", i)}
                    disabled={form.jobTypes.length === 1}
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                </div>
              ))}
              <datalist id="jobtypes-list">
                {JOB_TYPES.map((v) => <option key={v} value={v} />)}
              </datalist>
              <datalist id="actions-list">
                {ACTIONS.map((v) => <option key={v} value={v} />)}
              </datalist>
              <button className="btn btn-ghost btn-sm self-start" onClick={() => addRow("jobTypes", { jobType: "", action: "" })}>
                <i className="fa-solid fa-plus"></i>Add row
              </button>
            </div>
          </div>

          {/* Fault codes */}
          <div>
            <Label>System · Fault Code</Label>
            <div className="rows rows--codes">
              <div className="rows__head">
                <div className="rows__label">System</div>
                <div className="rows__label">Fault Code</div>
                <div />
              </div>
              {form.faultCodes.map((row, i) => (
                <div key={i} className="row">
                  <input
                    className="input"
                    value={row.system}
                    onChange={(e) => setRow("faultCodes", i, "system", e.target.value)}
                    placeholder="e.g. Siebel"
                  />
                  <input
                    className="input input--mono"
                    value={row.code}
                    onChange={(e) => setRow("faultCodes", i, "code", e.target.value.toUpperCase())}
                    placeholder="e.g. HOUSING-KNOBS/BUTTONS/SWITCHES"
                  />
                  <button
                    className="row-del"
                    aria-label="Remove row"
                    onClick={() => delRow("faultCodes", i)}
                    disabled={form.faultCodes.length === 1}
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                </div>
              ))}
              <button className="btn btn-ghost btn-sm self-start" onClick={() => addRow("faultCodes", { system: "Siebel", code: "" })}>
                <i className="fa-solid fa-plus"></i>Add row
              </button>
            </div>
          </div>

          {/* Photo */}
          <div>
            <Label>Photo (optional)</Label>
            <div className="upload">
              {form.photo ? (
                <div className="upload__preview">
                  <img className="upload__img" src={form.photo} alt="Preview" />
                  <button className="upload__remove" onClick={() => set("photo", "")} aria-label="Remove photo">
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                </div>
              ) : (
                <div className="upload__empty">
                  <i className="fa-solid fa-image"></i>
                </div>
              )}
              <div className="upload__main">
                <label className="btn btn-ghost btn-sm">
                  <i className="fa-solid fa-upload"></i>
                  {form.photo ? "Change photo" : "Upload photo"}
                  <input type="file" accept="image/*" onChange={handlePhoto} />
                </label>
                <div className="upload__hint">
                  JPG, PNG, or WebP.<br />Photo will be saved in the browser.
                </div>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <Label>Notes / Tips (optional)</Label>
            <textarea
              className="input"
              value={form.notes}
              onChange={(e) => set("notes", e.target.value)}
              placeholder="Any important notes, part numbers, warnings..."
            />
          </div>

          {/* Actions */}
          <div className="modal__actions">
            <div className="btn-group">
              <button className="btn btn-primary" onClick={save}>
                <i className="fa-solid fa-check"></i>Save
              </button>
              <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
            </div>
            {!isNew && (
              <button className="btn btn-danger" onClick={() => onDelete(ins.id)}>
                <i className="fa-solid fa-trash"></i>Delete
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
