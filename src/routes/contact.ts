import type { FastifyInstance, FastifyRequest } from "fastify";
import type { FastifyReply } from "fastify/types/reply";
import { contactSchema } from "../schema/Contact";
import { db } from "../db";
import { messeges } from "../db/schema";
import { moderateText } from "../utils/moderation";

export default async function (fastify: FastifyInstance) {
  fastify.post("/contact", async (req: FastifyRequest, reply: FastifyReply) => {
    const parsed = contactSchema.safeParse(req.body);
    if (!parsed.success) {
      return reply
        .code(400)
        .send({ error: parsed.error.issues[0]?.message || "Invalid Input" });
    }

    const { email, message, name, company } = parsed.data;
    if (company) return reply.send({ success: true }); // bot trap

    const profinityResponse = await moderateText(
      `${name}\n${email}\n${message}`,
    );

    if (profinityResponse.flagged) {
      return reply
        .code(400)
        .send({ error: `Message rejected due to policy violation` });
    }

    await db.insert(messeges).values({
      name,
      email,
      message,
    });
    return reply.send({ succes: true });
  });
}
