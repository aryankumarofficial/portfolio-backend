import Fastify from "fastify";
import jwt from "@fastify/jwt";
import cookie from "@fastify/cookie";
import cors from "@fastify/cors";
import rateLimit from "@fastify/rate-limit";
import authPlugin from "./plugins/auth";
import authRoutes from "./routes/auth";
import contactRoutes from "./routes/contact";
import messageRoutes from "./routes/message";
const app = Fastify();

const port = Number(process.env.PORT) || 5000;

await app.register(cors, {
  origin:
    /^(https:\/\/([\w-]+\.)?aryankumarofficial\.dev|http:\/\/localhost(:\d+)?)$/,
  credentials: true,
});

await app.register(cookie);
await app.register(jwt, {
  secret: process.env.JWT_SECRET!,
  cookie: {
    cookieName: "token",
    signed: false,
  },
});

await app.register(rateLimit, {
  max: 5,
  timeWindow: "1 minute",
});

await app.register(authPlugin);

app.get("/", async (_, reply) => {
  return reply.send({ message: `Fastify Backend Running` });
});

app.register(authRoutes, { prefix: "auth" });
app.register(contactRoutes);
app.register(messageRoutes);

app.listen({ port, host: "0.0.0.0" }, () => {
  console.log(`Server running at port ${port}`);
});
