import { catColor } from "../data/categories.js";

export function CatBadge({ cat, small = false }) {
  return (
    <span className={`tag tag-cat${small ? " tag--sm" : ""}`} style={{ "--cat": catColor(cat) }}>
      {cat}
    </span>
  );
}

export function PartTag({ part, small = false }) {
  return <span className={`tag tag-part${small ? " tag--sm" : ""}`}>{part}</span>;
}

export function SubTag({ children, small = false }) {
  return <span className={`tag tag-sub${small ? " tag--sm" : ""}`}>{children}</span>;
}

export function SymptomTag({ children, small = false, icon = true }) {
  return (
    <span className={`tag tag-sym${small ? " tag--sm" : ""}`}>
      {icon && <i className="fa-solid fa-triangle-exclamation"></i>}
      {children}
    </span>
  );
}
