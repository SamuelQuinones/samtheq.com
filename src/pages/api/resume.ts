import type { TResumeAPI } from "@util/Types";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<TResumeAPI>
) {
  res.status(200).send({
    lastUpdated: "2022-04-02",
    experienceItems: [
      {
        title: "Software Developer",
        startDate: "2020-06-01",
        company: "Levrx",
        category: "work",
        description:
          "Coordinate with Levrx leadership and internal development and infrastructure teams to build and maintain web and mobile software applications.",
      },
      {
        title: "Premier Ambassador",
        startDate: "2019-09-01",
        endDate: "2020-06-01",
        category: "work",
        company: "ZONES inc.",
        description:
          "Provide Microsoft Office 365, Cloud Networking, and General Technical Support for Fortune 100 companies",
      },
      {
        title: "Web Developer (Intern)",
        startDate: "2019-05-01",
        endDate: "2019-0801",
        category: "work",
        company: "CommSoft",
        description:
          "Worked with Sencha (EXT JS), PHP, and SQL to make a Queue Management System with a team.",
      },
      {
        title: "Production Manager (Intern)",
        startDate: "2018-01-01",
        endDate: "2018-06-01",
        category: "work",
        company: "View360Properties",
        description:
          "Internship Recording, editing and promoting videos made to advertise 3D models of spaces made by the company.",
      },
      {
        title: "Endpoint Systems Tech",
        startDate: "2017-01-01",
        endDate: "2019-05-01",
        category: "work",
        company: "Ithaca College",
        description:
          "Provide software and hardware installation, repair, and maintenance in faculty/staff offices and computer labs.",
      },
      {
        title: "Ithaca College",
        startDate: "2015-08-01",
        endDate: "2019-05-01",
        category: "education",
        degree: "Cinema & Photography (BS)",
        description:
          "Bachelors of Science in Cinema & Photography, with a minor in Computer Science.",
      },
      {
        title: "Content Creator",
        startDate: "2013-07-01",
        category: "work",
        company: "YouTube",
        description:
          "Curate YouTube channel that provides all kinds of content to an expanding audience of 5,500+subscribers.",
      },
    ],
  });
}
