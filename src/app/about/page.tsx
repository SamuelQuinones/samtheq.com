import { mergeMetadata } from "@/lib/NextJS/metadata";
import { faTools } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const title = "About";
const description = "About Samuel Quinones and this site";
const canonical = "/about";
export const metadata = mergeMetadata({ title, description, alternates: { canonical } });

export default function About() {
  if (process.env.NODE_ENV === "production") {
    return (
      <main id="stq-page-content" className="bs-container-md mt-16 w-full grow scroll-mt-16">
        <h1 className="my-4 text-center text-4xl sm:text-5xl lg:text-6xl">About Me</h1>
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
  return (
    <main id="stq-page-content" className="bs-container-md mt-16 w-full grow scroll-mt-16">
      <h1 className="my-4 text-center text-4xl sm:text-5xl lg:text-6xl">About Me</h1>
      <div className="mx-auto max-w-5xl md:text-xl [&_p]:mb-4">
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis corporis maiores laborum,
          nam earum quo, illum eius dolore rem unde nihil qui eaque totam tenetur aspernatur aperiam
          beatae, voluptatem quisquam?
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione exercitationem, quae
          culpa numquam aliquid dolorum vitae modi, sed temporibus, tempore veritatis nulla iure.
          Quo nam nesciunt porro natus modi quos?
        </p>
      </div>
    </main>
  );
}
