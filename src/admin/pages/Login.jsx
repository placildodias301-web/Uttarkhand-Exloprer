import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Mountain, Lock, Mail, AlertCircle } from "lucide-react";
import { login, useAdminSession, DEMO_CREDENTIALS } from "../../services/adminAuth";
import { useSiteSettings } from "../../services/siteSettings";

export default function Login() {
  const { loggedIn } = useAdminSession();
  const { settings } = useSiteSettings();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (loggedIn) return <Navigate to="/admin/dashboard" replace />;

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const result = await login(email, password);
    setLoading(false);
    if (result.ok) {
      navigate("/admin/dashboard");
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="min-h-screen bg-ink-950 flex items-center justify-center px-5">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <Mountain size={30} className="text-moss-400 mb-3" />
          <h1 className="font-display text-2xl text-mist-100">{settings.general.siteName}</h1>
          <p className="text-mist-400 font-body text-sm mt-1">Admin Login</p>
        </div>

        <form onSubmit={onSubmit} className="rounded-2xl border border-white/5 bg-ink-850 p-6 space-y-4">
          {error && (
            <div className="flex items-center gap-2 text-rose-300 bg-rose-500/10 border border-rose-500/20 rounded-lg px-3 py-2.5 text-xs font-body">
              <AlertCircle size={14} className="shrink-0" /> {error}
            </div>
          )}

          <div>
            <label className="block text-mist-300 font-body text-sm mb-1.5">Email</label>
            <div className="flex items-center gap-2 rounded-lg bg-ink-800 border border-white/10 px-3 py-2.5 focus-within:border-moss-500/50">
              <Mail size={15} className="text-mist-400 shrink-0" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className="w-full bg-transparent outline-none text-sm font-body text-mist-100 placeholder:text-mist-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-mist-300 font-body text-sm mb-1.5">Password</label>
            <div className="flex items-center gap-2 rounded-lg bg-ink-800 border border-white/10 px-3 py-2.5 focus-within:border-moss-500/50">
              <Lock size={15} className="text-mist-400 shrink-0" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-transparent outline-none text-sm font-body text-mist-100 placeholder:text-mist-400"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-moss-500 text-ink-950 font-body font-semibold py-2.5 text-sm hover:bg-moss-400 transition-colors disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>

        <p className="text-mist-400 text-xs font-body text-center mt-5">
          Demo credentials — {DEMO_CREDENTIALS.email} / {DEMO_CREDENTIALS.password}
        </p>
      </div>
    </div>
  );
}
