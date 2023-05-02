import { mergeMetadata } from "@/lib/NextJS/metadata";

const title = "About";
const description = "About Samuel Quinones and this site";
const canonical = "/about";
const extra = { title, description, url: canonical };
export const metadata = mergeMetadata({
  title,
  description,
  alternates: { canonical },
  openGraph: extra,
  twitter: extra,
});

export default function About() {
  return (
    <main id="stq-page-content" className="bs-container-md mt-16 grow scroll-mt-16">
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
