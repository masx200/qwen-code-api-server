import { describe, expect, test } from "vitest";
import Fastify from "fastify";
import { registerBasicAuthMiddleware } from "./basicAuthMiddleware.js";
describe("Basic Auth Middleware", () => {
    test("should reject request without authorization header", async () => {
        const fastify = Fastify();
        fastify.get("/test", async () => ({ message: "success" }));
        await registerBasicAuthMiddleware(fastify, {
            username: "test",
            password: "test123",
        });
        const response = await fastify.inject({
            method: "GET",
            url: "/test",
        });
        expect(response.statusCode).toBe(401);
        expect(response.headers["www-authenticate"]).toBe('Basic realm="Protected Area"');
    });
    test("should reject request with invalid credentials", async () => {
        const fastify = Fastify();
        fastify.get("/test", async () => ({ message: "success" }));
        await registerBasicAuthMiddleware(fastify, {
            username: "test",
            password: "test123",
        });
        const response = await fastify.inject({
            method: "GET",
            url: "/test",
            headers: {
                authorization: "Basic " + Buffer.from("wrong:wrong").toString("base64"),
            },
        });
        expect(response.statusCode).toBe(401);
    });
    test("should accept request with valid credentials", async () => {
        const fastify = Fastify();
        fastify.get("/test", async () => ({ message: "success" }));
        await registerBasicAuthMiddleware(fastify, {
            username: "test",
            password: "test123",
        });
        const response = await fastify.inject({
            method: "GET",
            url: "/test",
            headers: {
                authorization: "Basic " +
                    Buffer.from("test:test123").toString("base64"),
            },
        });
        expect(response.statusCode).toBe(200);
        expect(JSON.parse(response.body)).toEqual({ message: "success" });
    });
    test("should attach user info to request when authenticated", async () => {
        const fastify = Fastify();
        fastify.get("/test", async (request) => ({
            message: "success",
            user: request.user,
        }));
        await registerBasicAuthMiddleware(fastify, {
            username: "testuser",
            password: "testpass",
        });
        const response = await fastify.inject({
            method: "GET",
            url: "/test",
            headers: {
                authorization: "Basic " +
                    Buffer.from("testuser:testpass").toString("base64"),
            },
        });
        expect(response.statusCode).toBe(200);
        const body = JSON.parse(response.body);
        expect(body.user).toEqual({ username: "testuser" });
    });
});
//# sourceMappingURL=basicAuth.test.js.map