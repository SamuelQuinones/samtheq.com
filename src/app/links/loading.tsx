const NUM_LOADERS = 5;

export default function LinksLoading() {
  return (
    <>
      <section className="mb-4">
        <h1 className="mb-3 text-center text-2xl">Samuel Quinones' Social Links</h1>
        <p className="mb-2 text-center">
          <em className="block">Loading...</em>
        </p>
      </section>
      <ul className="grid grid-cols-1 gap-y-5 py-2">
        {[...Array(NUM_LOADERS)].map((_, i) => (
          <li key={i}>
            <span
              className="btn btn-primary pointer-events-none flex animate-pulse cursor-wait items-center justify-center gap-x-2 rounded-lg border-2 p-2"
              style={{ animationDelay: `${i * 0.05}s`, animationDuration: "1s" }}
            >
              <span className="inline-block h-6 min-h-[1em] w-6 rounded-full bg-current align-middle opacity-50" />
              <span className="inline-block h-6 min-h-[1em] w-44 rounded-full bg-current align-middle opacity-50" />
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}
