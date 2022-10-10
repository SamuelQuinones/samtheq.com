import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const experience = await Promise.all([
    prisma.experienceHistory.upsert({
      where: {
        ID: 1,
      },
      update: {},
      create: {
        place: "Fake Company LLC",
        description: "Came up with a fake company",
        signifier: "CEO",
        start_date: new Date("2021-01-01"),
        end_date: new Date("2020-01-01"),
      },
    }),
    prisma.experienceHistory.upsert({
      where: {
        ID: 2,
      },
      update: {},
      create: {
        place: "Not Real Inc.",
        description: "Created fake data for demos",
        signifier: "Super User",
        start_date: new Date("2022-01-02"),
        end_date: new Date("2022-04-01"),
      },
    }),
    prisma.experienceHistory.upsert({
      where: {
        ID: 3,
      },
      update: {},
      create: {
        place: "Cognito Inc",
        description: "Incognito but reversed",
        signifier: "Super User",
        start_date: new Date("2022-04-02"),
      },
    }),
    prisma.experienceHistory.upsert({
      where: {
        ID: 4,
      },
      update: {},
      create: {
        exp_type: "education",
        place: "Lorem Ipsum University",
        description: "Took latin courses",
        signifier: "Masters In Latin",
        start_date: new Date("2019-01-01"),
        end_date: new Date("2019-12-31"),
      },
    }),
    prisma.experienceHistory.upsert({
      where: {
        ID: 5,
      },
      update: {},
      create: {
        exp_type: "education",
        place: "MKB College",
        description: "Made Keyboards",
        signifier: "Bachelors in Design",
        start_date: new Date("2021-02-04"),
      },
    }),
  ]);
  await Promise.all([
    prisma.experienceInfo.upsert({
      where: {
        ID: 1,
      },
      update: {},
      create: {
        experience_id: 1,
        info: "some additional info",
      },
    }),
    prisma.experienceInfo.upsert({
      where: {
        ID: 2,
      },
      update: {},
      create: {
        info: "Can you imagine if this was a real school?",
        experience_id: 4,
      },
    }),
    prisma.experienceInfo.upsert({
      where: {
        ID: 3,
      },
      update: {},
      create: {
        experience_id: 5,
        info: "Can you imagine if this was a real school?",
      },
    }),
    prisma.experienceInfo.upsert({
      where: {
        ID: 4,
      },
      update: {},
      create: {
        experience_id: 5,
        info: "Can you can tell i am running out of ideas",
      },
    }),
  ]);
  console.table(experience);

  const updates = await Promise.all([
    prisma.updateFeed.upsert({
      where: {
        ID: 1,
      },
      update: {},
      create: {
        title: "A Fake update card",
        message: "This is designed for seeding",
      },
    }),
    prisma.updateFeed.upsert({
      where: {
        ID: 2,
      },
      update: {},
      create: {
        title: "Another Fake Update Card",
        preview_text: "This has more info if you click read more",
        message: "Hi :)",
      },
    }),
    prisma.updateFeed.upsert({
      where: {
        ID: 3,
      },
      update: {},
      create: {
        title: "Inactive By Default",
        message:
          "I am inactive by default, change me in the database to see me",
        active: false,
      },
    }),
    prisma.updateFeed.upsert({
      where: {
        ID: 4,
      },
      update: {},
      create: {
        title: "With a link",
        message: "You can also add links to these cards, it is quite simple",
        check_it_out_link: "https://samtheq.com",
      },
    }),
    prisma.updateFeed.upsert({
      where: {
        ID: 5,
      },
      update: {},
      create: {
        title: "Long Text",
        message:
          "This is what happens with long blocks of text, it truncates to 100 characters. Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
      },
    }),
  ]);
  console.table(updates);

  const links = await Promise.all([
    prisma.socialLink.upsert({
      where: {
        ID: 1,
      },
      update: {},
      create: {
        title: "YouTube Channel",
        target: "https://youtube.com",
        redirect: "youtube",
        description: "This is a link to the YouTube homepage",
        priority: 2,
        icon_prefix: "fab",
        icon_name: "youtube",
      },
    }),
    prisma.socialLink.upsert({
      where: {
        ID: 2,
      },
      update: {},
      create: {
        title: "TikTok",
        target: "https://tiktok.com",
        redirect: "tiktok",
        priority: 8,
        icon_prefix: "fab",
        icon_name: "tiktok",
      },
    }),
    prisma.socialLink.upsert({
      where: {
        ID: 3,
      },
      update: {},
      create: {
        title: "Twitter",
        target: "https://twitter.com",
        redirect: "twitter",
        priority: 3,
        icon_prefix: "fab",
        icon_name: "twitter",
      },
    }),
  ]);
  console.table(links);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
