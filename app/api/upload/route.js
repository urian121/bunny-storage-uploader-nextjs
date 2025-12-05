import { NextResponse } from "next/server";

// Endpoint para subir archivos a Bunny Storage
export async function POST(req) {
  try {
    const fd = await req.formData();
    const file = fd.get("file");
    if (!file) return NextResponse.json({ error: "No se envió ningún archivo" }, { status: 400 });

    const accessKey = process.env.BUNNY_ACCESS_KEY;
    const zone = process.env.BUNNY_STORAGE_ZONE;
    if (!accessKey || !zone) return NextResponse.json({ error: "Configura BUNNY_ACCESS_KEY y BUNNY_STORAGE_ZONE" }, { status: 500 });

    const original = file.name || "file";
    const ext = original.includes(".") ? "." + original.split(".").pop().toLowerCase() : "";
    const filename = `${Date.now()}-${(globalThis.crypto?.randomUUID?.() || Math.random().toString(36).slice(2))}${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());
    const url = `https://${process.env.BUNNY_STORAGE_HOST || "storage.bunnycdn.com"}/${zone}/${filename}`;

    const res = await fetch(url, {
      method: "PUT",
      headers: { AccessKey: accessKey, "Content-Type": "application/octet-stream" },
      body: buffer,
    });
    if (!res.ok) return NextResponse.json({ error: await res.text() || "Error subiendo a Bunny" }, { status: 500 });

    return NextResponse.json({ message: "Archivo subido correctamente", name: filename, path: `/${zone}/${filename}` });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// Endpoint para listar archivos en la Pull Zone
export async function GET() {
  try {
    const accessKey = process.env.BUNNY_ACCESS_KEY;
    const zone = process.env.BUNNY_STORAGE_ZONE;
    const host = process.env.BUNNY_STORAGE_HOST || "storage.bunnycdn.com";
    if (!accessKey || !zone) return NextResponse.json({ error: "Configura BUNNY_ACCESS_KEY y BUNNY_STORAGE_ZONE" }, { status: 500 });

    const url = `https://${host}/${zone}/`;
    const res = await fetch(url, { headers: { AccessKey: accessKey } });
    if (!res.ok) return NextResponse.json({ error: await res.text() || "Error listando archivos" }, { status: res.status });

    const items = await res.json();
    return NextResponse.json({ files: items });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
