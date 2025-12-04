import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const fd = await req.formData();
    const file = fd.get("file");
    if (!file) return NextResponse.json({ error: "No se envió ningún archivo" }, { status: 400 });

    const accessKey = process.env.BUNNY_ACCESS_KEY;
    const zone = process.env.BUNNY_STORAGE_ZONE;
    if (!accessKey || !zone) return NextResponse.json({ error: "Configura BUNNY_ACCESS_KEY y BUNNY_STORAGE_ZONE" }, { status: 500 });

    const filename = file.name;
    const buffer = Buffer.from(await file.arrayBuffer());
    const url = `https://${process.env.BUNNY_STORAGE_HOST || "storage.bunnycdn.com"}/${zone}/${filename}`;

    const res = await fetch(url, {
      method: "PUT",
      headers: { AccessKey: accessKey, "Content-Type": "application/octet-stream" },
      body: buffer,
    });
    if (!res.ok) return NextResponse.json({ error: await res.text() || "Error subiendo a Bunny" }, { status: 500 });

    return NextResponse.json({ message: "Archivo subido correctamente", path: `/${zone}/${filename}` });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
