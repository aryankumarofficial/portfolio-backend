import { eq } from "drizzle-orm";
import { db } from "./db";
import { admins } from "./db/schema";
import { hashPassword } from "./utils/hash";

const run = async () => {
  const adminEmail = process.env.ADMIN_EMAIL!;
  const hash = await hashPassword(process.env.ADMIN_PASSWORD!);

  const adminExists = await db.query.admins.findFirst({
    where: eq(admins.email, adminEmail),
  });

  if (adminExists) {
    console.log(`Admin Already exists with Email: ${adminEmail}`);
  } else {
    await db.insert(admins).values({
      email: adminEmail,
      passwordHash: hash,
    });
    console.log(`Admin Created with Email: ${adminEmail}`);
  }
};

await run();

process.exit(0);
