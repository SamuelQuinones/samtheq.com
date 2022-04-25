import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
} from "@prisma/client/runtime";

function catchPrismaErrors(error: any) {
  if (error instanceof PrismaClientInitializationError) {
    return {
      type: "PrismaClientInitializationError",
      message: "There was an error initializing prisma",
      code: 500,
    };
  }
  if (error instanceof PrismaClientKnownRequestError) {
    return {
      type: "PrismaClientKnownRequestError",
      message: error.message,
      code: 500,
      prismaCode: error.code,
    };
  }
  return {
    type: "ServerError",
    message: error?.message || "Something unexpected occured",
    code: 500,
  };
}

export default catchPrismaErrors;
