import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const job1 = await prisma.jobHistory.upsert({
    where: {
      ID: 1,
    },
    update: {},
    create: {
      company: "Fake Company LLC",
      description: "Came up with a fake company",
      title: "CEO",
      start_date: new Date("2021-01-01"),
      end_date: new Date("2020-01-01"),
      additional_info_1: "some additional info",
    },
  });
  const job2 = await prisma.jobHistory.upsert({
    where: {
      ID: 2,
    },
    update: {},
    create: {
      company: "Not Real Inc.",
      description: "Created fake data for demos",
      title: "Super User",
      start_date: new Date("2022-01-02"),
      end_date: new Date("2022-04-01"),
    },
  });
  const job3 = await prisma.jobHistory.upsert({
    where: {
      ID: 3,
    },
    update: {},
    create: {
      company: "Not Real Inc.",
      description: "Created fake data for demos",
      title: "Super User",
      start_date: new Date("2022-01-02"),
      end_date: new Date("2022-04-01"),
    },
  });

  console.table([job1, job2, job3]);
  const education1 = await prisma.educationHistory.upsert({
    where: {
      ID: 1,
    },
    update: {},
    create: {
      institution: "Lorem Ipsum University",
      description: "Took latin courses",
      degree: "Masters In Latin",
      start_date: new Date("2019-01-01"),
      end_date: new Date("2019-12-31"),
      additional_info_1: "Can you imagine if this was a real school?",
    },
  });
  const education2 = await prisma.educationHistory.upsert({
    where: {
      ID: 2,
    },
    update: {},
    create: {
      institution: "MKB College",
      description: "Made Keyboards",
      degree: "Bachelors in Design",
      start_date: new Date("2021-02-04"),
      additional_info_1: "Can you imagine if this was a real school?",
      additional_info_2: "Can you can tell i am running out of ideas",
    },
  });
  console.table([education1, education2]);

  const updateFeed1 = await prisma.updateFeed.upsert({
    where: {
      ID: 1,
    },
    update: {},
    create: {
      title: "A Fake update card",
      message: "This is designed for seeding",
    },
  });
  const updateFeed2 = await prisma.updateFeed.upsert({
    where: {
      ID: 2,
    },
    update: {},
    create: {
      title: "Another Fake Update Card",
      preview_text: "This has more info if you click read more",
      message: "Hi :)",
    },
  });
  const updateFeed3 = await prisma.updateFeed.upsert({
    where: {
      ID: 3,
    },
    update: {},
    create: {
      title: "Inactive By Default",
      message: "I am inactive by default, change me in the database to see me",
      active: false,
    },
  });
  const updateFeed4 = await prisma.updateFeed.upsert({
    where: {
      ID: 4,
    },
    update: {},
    create: {
      title: "With a link",
      message: "You can also add links to these cards, it is quite simple",
      check_it_out_link: "https://samtheq.com",
    },
  });
  const updateFeed5 = await prisma.updateFeed.upsert({
    where: {
      ID: 5,
    },
    update: {},
    create: {
      title: "Long Text",
      message:
        "This is what happens with long blocks of text, it truncates to 100 characters. Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    },
  });
  console.table([
    updateFeed1,
    updateFeed2,
    updateFeed3,
    updateFeed4,
    updateFeed5,
  ]);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
