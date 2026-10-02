export default function Header({ theme, onToggleTheme, isAdmin, onAdd, onAdminClick }) {
  return (
    <header className="header">
      <div className="header__inner">
        <div className="brand">
          <div className="brand__logo">
            <i className="fa-solid fa-screwdriver-wrench"></i>
          </div>
          <div>
            <div className="brand__name">RepairDocs</div>
            <div className="brand__sub">Instruction Search</div>
          </div>
        </div>

        <div className="header__actions">
          <button
            className="btn btn-ghost btn-square"
            title={theme === "dark" ? "Light theme" : "Dark theme"}
            aria-label="Toggle theme"
            onClick={onToggleTheme}
          >
            <i className={`fa-solid ${theme === "dark" ? "fa-sun" : "fa-moon"}`}></i>
          </button>

          {isAdmin && (
            <button className="btn btn-primary" onClick={onAdd}>
              <i className="fa-solid fa-plus"></i>Add
            </button>
          )}

          <button className={`btn ${isAdmin ? "btn-danger" : "btn-ghost"}`} onClick={onAdminClick}>
            <i className={`fa-solid ${isAdmin ? "fa-lock-open" : "fa-lock"}`}></i>
            {isAdmin ? "Sign out" : "Admin"}
          </button>
        </div>
      </div>
    </header>
  );
}
