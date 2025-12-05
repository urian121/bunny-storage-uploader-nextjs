import UploadForm from "./components/UploadForm";
import FilesList from "./components/FilesList";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="w-full max-w-5xl rounded-xl bg-white p-8 shadow-sm dark:bg-zinc-900">
        <h1 className="text-3xl font-semibold text-zinc-900 dark:text-white text-center">Subir imagen con Next.js</h1>
        <hr className="my-4 border-zinc-200 dark:border-zinc-800" />
        <div className="grid grid-cols-1 md:grid-cols-2 md:divide-x md:divide-zinc-200 dark:md:divide-zinc-800">
          <section className="md:pr-6">
            <UploadForm />
          </section>
          <section className="md:pl-6">
            <FilesList />
          </section>
        </div>
      </main>
    </div>
  );
}
