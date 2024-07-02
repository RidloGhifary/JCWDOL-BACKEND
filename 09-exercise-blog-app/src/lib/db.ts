import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

// Ensure that prismaGlobal is correctly declared on globalThis
declare global {
  var prismaGlobal: ReturnType<typeof prismaClientSingleton> | undefined;
}

// Use the existing PrismaClient instance if available, or create a new one
const db = global.prismaGlobal ?? prismaClientSingleton();

export default db;

// Only set prismaGlobal in development to avoid issues in production
if (process.env.NODE_ENV !== "production") {
  global.prismaGlobal = db;
}
