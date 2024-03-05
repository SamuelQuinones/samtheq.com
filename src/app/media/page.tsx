import { mergeMetadata } from "@/lib/NextJS/metadata";
import { faTools } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const title = "Media Projects";
const description = "A collection of Samuel Quinones' media projects";
const canonical = "/media";
export const metadata = mergeMetadata({ title, description, alternates: { canonical } });

export default function MediaProjects() {
  return (
    <main id="stq-page-content" className="bs-container-md mt-16 w-full grow scroll-mt-16">
      <h1 className="mb-10 mt-4 text-center text-3xl sm:text-5xl lg:text-6xl">Media Projects</h1>
      <div className="my-10 text-center">
        <FontAwesomeIcon height="1em" size="10x" icon={faTools} />
      </div>
      <p className="mb-5 text-center md:text-lg lg:text-xl">
        This is a placeholder page, more info coming soon. In the mean time please check out the
        rest of the site!
      </p>
      <p className="text-center md:text-lg lg:text-xl">
        Additionally, you can check out my YouTube Channel.
      </p>
    </main>
  );
}
