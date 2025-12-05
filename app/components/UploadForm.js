"use client";

import { useState } from "react";
import { showToast } from "nextjs-toast-notify";

export default function UploadForm() {
  const [loading, setLoading] = useState(false);

  // Manejar el envío del formulario
  async function handleSubmit(e) {
    e.preventDefault();
    const file = e.currentTarget.file.files[0];
    if (!file) {
      showToast.error("Selecciona un archivo");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (res.ok) {
        showToast.success(data.message || "Subida completada");
      } else {
        showToast.error(data.error || "Error en la subida");
      }
    } catch {
      showToast.error("Error de red");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Seleccione la imagen</label>
      <input type="file" name="file" className="w-full rounded border p-2 text-sm" accept="image/*" />
      <button
        type="submit"
        disabled={loading}
        className="inline-flex w-full items-center justify-center rounded bg-gray-700 px-4 py-2 text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60 hover:cursor-pointer"
      >
        {loading ? "Subiendo..." : "Subir imagen"}
      </button>
    </form>
  );
}
