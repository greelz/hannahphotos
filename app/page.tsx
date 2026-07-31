export default function Home() {
  return (
    <main className="flex flex-col min-h-screen items-center justify-center bg-neutral-950 text-white">
      <div className="text-center px-6">
        <h1 className="text-5xl font-light tracking-wide sm:text-7xl">
          Hannah Olson Photography
        </h1>

        <p className="mt-6 text-lg font-light italic text-neutral-300 sm:text-xl">
          where every hour is golden
        </p>
      </div>

      <div className="mt-20 text-lg sm:text-xl text-center flex flex-col gap-3 justify-center">
        <div>Coming soon...</div>
        <div className="flex gap-2">
          <button
            disabled
            className="inline-block rounded-full border border-white/40 px-8 py-3 text-sm uppercase tracking-[0.25em] transition hover:bg-white hover:text-black"
          >
            Galleries
          </button>
          <button
            disabled
            className="inline-block rounded-full border border-white/40 px-8 py-3 text-sm uppercase tracking-[0.25em] transition hover:bg-white hover:text-black"
          >
            Get in touch
          </button>
        </div>
      </div>
    </main>
  );
}
