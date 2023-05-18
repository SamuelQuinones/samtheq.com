import { faRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ExperienceFooter from "./Footer";
import ExperienceHeader from "./Header";

export default function ExperienceLoading() {
  return (
    <main id="stq-page-content" className="bs-container-md mt-16 flex grow scroll-mt-16 flex-col">
      <ExperienceHeader lastUpdated="Loading..." />
      <div className="mt-8 flex grow flex-col items-center justify-center gap-10">
        <h3 className="text-lg md:text-2xl">Loading Timeline items</h3>
        <FontAwesomeIcon height="1em" size="8x" icon={faRotate} spin />
        <h3 className="text-lg md:text-2xl">Please wait</h3>
      </div>
      <ExperienceFooter />
    </main>
  );
}
