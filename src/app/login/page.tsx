import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-12 px-6 py-12">
        <header className="flex items-center justify-between">
          <Link href="/" className="text-sm text-zinc-400 hover:text-white">
            ← Back to overview
          </Link>
          <Link href="/vault" className="text-sm text-zinc-300 hover:text-white">
            Go to vault
          </Link>
        </header>

        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-white/10 bg-zinc-900/60 p-8">
            <p className="text-xs uppercase tracking-[0.2em] text-emerald-300">Welcome back</p>
            <h1 className="mt-4 text-3xl font-semibold">Sign in to Vaultify</h1>
            <p className="mt-3 text-sm text-zinc-400">
              Access your vault, monitor security alerts, and manage team access.
            </p>

            <form className="mt-8 grid gap-4">
              <label className="grid gap-2 text-sm text-zinc-300">
                Work email
                <input
                  type="email"
                  placeholder="you@company.com"
                  className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-zinc-500"
                />
              </label>
              <label className="grid gap-2 text-sm text-zinc-300">
                Master password
                <input
                  type="password"
                  placeholder="••••••••"
                  className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-zinc-500"
                />
              </label>
              <button className="mt-2 rounded-2xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-emerald-950 transition hover:bg-emerald-400">
                Continue
              </button>
              <div className="flex items-center justify-between text-xs text-zinc-400">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="h-4 w-4 rounded border-white/20" />
                  Remember this device
                </label>
                <button className="text-emerald-300 hover:text-emerald-200">Forgot password?</button>
              </div>
            </form>
          </div>

          <aside className="flex flex-col gap-6">
            <div className="rounded-3xl border border-white/10 bg-zinc-900/60 p-6">
              <h2 className="text-lg font-semibold">Why Vaultify?</h2>
              <ul className="mt-4 space-y-3 text-sm text-zinc-300">
                <li>• Encrypted vault in every session</li>
                <li>• Real-time password health checks</li>
                <li>• Share credentials with role-based access</li>
              </ul>
            </div>

            <div className="rounded-3xl border border-emerald-500/20 bg-emerald-500/10 p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-200">New to Vaultify?</p>
              <h3 className="mt-3 text-lg font-semibold text-white">Create an account</h3>
              <p className="mt-2 text-sm text-emerald-100/80">
                Start with a secure personal vault and invite your team later.
              </p>
              <button className="mt-5 w-full rounded-2xl bg-emerald-400 px-4 py-2 text-sm font-semibold text-emerald-950">
                Sign up
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
