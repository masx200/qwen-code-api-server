import process from "node:process";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import fastify from "fastify";
import { registertoolsRoute } from "./registertoolsRoute.js";
import { SessionManager } from "../session/SessionManager.js";
describe("POST /command/tools", async () => {
    let app;
    const sessionManager = new SessionManager();
    const sessionId = sessionManager.createId();
    const session = await sessionManager.createSession(process.cwd(), []);
    sessionManager.setSession(sessionId, session);
    beforeEach(async () => {
        app = fastify();
        registertoolsRoute(app, sessionManager);
        await app.ready();
    });
    afterEach(async () => {
        await app.close();
    });
    it("should return tools information for valid request with desc args", async () => {
        const requestBody = {
            sessionId: sessionId,
            args: "desc",
        };
        const response = await app.inject({
            method: "POST",
            url: "/command/tools",
            payload: requestBody,
            headers: {
                "Content-Type": "application/json",
            },
        });
        expect(response.statusCode).toBe(200);
        const responseBody = JSON.parse(response.body);
        console.log(JSON.stringify(responseBody, null, 4));
        expect(responseBody.baseTimestamp).toBeDefined();
        expect(typeof responseBody.baseTimestamp).toBe("number");
        expect(responseBody.itemData.text).toBeDefined();
        expect(responseBody).toMatchObject({
            success: true,
            itemData: {
                type: "info",
            },
        });
    }, {
        timeout: 20000,
    });
    it("should handle invalid request body", async () => {
        const invalidRequestBody = {
            sessionId,
            args: "desc",
        };
        const response = await app.inject({
            method: "POST",
            url: "/command/tools",
            payload: invalidRequestBody,
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log(JSON.stringify(response, null, 4));
        expect(response.statusCode).toBe(400);
    });
    it("should handle empty args parameter", async () => {
        const requestBody = {
            sessionId,
            args: "",
        };
        const response = await app.inject({
            method: "POST",
            url: "/command/tools",
            payload: requestBody,
            headers: {
                "Content-Type": "application/json",
            },
        });
        expect(response.statusCode).toBe(200);
        const responseBody = JSON.parse(response.body);
        console.log(JSON.stringify(responseBody, null, 4));
        expect(responseBody.success).toBe(true);
        expect(responseBody.itemData).toBeDefined();
        expect(responseBody.itemData.type).toBe("info");
        expect(typeof responseBody.itemData.text).toBe("string");
    });
});
//# sourceMappingURL=registertoolsRoute.test.js.map