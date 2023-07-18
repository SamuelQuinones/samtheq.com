import { mergeMetadata } from "@/lib/NextJS/metadata";
import { prisma } from "@/lib/Prisma/db";
import { format } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import { getTheme } from "./theme";
import { TimelineContainer, TimelineItem } from "./Timeline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faRotate } from "@fortawesome/free-solid-svg-icons";
import { Suspense } from "react";

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
    return { error: true as const };
  }

  return {
    lastUpdated: lastUpdated.modified_timestamp,
    // TODO: Use this to replace the register category function
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
  const { lastUpdated, experienceItems, error } = await getExperienceItems();
  return error ? (
    <div className="my-10 space-y-4">
      <section className="space-y-4 text-xl md:text-center">
        <p>Something went wrong when trying to retrieve information</p>
        <p>Said information is still available in my aforementioned resume</p>
        <p>
          Please try again later, or{" "}
          <a
            className="text-blue-500 hocus:text-blue-700"
            href="https://github.com/SamuelQuinones/samtheq.com/issues"
            target="_blank"
            rel="noopener noreferrer"
          >
            open a github issue
          </a>
        </p>
      </section>
      <hr />
    </div>
  ) : (
    <>
      <div className="my-3 text-center text-lg">
        <p className="italic">Last updated: {format(lastUpdated, "MMMM do yyyy")}</p>
      </div>
      <TimelineContainer>
        {experienceItems.map((item) => {
          const theme = getTheme(item.exp_type);
          //? should this happen on the server?
          const startDate = formatInTimeZone(item.start_date, "UTC", "MMMM yyyy");
          //? should this happen on the server?
          const endDate = item.end_date
            ? formatInTimeZone(item.end_date, "UTC", "MMMM yyyy")
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
      </TimelineContainer>
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
        {/* @ts-expect-error react server component */}
        <ExperienceTimeline />
      </Suspense>
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
