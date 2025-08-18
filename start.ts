import type { FastifyInstance } from "fastify";

/**
 * Run the server!
 */
export async function start(
  fastify: FastifyInstance,
  callback: (err: Error | null, address: string) => void,
  port = 3000,
  host = "0.0.0.0",
) {
  try {
    console.log(
      "listening address",
      await fastify.listen({ port: port, host: "0.0.0.0" }, callback),
    );
  } catch (err) {
    fastify.log.error(err);
    console.error(err);
    process.exit(1);
  }
}
