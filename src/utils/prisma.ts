
import { PrismaClient } from "@prisma/client";


const globalForPrisma = globalThis as unknown as { 
    prisma: PrismaClient | undefined 
};

let prisma: PrismaClient;

if (!globalForPrisma.prisma) {
    
    globalForPrisma.prisma = new PrismaClient(); 
}
prisma = globalForPrisma.prisma;

if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma;
}

export default prisma;