"use client";

import { useEffect, useState } from "react";

export default function BackendStatus() {
  const [status, setStatus] = useState("Checking...");

  useEffect(() => {
    const check = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/health");
        if (!response.ok) {
          throw new Error("Bad response");
        }
        const data = await response.json();
        setStatus(data.status === "ok" ? "Connected" : "Unknown");
      } catch {
        setStatus("Offline");
      }
    };

    check();
  }, []);

  return (
    <div className="rounded-3xl border border-white/10 bg-zinc-900/60 p-6">
      <h3 className="text-lg font-semibold">Backend status</h3>
      <p className="mt-2 text-sm text-zinc-400">
        Express + MongoDB server connection.
      </p>
      <div className="mt-4 text-sm text-white">{status}</div>
    </div>
  );
}
