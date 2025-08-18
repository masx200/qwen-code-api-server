import type { FastifyInstance } from "fastify";
import os from "os";
import z from "zod";
import { zodtojsonSchema } from "../mcp/registerMcpListRoute.js";
import { SessionManager } from "./SessionManager.js";
import { createSessionResponseSchema } from "./createSessionRequestSchema.js";
import {
  deleteSessionRequestSchema,
  deleteSessionResponseSchema,
} from "./deleteSessionRequestSchema.js";
import {
  getSessionRequestSchema,
  getSessionResponseSchema,
} from "./getSessionRequestSchema.js";
import { listSessionsResponseSchema } from "./listSessionsResponseSchema.js";
import {
  findSessionsByCwdRequestSchema,
  findSessionsByCwdResponseSchema,
} from "./findSessionsByCwdRequestSchema.js";
import { createId } from "./sessions.js";
const createSessionRequestSchema = z.object({
  cwd: z.string(),
  argv: z.array(z.string()),
});
export function registerSessionRoute(
  fastify: FastifyInstance,
  sessionManager: SessionManager
) {
  // 注册会话相关路由
  // 创建会话
  fastify.post(
    "/sessions/create",
    {
      schema: {
        description: "创建新的会话",
        tags: ["sessions"],
        body: zodtojsonSchema(createSessionRequestSchema),

        response: {
          200: createSessionResponseSchema,
          500: createSessionResponseSchema,
        },
      },
    },
    async (request, reply) => {
      try {
        let actualSessionId = createId();
        let { cwd, argv } = request.body as z.infer<
          typeof createSessionRequestSchema
        >;
        cwd = cwd.length ? cwd : os.homedir();
        const session = await sessionManager.createSession(cwd, argv);
        sessionManager.setSession(actualSessionId, session);
        // console.log(JSON.stringify(session, null, 4));
        reply.send({
          success: true,
          sessionId: actualSessionId,
          session: {
            sessionStartTime:
              session.session.stats.sessionStartTime.toISOString(),
            promptCount: session.session.stats.promptCount,
            lastPromptTokenCount: session.session.stats.lastPromptTokenCount,
            metrics: session.session.stats.metrics,
          },
        });
        return;
      } catch (error) {
        request.log.error(error);
        console.error(error);
        reply.status(500).send({
          success: false,
          error: "Internal server error",
          message: String(error),
        });
      }
    }
  );
  // 列出所有会话
  fastify.get(
    "/sessions/list",
    {
      schema: {
        description: "获取所有会话ID列表",
        tags: ["sessions"],
        response: {
          200: listSessionsResponseSchema,
          500: listSessionsResponseSchema,
        },
      },
    },
    async (request, reply) => {
      try {
        const sessions = sessionManager.listSessions();
        return {
          success: true,
          sessions,
        };
      } catch (error) {
        request.log.error(error);
        console.error(error);
        reply.status(500).send({
          success: false,
          error: "Internal server error",
          message: String(error),
        });
      }
    }
  );
  // 删除会话
  fastify.delete(
    "/sessions/delete",
    {
      schema: {
        description: "删除指定会话",
        tags: ["sessions"],
        body: deleteSessionRequestSchema,
        response: {
          200: deleteSessionResponseSchema,
          500: deleteSessionResponseSchema,
        },
      },
    },
    async (request, reply) => {
      try {
        const { sessionId } = request.body as { sessionId: string };

        if (!sessionManager.getSession(sessionId)) {
          return {
            sessionId,
            success: true,
            error: "Session not found",
            message: `Session ${sessionId} not found`,
          };
        }
        const session = sessionManager.getSession(sessionId);
        sessionManager.deleteSession(sessionId);
        return {
          success: true,
          message: `Session ${sessionId} deleted`,
          sessionId,
          session,
        };
      } catch (error) {
        request.log.error(error);
        console.error(error);
        reply.status(500).send({
          success: false,
          error: "Internal server error",
          message: String(error),
        });
      }
    }
  );
  // 获取会话详情
  fastify.post(
    "/sessions/get",
    {
      schema: {
        description: "获取指定会话的详细信息",
        tags: ["sessions"],
        body: getSessionRequestSchema,
        response: {
          200: getSessionResponseSchema,
          500: getSessionResponseSchema,
        },
      },
    },
    async (request, reply) => {
      try {
        const { sessionId } = request.body as { sessionId: string };

        const session = sessionManager.getSession(sessionId);
        if (!session) {
          return {
            success: false,
            error: "Session not found",
            message: `Session ${sessionId} not found`,
          };
        }

        return {
          success: true,
          sessionId,
          session: {
            sessionStartTime:
              session.session.stats.sessionStartTime.toISOString(),
            promptCount: session.session.stats.promptCount,
            lastPromptTokenCount: session.session.stats.lastPromptTokenCount,
            metrics: session.session.stats.metrics,
          },
        };
      } catch (error) {
        request.log.error(error);
        console.error(error);
        reply.status(500).send({
          success: false,
          error: "Internal server error",
          message: String(error),
        });
      }
    }
  );

  // 根据cwd查找会话
  fastify.post(
    "/sessions/cwd",
    {
      schema: {
        description: "根据工作目录路径查找会话",
        tags: ["sessions"],
        body: findSessionsByCwdRequestSchema,
        response: {
          200: findSessionsByCwdResponseSchema,
          500: findSessionsByCwdResponseSchema,
        },
      },
    },
    async (request, reply) => {
      try {
        let { cwd } = request.body as { cwd: string };
        cwd = cwd.length ? cwd : os.homedir();

        if (!cwd) {
          return {
            success: false,
            error: "Invalid request",
            message: "cwd is required",
            sessions: [],
          };
        }

        const sessions = sessionManager.findSessionsByCwd(cwd);

        return {
          success: true,
          sessions: sessions.map((session) => {
            // 获取对应的sessionId
            let sessionId = session.sessionId;

            return sessionId;
          }),
        };
      } catch (error) {
        request.log.error(error);
        console.error(error);
        reply.status(500).send({
          success: false,
          error: "Internal server error",
          message: String(error),
          sessions: [],
        });
      }
    }
  );
}
