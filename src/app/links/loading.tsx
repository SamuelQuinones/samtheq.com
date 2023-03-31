import Button from "@/components/Button";
import LinkHeader from "./Header";

const NUM_LOADERS = 5;

export default function LinksLoading() {
  return (
    <main id="stq-page-content" className="bs-container-md mt-16 max-w-2xl grow scroll-mt-16">
      <LinkHeader lastUpdated="loading..." />
      <ul className="grid grid-cols-1 gap-y-5 py-2">
        {[...Array(NUM_LOADERS)].map((_, i) => (
          <li key={i}>
            <Button
              as="span"
              className="pointer-events-none flex animate-pulse cursor-wait items-center justify-center gap-x-2 rounded-lg border-2 p-2"
              style={{ animationDelay: `${i * 0.05}s`, animationDuration: "1s" }}
            >
              <span className="inline-block h-6 min-h-[1em] w-6 rounded-full bg-current align-middle opacity-50" />
              <span className="inline-block h-6 min-h-[1em] w-44 rounded-full bg-current align-middle opacity-50" />
            </Button>
          </li>
        ))}
      </ul>
    </main>
  );
}
