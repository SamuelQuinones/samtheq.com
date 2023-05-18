import { mergeMetadata } from "@/lib/NextJS/metadata";
import { prisma } from "@/lib/Prisma/db";
import { format } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import ExperienceFooter from "./Footer";
import ExperienceHeader from "./Header";
import { getTheme } from "./theme";
import { TimelineContainer, TimelineItem } from "./Timeline";

async function getExperienceItems() {
  const [lastUpdated, history] = await Promise.all([
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
  ]).catch(() => [null, null] as [null, null]);

  if (lastUpdated === null && history === null) {
    return { lastUpdated: new Date(), error: true, experienceItems: [] };
  }

  return {
    lastUpdated: lastUpdated.modified_timestamp,
    error: false,
    experienceItems: history.map(({ additional_info, ...rest }) => ({
      ...rest,
      additional_info: additional_info.map(({ info }) => info),
    })),
  };
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

export default async function Experience() {
  const { lastUpdated, error, experienceItems } = await getExperienceItems();
  return (
    <main id="stq-page-content" className="bs-container-md mt-16 grow scroll-mt-16">
      <ExperienceHeader lastUpdated={format(lastUpdated, "MMMM do yyyy")} />
      {error && (
        <div className="my-10 text-xl md:text-center lg:text-2xl">
          <p className="mb-3">Something went wrong when trying to retrieve information</p>
          <p className="mb-3">Said information is still available in my aforementioned resume</p>
          <p className="mb-3">
            Please try again later, or{" "}
            <a
              href="https://github.com/SamuelQuinones/samtheq.com/issues"
              target="_blank"
              rel="noopener noreferrer"
            >
              open a github issue
            </a>
          </p>
        </div>
      )}
      <TimelineContainer>
        {experienceItems.map((item) => {
          const theme = getTheme(item.exp_type);
          const startDate = formatInTimeZone(item.start_date, "UTC", "MMMM yyyy");
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
      <ExperienceFooter />
    </main>
  );
}
