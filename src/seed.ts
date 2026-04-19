import "dotenv/config";
import { eq } from "drizzle-orm";
import { db } from "./db";
import { admins } from "./db/schema";
import { hashPassword } from "./utils/hash";

const run = async () => {
  const adminEmail = process.env.ADMIN_EMAIL!;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    throw new Error(
      `Email and Password Required to be set in the ENV to create Admin: ${adminEmail} : ${adminPassword}`,
    );
  }

  const hash = await hashPassword(adminPassword);

  const adminExists = await db.query.admins.findFirst({
    where: eq(admins.email, adminEmail),
  });

  if (adminExists) {
    console.log(`Admin Already exists with Email: ${adminEmail}`);
  } else {
    console.log(`Creating Admin with ${adminEmail}: ${adminPassword}`);
    await db.insert(admins).values({
      email: adminEmail,
      passwordHash: hash,
    });
    console.log(`Admin Created with Email: ${adminEmail}`);
  }
};

await run();

process.exit(0);
