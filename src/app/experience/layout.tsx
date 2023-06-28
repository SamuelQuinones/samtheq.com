import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ExperienceLayout({ children }: { children: React.ReactNode }) {
  return (
    <main id="stq-page-content" className="bs-container-md mt-16 w-full grow scroll-mt-16">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <section className="flex flex-col justify-center">
          <h1 className="mb-3 text-center text-4xl sm:text-5xl lg:text-6xl">My Experience</h1>
          <div className="text-center">
            <p>Full resume available for download at the bottom of this page</p>
          </div>
        </section>
        <section>
          <p className="mb-2">
            Below you will find a timeline of my work and educational experience.
          </p>
          <p className="mb-2">
            Each box or node represents one item, and will show a short summary of the experience
            gained
          </p>
          <p className="mb-2">
            If more information is available, you can click <strong>"Read More"</strong> to get a
            more in depth summary.
          </p>
        </section>
      </div>
      {children}
      <section className="grid gap-6 p-3 sm:grid-cols-2">
        <a
          className="btn btn-blue flex items-center justify-center gap-x-1 rounded-none py-3 text-xl/none"
          href="/SamuelQuinonesResume.pdf"
          target="_blank"
          download
        >
          <FontAwesomeIcon icon={faDownload} width="1em" height="1em" />
          Download My Resume
        </a>
        <a
          className="btn btn-secondary flex items-center justify-center gap-x-1 rounded-none py-3 text-xl/none"
          href="/SamuelQuinonesResume.pdf"
          target="_blank"
        >
          View My Resume
        </a>
      </section>
    </main>
  );
}
