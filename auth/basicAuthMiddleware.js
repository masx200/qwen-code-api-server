import yargs from "yargs";
import { hideBin } from "yargs/helpers";
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
    .option("port", {
    type: "number",
    description: "HTTP监听端口",
    default: 3000,
})
    .option("host", {
    alias: "h",
    type: "string",
    description: "HTTP监听主机",
    default: "0.0.0.0",
})
    .help().argv;
const authOptions = {
    username: argv.username,
    password: argv.password,
    document: argv.document,
    port: argv.port,
    host: argv.host,
};
export function createBasicAuthMiddleware(options = authOptions) {
    return async (request, reply) => {
        const authorization = request.headers.authorization;
        if (!authorization || !authorization.startsWith("Basic ")) {
            reply.header("WWW-Authenticate", 'Basic realm="Protected Area"');
            return reply.code(401).send({
                error: "Unauthorized",
                message: "Missing or invalid authorization header",
            });
        }
        try {
            const base64Credentials = authorization.split(" ")[1];
            if (!base64Credentials) {
                reply.header("WWW-Authenticate", 'Basic realm="Protected Area"');
                return reply.code(401).send({
                    error: "Unauthorized",
                    message: "Missing or invalid authorization header",
                });
            }
            const credentials = Buffer.from(base64Credentials, "base64").toString("ascii");
            const [username, password] = credentials.split(":");
            if (username !== options.username || password !== options.password) {
                reply.header("WWW-Authenticate", 'Basic realm="Protected Area"');
                return reply.code(401).send({
                    error: "Unauthorized",
                    message: "Invalid username or password",
                });
            }
            request.user = { username };
        }
        catch (error) {
            reply.header("WWW-Authenticate", 'Basic realm="Protected Area"');
            return reply.code(401).send({
                error: "Unauthorized",
                message: "Invalid authorization format",
            });
        }
    };
}
export async function registerBasicAuthMiddleware(fastify, options) {
    const authConfig = options || authOptions;
    fastify.addHook("onRequest", createBasicAuthMiddleware(authConfig));
    console.log(`Basic auth middleware registered with \n username: ${authConfig.username} \n and document: ${authConfig.document} \n` +
        `and password : ${authConfig.password}`);
}
export { authOptions };
//# sourceMappingURL=basicAuthMiddleware.js.map