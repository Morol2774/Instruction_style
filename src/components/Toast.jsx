export default function Toast({ toast }) {
  if (!toast) return null;
  return (
    <div className={`toast ${toast.ok ? "toast--ok" : "toast--err"}`} role="status">
      <i className={`fa-solid ${toast.ok ? "fa-circle-check" : "fa-circle-xmark"}`}></i>
      {toast.msg}
    </div>
  );
}
