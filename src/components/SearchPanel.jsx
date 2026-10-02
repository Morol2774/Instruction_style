import AutoInput from "./AutoInput.jsx";

function StepLabel({ n, primary, children }) {
  return (
    <div className={`step__label${primary ? " step__label--primary" : ""}`}>
      <span className="step__num">{n}</span>
      {children}
    </div>
  );
}

export default function SearchPanel({
  partNum, setPartNum, subcat, setSubcat, symptom, setSymptom,
  partOptions, subcatOptions, symptomOptions,
  hasSearch, resultCount, onClear,
}) {
  return (
    <div className="search glass">
      <div className="step">
        <StepLabel n={1} primary>Device Model / Part Number</StepLabel>
        <AutoInput
          value={partNum}
          onChange={(v) => {
            setPartNum(v);
            setSubcat("");
            setSymptom("");
          }}
          suggestions={partOptions}
          placeholder="Type or select model (e.g. TC210, ZQ630, DS9900)"
          icon="fa-barcode"
        />
      </div>

      <div className="grid-2">
        <div>
          <StepLabel n={2}>Component (optional)</StepLabel>
          <AutoInput
            value={subcat}
            onChange={setSubcat}
            suggestions={subcatOptions}
            placeholder="e.g. Screen, Camera, Button"
            icon="fa-puzzle-piece"
          />
        </div>
        <div>
          <StepLabel n={3}>Symptom (optional)</StepLabel>
          <AutoInput
            value={symptom}
            onChange={setSymptom}
            suggestions={symptomOptions}
            placeholder="e.g. Broken screen, not scanning"
            icon="fa-triangle-exclamation"
          />
        </div>
      </div>

      {hasSearch && (
        <div className="search__summary">
          <span className="search__count">
            {resultCount === 0
              ? "No instructions found"
              : `${resultCount} instruction${resultCount !== 1 ? "s" : ""} found`}
          </span>
          <button className="btn btn-ghost btn-sm" onClick={onClear}>
            <i className="fa-solid fa-xmark"></i>Clear all
          </button>
        </div>
      )}
    </div>
  );
}
