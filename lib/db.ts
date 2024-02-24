import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export const db = prisma;

// When we are not on the production this will not initialize the prisma client again and again