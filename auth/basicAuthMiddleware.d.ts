import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
export interface AuthOptions {
  username?: string;
  password?: string;
  document?: string;
  port?: number;
  host?: string;
}
declare const authOptions: AuthOptions;
export declare function createBasicAuthMiddleware(
  options?: AuthOptions,
): (request: FastifyRequest, reply: FastifyReply) => Promise<undefined>;
export declare function registerBasicAuthMiddleware(
  fastify: FastifyInstance,
  options?: AuthOptions,
): Promise<void>;
export { authOptions };
//# sourceMappingURL=basicAuthMiddleware.d.ts.map
