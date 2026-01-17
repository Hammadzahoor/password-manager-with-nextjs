"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import AppShell from "@/components/AppShell";
import { generatePassword } from "@/lib/password";

type Entry = {
  _id: string;
  name: string;
  username: string;
  password: string;
  url?: string;
  notes?: string;
  status?: string;
  risk?: string;
  updatedAt?: string;
};

const statusStyles: Record<string, string> = {
  Healthy: "border-emerald-500/20 bg-emerald-500/10 text-emerald-300",
  Rotate: "border-amber-500/20 bg-amber-500/10 text-amber-300",
  Locked: "border-rose-500/20 bg-rose-500/10 text-rose-300",
};

export default function VaultEntryDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [entry, setEntry] = useState<Entry | null>(null);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const loadEntry = async () => {
    try {
      const response = await fetch(`/api/entries?id=${id}`);
      const data = await response.json();
      setEntry(data);
    } catch {
      setMessage("Failed to load entry.");
    }
  };

  useEffect(() => {
    if (id) {
      loadEntry();
    }
  }, [id]);

  const copyPassword = async () => {
    if (!entry?.password) {
      return;
    }
    await navigator.clipboard.writeText(entry.password);
    setMessage("Password copied.");
  };

  const copyValue = async (label: string, value?: string) => {
    if (!value) {
      return;
    }
    await navigator.clipboard.writeText(value);
    setMessage(`${label} copied.`);
  };

  const rotatePassword = async () => {
    if (!entry) {
      return;
    }
    const newPassword = generatePassword(20);
    await fetch(`/api/entries?id=${entry._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: newPassword, status: "Rotate" }),
    });
    setMessage("Password rotated.");
    loadEntry();
  };

  const duplicateEntry = async () => {
    if (!entry) {
      return;
    }
    await fetch("/api/entries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: `${entry.name} Copy`,
        username: entry.username,
        password: entry.password,
        url: entry.url,
        notes: entry.notes,
        status: entry.status,
        risk: entry.risk,
      }),
    });
    setMessage("Entry duplicated.");
  };

  return (
    <AppShell
      title={entry?.name || "Entry"}
      subtitle={entry ? `${entry.username} · ${entry.risk || "Low"} risk` : ""}
      actions={
        <div className="flex flex-wrap gap-3">
          <Link
            href="/vault"
            className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/80 transition hover:border-white/40"
          >
            Back to vault
          </Link>
          <button
            onClick={duplicateEntry}
            className="rounded-full bg-emerald-500 px-5 py-2 text-sm font-semibold text-emerald-950 transition hover:bg-emerald-400"
          >
            Duplicate entry
          </button>
        </div>
      }
    >
      <div className="grid gap-6">
        <section className="rounded-3xl border border-white/10 bg-zinc-900/60 p-6">
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Entry overview</p>
              <h2 className="mt-2 text-2xl font-semibold">{entry?.name || "Loading..."}</h2>
              <p className="mt-2 text-sm text-zinc-400">
                Last updated {entry?.updatedAt ? new Date(entry.updatedAt).toLocaleDateString() : "-"}
              </p>
            </div>
            <span
              className={`rounded-full border px-3 py-1 text-xs ${
                statusStyles[entry?.status || "Healthy"]
              }`}
            >
              {entry?.status || "Healthy"}
            </span>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3">
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Username</p>
                <button
                  onClick={() => copyValue("Username", entry?.username)}
                  className="rounded-full border border-white/10 px-2 py-1 text-[10px] text-white/80"
                  aria-label="Copy username"
                >
                  📋
                </button>
              </div>
              <p className="mt-2 text-sm text-white">{entry?.username || "-"}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3">
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">URL</p>
                <button
                  onClick={() => copyValue("URL", entry?.url)}
                  className="rounded-full border border-white/10 px-2 py-1 text-[10px] text-white/80"
                  aria-label="Copy URL"
                >
                  📋
                </button>
              </div>
              <p className="mt-2 text-sm text-white break-all">{entry?.url || "-"}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3">
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Password</p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="rounded-full border border-white/10 px-2 py-1 text-[10px] text-white/80"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? "🙈" : "👁"}
                  </button>
                  <button
                    onClick={copyPassword}
                    className="rounded-full border border-white/10 px-2 py-1 text-[10px] text-white/80"
                    aria-label="Copy password"
                  >
                    📋
                  </button>
                </div>
              </div>
              <p className="mt-2 text-sm text-white">
                {entry?.password ? (showPassword ? entry.password : "••••••••") : "-"}
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-4">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Notes</p>
              <button
                onClick={() => copyValue("Notes", entry?.notes)}
                className="rounded-full border border-white/10 px-2 py-1 text-[10px] text-white/80"
                aria-label="Copy notes"
              >
                📋
              </button>
            </div>
            <p className="mt-2 text-sm text-zinc-300">{entry?.notes || "-"}</p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={copyPassword}
              className="rounded-full bg-emerald-500 px-5 py-2 text-sm font-semibold text-emerald-950"
            >
              Copy password
            </button>
            <button
              onClick={rotatePassword}
              className="rounded-full border border-white/10 px-5 py-2 text-sm text-white/80"
            >
              Rotate now
            </button>
            <Link
              href={`/vault/${id}/edit`}
              className="rounded-full border border-white/10 px-5 py-2 text-sm text-white/80"
            >
              Edit entry
            </Link>
          </div>
          {message ? <p className="mt-3 text-sm text-zinc-400">{message}</p> : null}
        </section>
      </div>
    </AppShell>
  );
}
