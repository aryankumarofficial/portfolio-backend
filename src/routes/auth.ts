import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { db } from "../db";
import { eq } from "drizzle-orm";
import { admins } from "../db/schema";
import { verifyPassword } from "../utils/hash";
import "@fastify/cookie";
export default async function (fastify: FastifyInstance) {
  fastify.post("/login", async (req: FastifyRequest, reply: FastifyReply) => {
    const { email, password } = req.body as any;
    const admin = await db.query.admins.findFirst({
      where: eq(admins.email, email),
    });

    if (!admin) {
      return reply.code(401).send({ error: `Invalid Credenticials` });
    }

    const valid = await verifyPassword(admin.passwordHash, password);
    if (!valid) {
      return reply.code(401).send({ error: `Invalid Credenticials` });
    }

    const token = fastify.jwt.sign({ id: admin.id, email: admin.email });

    reply
      .setCookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 1, // 1Day
      })
      .send({ success: true });
  });

  fastify.post("/logout", async (_, reply) => {
    reply.clearCookie("token").send({ success: true });
  });
}
