import ExperienceFooter from "./Footer";
import ExperienceHeader from "./Header";

export default function ExperienceLoading() {
  return (
    <main id="stq-page-content" className="bs-container-md mt-16 flex grow scroll-mt-16 flex-col">
      <ExperienceHeader lastUpdated="Loading..." />
      <div className="flex grow items-center justify-center">Loading...</div>
      <ExperienceFooter />
    </main>
  );
}
