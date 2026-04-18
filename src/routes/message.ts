import type { FastifyInstance } from "fastify";
import { db } from "../db";
import { messeges } from "../db/schema";
import { desc, eq } from "drizzle-orm";

export default function (fastify: FastifyInstance) {
  fastify.get(
    "/messages",
    { preHandler: fastify.authenticate },
    async (req, reply) => {
      async () => {
        return db.select().from(messeges).orderBy(desc(messeges.createdAt));
      };
    },
  );
  fastify.patch(
    "/messages/:id",
    { preHandler: fastify.authenticate },
    async (req, reply) => {
      const { id } = req.params as any;
      await db
        .update(messeges)
        .set({ isRead: true })
        .where(eq(messeges.id, id));
      return reply.send({ success: true });
    },
  );
}
