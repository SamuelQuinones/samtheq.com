import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ExperienceFooter() {
  return (
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
  );
}
