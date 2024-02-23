import { mergeMetadata } from "@/lib/NextJS/metadata";
import { prisma } from "@/lib/Prisma/db";
import { format } from "date-fns";
import { UTCDateMini } from "@date-fns/utc";
import { getTheme } from "./theme";
// September 16th 2023, dynamic import doesnt allow for the importing of named client components on to the server I guess?
import { TimelineFilter, TimelineItem } from "./Timeline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faRotate } from "@fortawesome/free-solid-svg-icons";
import { Suspense } from "react";
import Button from "@/components/Button";

async function getExperienceItems() {
  const [lastUpdated, history, experienceTypes] = await Promise.all([
    //* last Updated
    prisma.experienceHistory.findFirstOrThrow({
      where: { active: true },
      select: { modified_timestamp: true },
      orderBy: { modified_timestamp: "desc" },
    }),
    //* experience history
    prisma.experienceHistory.findMany({
      select: {
        ID: true,
        description: true,
        start_date: true,
        end_date: true,
        additional_info: { select: { info: true } },
        signifier: true,
        place: true,
        exp_type: true,
      },
      where: { active: true },
      orderBy: { start_date: "desc" },
    }),
    //* unique exp types
    prisma.experienceHistory.groupBy({
      by: ["exp_type"],
      where: { active: true },
      _count: { exp_type: true },
      orderBy: { exp_type: "asc" },
    }),
  ]).catch(() => [null, null, null] as [null, null, null]);

  if (lastUpdated === null && history === null && experienceTypes === null) {
    return { lastUpdated: new Date(), experienceTypes: [], experienceItems: [] };
  }

  return {
    lastUpdated: lastUpdated.modified_timestamp,
    experienceTypes: experienceTypes.map(({ exp_type, _count }) => ({
      exp_type,
      count: _count.exp_type,
    })),
    experienceItems: history.map(({ additional_info, ...rest }) => ({
      ...rest,
      additional_info: additional_info.map(({ info }) => info),
    })),
  };
}

function Skeleton() {
  return (
    <>
      <div className="my-3 text-center text-lg">
        <p className="italic">Loading...</p>
      </div>
      <div className="mt-8 flex grow flex-col items-center justify-center gap-10">
        <h3 className="text-lg md:text-2xl">Loading Timeline items</h3>
        <FontAwesomeIcon height="1em" size="8x" icon={faRotate} spin />
        <h3 className="text-lg md:text-2xl">Please wait</h3>
      </div>
    </>
  );
}

async function ExperienceTimeline() {
  const { lastUpdated, experienceItems, experienceTypes } = await getExperienceItems();
  return (
    <>
      <p className="my-3 text-center text-lg italic">
        Last updated: {format(lastUpdated, "MMMM do yyyy")}
      </p>
      {experienceItems.length === 0 ? (
        <div className="mx-auto max-w-fit rounded-lg border border-yellow-400 border-opacity-60 bg-yellow-950 p-3 text-yellow-400">
          <p className="text-center text-lg">
            Timeline not available, please be sure to see my resume!
          </p>
        </div>
      ) : (
        <>
          <Suspense
            fallback={
              <Button variant="accent" disabled>
                Loading...
              </Button>
            }
          >
            <TimelineFilter experienceTypes={experienceTypes} />
          </Suspense>
          <div className="overflow-x-hidden">
            <ul className="timeline-list overflow-visible p-3">
              {experienceItems.map((item) => {
                const theme = getTheme(item.exp_type);
                //? should this happen on the server?
                const startDate = format(new UTCDateMini(item.start_date), "MMMM yyyy");
                //? should this happen on the server?
                const endDate = item.end_date
                  ? format(new UTCDateMini(item.end_date), "MMMM yyyy")
                  : null;
                return (
                  <TimelineItem
                    {...theme}
                    expType={item.exp_type}
                    description={item.description}
                    title={item.signifier}
                    additionalInfo={item.additional_info}
                    place={item.place}
                    startDate={startDate}
                    endDate={endDate}
                    key={`${item.exp_type}${item.ID}`}
                  />
                );
              })}
            </ul>
          </div>
        </>
      )}
    </>
  );
}

export const revalidate = 900;

const title = "Experience";
const description =
  "The work and educational experience of Samuel Quinones presented in timeline form";
const canonical = "/experience";
const extra = { title, description, url: canonical };
export const metadata = mergeMetadata({
  title,
  description,
  alternates: { canonical },
  openGraph: extra,
  twitter: extra,
});

export default function Experience() {
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
      <Suspense fallback={<Skeleton />}>
        <ExperienceTimeline />
      </Suspense>
      <section className="grid gap-6 p-3 sm:grid-cols-2">
        <Button
          asChild
          className="flex items-center justify-center gap-x-1 rounded-none py-3 text-xl/none"
        >
          <a href="/SamuelQuinonesResume.pdf" target="_blank" download>
            <FontAwesomeIcon icon={faDownload} width="1em" height="1em" />
            Download My Resume
          </a>
        </Button>
        <Button
          asChild
          variant="secondary"
          className="flex items-center justify-center gap-x-1 rounded-none py-3 text-xl/none"
        >
          <a href="/SamuelQuinonesResume.pdf" target="_blank">
            View My Resume
          </a>
        </Button>
      </section>
    </main>
  );
}
