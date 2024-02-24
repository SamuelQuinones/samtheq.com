import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
} from "@prisma/client/runtime/library";

function prismaMessageHelper(code: string, message: string) {
  const flattenedMessage = message
    .replace(/n/g, "")
    .replace(/server at `?[A-Za-z0-9\.]+`?\:`?\d+\`/g, "server")
    .replace(/\s+/g, " ");
  if (process.env.NODE_ENV === "production") {
    switch (code) {
      //* COMMON START
      case "P1000":
        return "Authentication failed against database server, Please make sure to provide valid database credentials for the database server.";
      case "P1001":
        return "Can't reach database server. Please make sure your database server is running at the specifed host and port";
      case "P1002":
        return "The database server was reached but timed out. Please try again. Please make sure your database server is running.";
      case "P1003":
        return flattenedMessage;
      case "P1009":
        return flattenedMessage;
      case "P1010":
        // console.log(message);
        return "User was denied access on the requested database";
      case "P1011":
        // console.log(message);
        return "Error opening a TLS connection";
      case "P1013":
        // console.log(message);
        return "The provided database string is invalid";
      case "P1014":
        return flattenedMessage;
      case "P1015":
        console.log(message);
        return "Your Prisma schema is using features that are not supported for the version of the database.";
      case "P1016":
        return flattenedMessage;
      case "P1017":
        return "Server has closed the connection.";
      //* COMMON END
      default:
        return flattenedMessage;
    }
  } else {
    return message.replace(/\n/g, "").replace(/\s+/g, " ");
  }
}

function prismaCodeHelper(code?: string) {
  if (!code) return 500;
  if (
    [
      "P1000",
      "P1001",
      "P1002",
      "P1003",
      "P1008",
      "P1009",
      "P1010",
      "P1011",
      "P1012",
      "P1013",
      "P1014",
      "P1015",
      "P1016",
      "P1017",
      "P2000",
      "P2002",
      "P2003",
      "P2004",
    ].includes(code)
  ) {
    return 500;
  }
  if (
    [
      "P2005",
      "P2006",
      "P2007",
      "P2008",
      "P2009",
      "P2010",
      "P2011",
      "P2012",
      "P2013",
      "P2014",
      "P2016",
      "P2019",
      "P2020",
      "P2025",
      "P2026",
      "P2027",
    ].includes(code)
  ) {
    return 400;
  }
  if (["P2001", "P2015", "P2018", "P2021", "P2022", "P2025", "P2030"].includes(code)) {
    return 404;
  }
  if (["P2024"].includes(code)) {
    return 408;
  }
  if (["P2017", "P2023"].includes(code)) {
    return 418;
  }
  return 500;
}

function catchPrismaErrors(error: any) {
  if (error instanceof PrismaClientInitializationError) {
    return {
      type: "PrismaClientInitializationError",
      message: "There was an error initializing prisma",
      statusCode: 500,
    };
  }
  if (error instanceof PrismaClientKnownRequestError) {
    return {
      type: "PrismaClientKnownRequestError",
      message: prismaMessageHelper(error.code, error.message),
      statusCode: prismaCodeHelper(error.code),
      prismaCode: error.code,
    };
  }
  return {
    type: "ServerError",
    message: (error as Error).message || "Something unexpected occured",
    statusCode: 500,
  };
}

export default catchPrismaErrors;
