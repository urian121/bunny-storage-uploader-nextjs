"use client";

import { useState } from "react";

export default function UploadForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const file = e.currentTarget.file.files[0];
    if (!file) {
      setMessage("Selecciona un archivo");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      setMessage(res.ok ? (data.message || "Subida completada") : (data.error || "Error en la subida"));
    } catch {
      setMessage("Error de red");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      <input type="file" name="file" className="w-full rounded border p-2 text-sm" />
      <button
        type="submit"
        disabled={loading}
        className="inline-flex items-center rounded bg-gray-700 px-4 py-2 text-white hover:bg-gray-800 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Subiendo..." : "Subir archivo"}
      </button>
      {message && <div className="text-sm text-zinc-700 dark:text-zinc-300">{message}</div>}
    </form>
  );
}
