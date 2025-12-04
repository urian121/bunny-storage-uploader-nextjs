import UploadForm from "./components/UploadForm";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="w-full max-w-2xl rounded-xl bg-white p-8 shadow-sm dark:bg-zinc-900">
        <h1 className="text-3xl font-semibold text-zinc-900 dark:text-white text-center">Subir archivos a Bunny Storage</h1>
        <p className="mt-2 text-center text-sm text-zinc-600 dark:text-zinc-300">Carga un archivo y lo subimos a tu Storage Zone. Si configuras tu Pull Zone, podrás abrir la URL pública al terminar.</p>
        <div className="mt-6">
          <UploadForm />
        </div>
      </main>
    </div>
  );
}
