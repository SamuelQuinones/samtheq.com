import { mergeMetadata } from "@/lib/NextJS/metadata";
import GithubCodeCard from "./GithubCodeCard";
import { Suspense } from "react";
import { getGithubReposByUser } from "@/lib/Github/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTools, faWarning } from "@fortawesome/free-solid-svg-icons";
import Button from "@/components/Button";

function Skeleton() {
  return (
    <section data-code-source="loading" className="animate-pulse cursor-not-allowed space-y-3.5">
      <h2 className="text-2xl/none font-semibold text-accent">
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
            className="flex flex-col gap-y-3 rounded-md border-2 border-primary bg-gray-900 p-3 shadow-lg"
          >
            <h3 className="text-lg">
              <span className="inline-block size-5 rounded-full bg-current align-middle opacity-50" />{" "}
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
            <div className="-mx-3 -mb-3 grid grid-cols-3 items-center divide-x-2 divide-gray-900 rounded-b-md border-t border-primary">
              {[...Array(3)].map((_, ii) => (
                <Button
                  className="flex size-full items-center justify-center gap-x-1 rounded-none border-0 first:rounded-bl-sm last:rounded-br-sm"
                  key={ii}
                  disabled
                >
                  <p>
                    <span className="mx-auto inline-block size-4 min-h-[1em] rounded-full bg-current align-middle opacity-50" />
                  </p>
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

async function GitHubRepos() {
  const myRepos = await getGithubReposByUser("SamuelQuinones").catch((e) => {
    process.env.NODE_ENV === "development" && console.error(e);
    return null;
  });
  return (
    <section data-code-source="github" className="space-y-3.5">
      <h2
        id="github-projects"
        className="scroll-mt-16 text-2xl/none font-semibold text-accent transition-colors hocus:text-accent-lighter-10"
      >
        <a href="#github-projects">Github</a>
      </h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit quasi quo pariatur totam
        perspiciatis, voluptate, sit maiores libero minus nam, molestias quibusdam placeat hic
        asperiores. Fuga optio corrupti iure eum!
      </p>
      {myRepos === null ? (
        <div className="mx-auto flex max-w-fit items-center gap-x-3 rounded-lg border border-yellow-400 border-opacity-60 bg-yellow-950 p-3 text-yellow-400 shadow-md">
          <FontAwesomeIcon icon={faWarning} height="1em" width="1em" className="h-full w-12" />
          <div>
            <h3 className="mb-3 text-xl/none">An Error Occured</h3>
            <p className="italic">
              Unable to fetch Github repositories at this time, please try again later.
            </p>
            <p>
              Alternatively, check out my{" "}
              <a
                href="https://github.com/SamuelQuinones?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold underline transition-colors hocus:text-yellow-500"
              >
                Github Repositories
              </a>{" "}
              directly.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {myRepos.map((repo) => (
            <GithubCodeCard key={repo.id} {...repo} />
          ))}
        </div>
      )}
    </section>
  );
}

export const revalidate = 1800;

const title = "Code Projects";
const description = "A collection of Samuel Quinones' development projects";
const canonical = "/code";
export const metadata = mergeMetadata({ title, description, alternates: { canonical } });

export default function CodeProjects() {
  if (process.env.NODE_ENV === "production") {
    return (
      <main id="stq-page-content" className="bs-container-md mt-16 w-full grow scroll-mt-16">
        <h1 className="mb-10 mt-4 text-center text-3xl sm:text-5xl lg:text-6xl">
          Development Projects
        </h1>
        <div className="my-10 text-center">
          <FontAwesomeIcon height="1em" size="10x" icon={faTools} />
        </div>
        <p className="mb-5 text-center md:text-lg lg:text-xl">
          This is a placeholder page, more info coming soon. In the mean time please check out the
          rest of the site!
        </p>
        <p className="text-center md:text-lg lg:text-xl">
          Additionally, you can check out my Github Page.
        </p>
      </main>
    );
  }
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
