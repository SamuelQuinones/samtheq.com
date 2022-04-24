import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  // @ts-expect-error technically prisma isnta default global object
  if (!global.prisma) {
    // @ts-expect-error technically prisma isnta default global object
    global.prisma = new PrismaClient();
  }
  // @ts-expect-error technically prisma isnta default global object
  prisma = global.prisma;
}
export default prisma;
