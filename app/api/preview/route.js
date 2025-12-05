import { NextResponse } from "next/server";

// Endpoint para previsualizar archivos en la Pull Zone
export async function GET(req) {
  try {
    const url = new URL(req.url);
    const name = url.searchParams.get("name");
    if (!name) return NextResponse.json({ error: "Falta nombre de archivo" }, { status: 400 });

    const accessKey = process.env.BUNNY_ACCESS_KEY;
    const zone = process.env.BUNNY_STORAGE_ZONE;
    const host = process.env.BUNNY_STORAGE_HOST || "storage.bunnycdn.com";
    if (!accessKey || !zone) return NextResponse.json({ error: "Configura BUNNY_ACCESS_KEY y BUNNY_STORAGE_ZONE" }, { status: 500 });

    const storageUrl = `https://${host}/${zone}/${encodeURIComponent(name)}`;
    const res = await fetch(storageUrl, { headers: { AccessKey: accessKey } });
    if (!res.ok) return NextResponse.json({ error: await res.text() || "Error obteniendo archivo" }, { status: res.status });

    const contentType = res.headers.get("content-type") || "application/octet-stream";
    const contentLength = res.headers.get("content-length") || undefined;
    const body = await res.arrayBuffer();
    return new Response(body, {
      headers: {
        "Content-Type": contentType,
        ...(contentLength ? { "Content-Length": contentLength } : {}),
        "Cache-Control": "public, max-age=300", // cache 5 minutos
      },
    });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
