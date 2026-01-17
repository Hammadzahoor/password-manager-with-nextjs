import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 py-12">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-300">
              PM
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-zinc-400">
                Password Manager
              </p>
              <h1 className="text-xl font-semibold">Vaultify</h1>
            </div>
          </div>
          <nav className="hidden items-center gap-8 text-sm text-zinc-300 md:flex">
            <span className="text-white">Overview</span>
            <Link href="/vault" className="transition hover:text-white">
              Vault
            </Link>
            <Link href="/settings" className="transition hover:text-white">
              Security
            </Link>
            <span>Pricing</span>
          </nav>
          <Link
            href="/login"
            className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/90 transition hover:border-white/40"
          >
            Sign in
          </Link>
        </header>

        <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900 via-zinc-900 to-emerald-950/40 p-10">
          <div className="flex flex-col gap-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">
              Product overview
            </p>
            <h2 className="text-4xl font-semibold leading-tight md:text-5xl">
              Store every credential in one calm, encrypted workspace.
            </h2>
            <p className="text-base text-zinc-300 md:text-lg">
              Organize logins, secure notes, and shared access with a clean vault UI built
              in Next.js and connected to MongoDB.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/vault"
                className="rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-emerald-950 transition hover:bg-emerald-400"
              >
                Open vault
              </Link>
              <Link
                href="/vault"
                className="rounded-full border border-white/10 px-6 py-3 text-sm font-semibold text-white/90 transition hover:border-white/40"
              >
                View entries
              </Link>
            </div>
            <div className="flex flex-wrap gap-4 text-xs text-zinc-400">
              <span className="rounded-full border border-white/10 px-3 py-1">Zero-knowledge UI</span>
              <span className="rounded-full border border-white/10 px-3 py-1">Role-based sharing</span>
              <span className="rounded-full border border-white/10 px-3 py-1">Instant search</span>
            </div>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Smart folders",
              description: "Group credentials by project, team, or risk level in a single click.",
            },
            {
              title: "Audit-ready",
              description: "Track last access, rotation status, and ownership across entries.",
            },
            {
              title: "Secure share",
              description: "Invite teammates without exposing raw passwords or recovery keys.",
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-white/10 bg-zinc-900/60 p-6"
            >
              <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
              <p className="mt-3 text-sm text-zinc-400">{feature.description}</p>
            </div>
          ))}
        </section>


        <footer className="flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 text-sm text-zinc-500 md:flex-row">
          <p>Vaultify Password Manager — Next.js + MongoDB.</p>
          <p>Manage entries securely with live CRUD.</p>
        </footer>
      </div>
    </div>
  );
}
