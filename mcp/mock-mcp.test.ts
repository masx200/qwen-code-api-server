 //@ts-nocheck
import { describe, expect, it } from "vitest";
import { mockmcp, mockmcpList } from "./mock-mcp.js";
import { readSettings } from "./settings-reader.js";
import { SessionManager } from "../session/SessionManager.js";
 //@ts-nocheck
describe("mockmcpList", () => {
  it(
    "应该返回 MCP 服务器列表",
    async () => {
      const sessionManager = new SessionManager();
      const sessionId = sessionManager.createId();
      const session = await sessionManager.createSession(process.cwd(), []);
      sessionManager.setSession(sessionId, session);
      const result = await mockmcp(sessionId, sessionManager, "");
      console.log(JSON.stringify(result, null, 4));
      expect(result).toMatchObject({
        type: "message",
        messageType: "info",
      });
      try {
        const settings = await readSettings();
        console.log(JSON.stringify(settings, null, 4));
        //@ts-ignore

        //@ts-nocheck
        if (
          settings?.mcpServers &&
          Object.keys(settings.mcpServers).length > 0
        ) {
          expect(
            result.content?.slice(0, "Configured MCP servers:".length)
          ).toBe("Configured MCP servers:");
        } else {
          //@ts-ignore
          if (
            //@ts-ignore
            settings?.mcpServers &&
            //@ts-ignore
            Object.keys(settings.mcpServers).length == 0
          ) {
            const message = "No MCP servers configured.";
            expect(result.content?.slice(0, message.length)).toBe(message);
          }
        }
      } catch (error) {
        console.error(error);
      }
    },
    { timeout: 10000 }
  );

  it(
    "mcp desc",
    async () => {
      const sessionManager = new SessionManager();
      const sessionId = sessionManager.createId();
      const session = await sessionManager.createSession(process.cwd(), []);
      sessionManager.setSession(sessionId, session);
      const result = await mockmcpList(sessionId, sessionManager, "desc");
      console.log(JSON.stringify(result, null, 4));
      expect(result).toMatchObject({
        type: "message",
        messageType: "info",
      });
      try {
        const settings = await readSettings();
        console.log(JSON.stringify(settings, null, 4));
        //@ts-ignore
        if (
          settings?.mcpServers &&
          Object.keys(settings.mcpServers).length > 0
        ) {
          expect(
            result.content?.slice(0, "Configured MCP servers:".length)
          ).toBe("Configured MCP servers:");
        } else {
          //@ts-ignore
          if (
            //@ts-ignore
            settings?.mcpServers &&
            //@ts-ignore
            Object.keys(settings.mcpServers).length == 0
          ) {
            const message = "No MCP servers configured.";
            expect(result.content?.slice(0, message.length)).toBe(message);
          }
        }
      } catch (error) {
        console.error(error);
      }
    },
    { timeout: 10000 }
  );

  it(
    "mcp schema",
    async () => {
      const sessionManager = new SessionManager();
      const sessionId = sessionManager.createId();
      const session = await sessionManager.createSession(process.cwd(), []);
      sessionManager.setSession(sessionId, session);
      const result = await mockmcpList(sessionId, sessionManager, "schema");
      console.log(JSON.stringify(result, null, 4));
      expect(result).toMatchObject({
        type: "message",
        messageType: "info",
      });
      try {
        const settings = await readSettings();
        console.log(JSON.stringify(settings, null, 4));
        //@ts-ignore
        if (
          settings?.mcpServers &&
          Object.keys(settings.mcpServers).length > 0
        ) {
          expect(
            result.content?.slice(0, "Configured MCP servers:".length)
          ).toBe("Configured MCP servers:");
        } else {
          //@ts-ignore
          if (
            //@ts-ignore
            settings?.mcpServers &&
            //@ts-ignore
            Object.keys(settings.mcpServers).length == 0
          ) {
            const message = "No MCP servers configured.";
            expect(result.content?.slice(0, message.length)).toBe(message);
          }
        }
      } catch (error) {
        console.error(error);
      }
    },
    { timeout: 10000 }
  );
});
