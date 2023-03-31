export default function ExperienceHeader({ lastUpdated }: { lastUpdated: string }) {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      <section className="flex flex-col justify-center">
        <h1 className="mb-3 text-center text-4xl sm:text-5xl lg:text-6xl">My Experience</h1>
        <div className="text-center">
          <p className="italic">Last updated: {lastUpdated}</p>
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
          If more information is available, you can click <strong>"Read More"</strong> to get a more
          in depth summary.
        </p>
      </section>
    </div>
  );
}
