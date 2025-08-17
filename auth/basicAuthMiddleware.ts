import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
export interface AuthOptions {
  username: string;
  password: string;
  document?: string;
}

// 解析命令行参数
const argv = yargs(hideBin(process.argv))
  .option("username", {
    alias: "u",
    type: "string",
    description: "HTTP基本身份验证用户名",
    default: "",
  })
  .option("password", {
    alias: "p",
    type: "string",
    description: "HTTP基本身份验证密码",
    default: "",
  })
  .option("document", {
    alias: "d",
    type: "string",
    description: "HTTP的openapi文件输出的位置",
    default: "",
  })
  .help().argv as AuthOptions;

const authOptions: AuthOptions = {
  username: argv.username as string,
  password: argv.password as string,
  document: argv.document as string,
};

// 创建基本身份验证中间件
export function createBasicAuthMiddleware(options: AuthOptions = authOptions) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const authorization = request.headers.authorization;

    if (!authorization || !authorization.startsWith("Basic ")) {
      reply.header("WWW-Authenticate", 'Basic realm="Protected Area"');
      return reply.code(401).send({
        error: "Unauthorized",
        message: "Missing or invalid authorization header",
      });
    }

    try {
      // 解码Base64编码的凭据
      const base64Credentials = authorization.split(" ")[1];

      if (!base64Credentials) {
        reply.header("WWW-Authenticate", 'Basic realm="Protected Area"');
        return reply.code(401).send({
          error: "Unauthorized",
          message: "Missing or invalid authorization header",
        });
      }
      const credentials = Buffer.from(base64Credentials, "base64").toString(
        "ascii",
      );
      const [username, password] = credentials.split(":");

      // 验证凭据
      if (username !== options.username || password !== options.password) {
        reply.header("WWW-Authenticate", 'Basic realm="Protected Area"');
        return reply.code(401).send({
          error: "Unauthorized",
          message: "Invalid username or password",
        });
      }

      // 验证通过，将用户信息添加到请求对象
      (request as any).user = { username };
    } catch (error) {
      reply.header("WWW-Authenticate", 'Basic realm="Protected Area"');
      return reply.code(401).send({
        error: "Unauthorized",
        message: "Invalid authorization format",
      });
    }
  };
}

// 注册中间件的函数
export async function registerBasicAuthMiddleware(
  fastify: FastifyInstance,
  options?: AuthOptions,
) {
  const authConfig = options || authOptions;

  // 添加全局前置钩子
  fastify.addHook("onRequest", createBasicAuthMiddleware(authConfig));

  console.log(
    `Basic auth middleware registered with username: ${authConfig.username} \n and document: ${authConfig.document} \n` +
      `and password : ${authConfig.password}`,
  );
}

// 导出配置供其他模块使用
export { authOptions };
