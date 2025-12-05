"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

// Componente para listar archivos en la Pull Zone
export default function FilesList() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/upload");
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Error listando archivos");
        setFiles(Array.isArray(data.files) ? data.files : []);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div className="text-sm text-zinc-600 dark:text-zinc-300">Cargando...</div>;
  if (error) return <div className="text-sm text-red-600">{error}</div>;

  if (!files.length) return <div className="text-sm text-zinc-600 dark:text-zinc-300">Sin archivos</div>;

  const base = process.env.NEXT_PUBLIC_BUNNY_PUBLIC_BASE_URL || "";

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
      {files.filter((f) => !f.IsDirectory).map((item, idx) => {
        const name = item.ObjectName || item.Name || item.Key || item.Path || `archivo-${idx}`;
        const path = (item.Path || "").replace(/^\/+/, "");
        const zone = process.env.NEXT_PUBLIC_BUNNY_STORAGE_ZONE || "";
        let rel = path;
        if (rel) {
          rel = zone ? rel.replace(new RegExp(`^${zone}/?`), "") : rel.replace(/^[^/]+\/?/, "");
          rel = rel.replace(/^\/+/, "");
        }
        const publicPath = rel ? `${rel}/${name}` : name;
        const href = base ? `${base.replace(/\/$/, "")}/${publicPath}` : `/api/preview?name=${encodeURIComponent(publicPath)}`;
        return (
          <a
            key={idx}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group overflow-hidden rounded-lg border border-zinc-200 bg-white p-2 shadow-sm hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
          >
            <div className="relative h-40 w-full overflow-hidden rounded-md bg-zinc-100 dark:bg-zinc-800">
              <Image
                src={href}
                alt={name}
                fill
                sizes="(min-width: 768px) 33vw, 50vw"
                className="object-cover transition-opacity group-hover:opacity-95"
                unoptimized={!!base}
                priority={idx < 6}
              />
            </div>
            <div className="mt-2 truncate text-xs text-zinc-600 dark:text-zinc-300">{name}</div>
          </a>
        );
      })}
    </div>
  );
}
