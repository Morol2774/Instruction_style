import { useState } from "react";
import { ADMIN_PASS } from "../config.js";

export default function LoginModal({ onLogin, onClose }) {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState(false);

  const submit = () => {
    if (pw === ADMIN_PASS) {
      onLogin();
    } else {
      setErr(true);
      setPw("");
      setTimeout(() => setErr(false), 1500);
    }
  };

  return (
    <div className="overlay overlay--top">
      <div className="modal modal--sm" role="dialog" aria-modal="true" aria-labelledby="login-title">
        <div className="modal__title" id="login-title">
          <i className="fa-solid fa-lock"></i>Admin login
        </div>
        <p className="modal__text">Enter password to add or edit instructions.</p>

        <input
          className={`input${err ? " is-error" : ""}`}
          type="password"
          value={pw}
          placeholder="Password"
          autoFocus
          onChange={(e) => setPw(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
        />
        {err && (
          <div className="login-error">
            <i className="fa-solid fa-xmark"></i>Incorrect password
          </div>
        )}

        <div className="modal__actions modal__actions--start">
          <button className="btn btn-primary" onClick={submit}>Sign in</button>
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
