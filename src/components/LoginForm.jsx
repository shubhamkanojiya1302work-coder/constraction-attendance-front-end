import { useState } from "react";

import {
  UserCog,
  Contact,
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";

function LoginForm() {
  // Store login form values
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  // Store checkbox value
  const [rememberMe, setRememberMe] = useState(false);

  // Control password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Handle form submission
  function handleSubmit(event) {
    event.preventDefault();

    console.log({
      identifier,
      password,
      rememberMe,
    });
  }

  return (
    <div className="w-full max-w-sm bg-white rounded-xl shadow-xl p-6 sm:p-7">
      {/* Logo */}
      <div className="flex flex-col items-center mb-6">
        <div className="w-12 h-12 bg-[#965000] rounded-xl flex items-center justify-center text-white shadow-md">
          <UserCog size={25} />
        </div>

        <h1 className="text-2xl font-bold text-slate-900 mt-3">FieldSite</h1>

        <p className="text-sm text-slate-600 mt-1">Sign in to your account</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Phone / Email */}
        <div>
          <label className="block text-xs font-medium text-slate-800 mb-2">
            Phone
          </label>

          <div className="relative">
            <Contact
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#965000]"
            />

            <input
              type="text"
              value={identifier}
              onChange={(event) => setIdentifier(event.target.value)}
              placeholder="e.g. +1 (555) 019-2831 or worker@site.com"
              autoComplete="username"
              required
              className="w-full h-11 border border-[#e5c4ac] rounded-md pl-10 pr-3 text-sm outline-none focus:border-[#965000] focus:ring-2 focus:ring-[#965000]/10"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="block text-xs font-medium text-slate-800 mb-2">
            PIN or Password
          </label>

          <div className="relative">
            <LockKeyhole
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#965000]"
            />

            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your 4-digit PIN or password"
              autoComplete="current-password"
              required
              className="w-full h-11 border border-[#e5c4ac] rounded-md pl-10 pr-11 text-sm outline-none focus:border-[#965000] focus:ring-2 focus:ring-[#965000]/10"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Remember me and Forgot details */}
        <div className="flex items-center justify-between gap-2">
          <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(event) => setRememberMe(event.target.checked)}
              className="w-4 h-4 accent-[#965000]"
            />
            Remember me
          </label>

          <button
            type="button"
            className="text-xs font-medium text-[#965000] hover:underline"
          >
            Forgot details?
          </button>
        </div>

        {/* Sign in button */}
        <button
          type="submit"
          className="w-full h-11 bg-[#965000] hover:bg-[#794000] text-white font-semibold text-sm rounded-md shadow-md flex items-center justify-center gap-2 transition-colors"
        >
          Sign In
          <ArrowRight size={17} />
        </button>
      </form>

      {/* Footer */}
      <div className="text-center mt-9 text-xs text-slate-600 space-y-1">
        <p>Protected by FieldSite</p>

        <p>
          Need help?{" "}
          <span className="font-medium text-slate-900">
            Contact your site administrator
          </span>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
