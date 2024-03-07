import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
const db = new PrismaClient();

async function seed() {
    const admin = await db.user.create({
        data: {
            username: "admin",
            // this is a hashed version of "twixrox"
            passwordHash:
                await bcrypt.hash("admin", 10),
            role: "master"
        },
    });
}

seed();