"use client";

import { useState } from "react";
import { showToast } from "nextjs-toast-notify";

export default function UploadForm() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const file = e.currentTarget.file.files[0];
    if (!file) {
      showToast.error("¡Selecciona un archivo!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) {
        showToast.error(data.error || "Error en la subida");
        return;
      }
      showToast.success("El archivo se ha subido correctamente");
    } catch {
      showToast.error("Error de red");
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
    </form>
  );
}
