import { mergeMetadata } from "@/lib/NextJS/metadata";
import GithubCodeCard from "./GithubCodeCard";
import { Suspense } from "react";
import { getGithubReposByUser } from "@/lib/Github/api";

function Skeleton() {
  return (
    <section data-code-source="loading" className="animate-pulse cursor-not-allowed space-y-3.5">
      <h2 className="text-2xl/none font-semibold text-secondary-300">
        <span className="inline-block min-h-[1em] w-32 cursor-wait bg-current align-middle opacity-50" />
      </h2>
      <p>
        <span className="inline-block min-h-[1em] w-7/12 cursor-wait bg-current align-middle opacity-50" />{" "}
        <span className="inline-block min-h-[1em] w-1/3 cursor-wait bg-current align-middle opacity-50" />{" "}
        <span className="inline-block min-h-[1em] w-1/4 cursor-wait bg-current align-middle opacity-50" />{" "}
        <span className="inline-block min-h-[1em] w-1/4 cursor-wait bg-current align-middle opacity-50" />{" "}
        <span className="inline-block min-h-[1em] w-1/3 cursor-wait bg-current align-middle opacity-50" />
      </p>
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="flex flex-col gap-y-3 rounded-md border-2 border-primary-700/70 bg-gray-900 p-3 shadow-lg"
          >
            <h3 className="text-lg">
              <span className="inline-block h-5 w-5 rounded-full bg-current align-middle opacity-50" />{" "}
              <span className="inline-block h-5 min-h-[1em] w-3/5 cursor-wait bg-current align-middle opacity-50" />
            </h3>
            <div className="flex-auto">
              <p className="line-clamp-2">
                <span className="inline-block min-h-[1em] w-7/12 cursor-wait bg-current align-middle opacity-50" />{" "}
                <span className="inline-block min-h-[1em] w-1/3 cursor-wait bg-current align-middle opacity-50" />{" "}
                <span className="inline-block min-h-[1em] w-1/4 cursor-wait bg-current align-middle opacity-50" />{" "}
                <span className="inline-block min-h-[1em] w-1/4 cursor-wait bg-current align-middle opacity-50" />{" "}
                <span className="inline-block min-h-[1em] w-1/3 cursor-wait bg-current align-middle opacity-50" />
              </p>
            </div>
            <div className="-mx-3 -mb-3 grid grid-cols-3 items-center divide-x-2 divide-gray-900 rounded-b-md border-t border-primary-700/70">
              {[...Array(3)].map((_, ii) => (
                <div
                  key={ii}
                  className="btn btn-primary disabled flex h-full w-full items-center justify-center gap-x-1 rounded-none border-0 first:rounded-bl-sm last:rounded-br-sm"
                >
                  <p>
                    <span className="mx-auto inline-block h-4 min-h-[1em] w-4 rounded-full bg-current align-middle opacity-50" />
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

async function GitHubRepos() {
  const test = await getGithubReposByUser("SamuelQuinones");
  return (
    <section data-code-source="github" className="space-y-3.5">
      <h2
        id="github-projects"
        className="scroll-mt-16 text-2xl/none font-semibold text-secondary-300 transition-colors hocus:text-secondary-400"
      >
        <a href="#github-projects">Github</a>
      </h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit quasi quo pariatur totam
        perspiciatis, voluptate, sit maiores libero minus nam, molestias quibusdam placeat hic
        asperiores. Fuga optio corrupti iure eum!
      </p>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {test.map((repo) => (
          <GithubCodeCard key={repo.id} {...repo} />
        ))}
      </div>
    </section>
  );
}

export const revalidate = 1800;

const title = "Code Projects";
const description = "A collection of Samuel Quinones' development projects";
const canonical = "/code";
const extra = { title, description, url: canonical };
export const metadata = mergeMetadata({
  title,
  description,
  alternates: { canonical },
  openGraph: extra,
  twitter: extra,
});

export default function CodeProjects() {
  return (
    <main id="stq-page-content" className="bs-container-md mt-16 w-full grow scroll-mt-16">
      <h1 className="mb-10 mt-4 text-center text-3xl sm:text-5xl lg:text-6xl">
        Development Projects
      </h1>
      <Suspense fallback={<Skeleton />}>
        <GitHubRepos />
      </Suspense>
    </main>
  );
}
