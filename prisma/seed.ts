import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const jobs = await prisma.jobHistory.createMany({
    data: [
      {
        company: "Fake Company LLC",
        description: "Came up with a fake company",
        title: "CEO",
        start_date: new Date("2021-01-01"),
        end_date: new Date("2020-01-01"),
        additional_info_1: "some additional info",
      },
      {
        company: "Not Real Inc.",
        description: "Created fake data for demos",
        title: "Super User",
        start_date: new Date("2022-01-02"),
        end_date: new Date("2022-04-01"),
      },
      {
        company: "Phaux Industries",
        description: "Came up with words that sound like Look like fox",
        title: "Not a fox",
        start_date: new Date("2022-04-02"),
        additional_info_1: "This is the least creative job",
        additional_info_2: "But its all in good fun anyway",
      },
    ],
  });

  const education = await prisma.educationHistory.createMany({
    data: [
      {
        institution: "Lorem Ipsum University",
        description: "Took latin courses",
        degree: "Masters In Latin",
        start_date: new Date("2019-01-01"),
        end_date: new Date("2019-12-31"),
        additional_info_1: "Can you imagine if this was a real school?",
      },
      {
        institution: "MKB College",
        description: "Made Keyboards",
        degree: "Bachelors in Design",
        start_date: new Date("2021-02-04"),
        additional_info_1: "Can you imagine if this was a real school?",
        additional_info_2: "Can you can tell i am running out of ideas",
      },
    ],
  });

  console.log("Experience History");
  console.log({ education, jobs });

  const updates = await prisma.updateFeed.createMany({
    data: [
      {
        title: "A Fake update card",
        message: "This is designed for seeding",
      },
      {
        title: "Another Fake Update Card",
        preview_text: "This has more info if you click read more",
        message: "Hi :)",
      },
      {
        title: "Inactive By Default",
        message:
          "I am inactive by default, change me in the database to see me",
        active: false,
      },
      {
        title: "With a link",
        message: "You can also add links to these cards, it is quite simple",
        check_it_out_link: "https://samtheq.com",
      },
      {
        title: "Long Text",
        message:
          "This is what happens with long blocks of text, it truncates to 100 characters. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio unde est odit saepe, quis at, culpa nesciunt nam quas natus vero ullam accusantium, incidunt nostrum obcaecati neque? Officia, et autem.",
      },
    ],
  });
  console.log("Updates");
  console.log({ updates });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
