import type { FastifyInstance } from "fastify";

/**
 * Run the server!
 */
export async function start(fastify: FastifyInstance) {
  try {
    console.log(
      "listening address",
      await fastify.listen({ port: 3000, host: "0.0.0.0" }),
    );
  } catch (err) {
    fastify.log.error(err);
    console.error(err);
    process.exit(1);
  }
}
