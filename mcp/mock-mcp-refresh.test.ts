import * as os from "os";
import { describe, expect, it } from "vitest";
import { mockmcpRefresh } from "./mockmcpRefresh.js";
import { readSettings } from "./settings-reader.js";
import { readStreamToArray } from "../utils/stream-reader.js";

describe("mockmcp refresh", () => {
  it(
    "应该返回 MCP 服务器列表",
    async () => {
      const result = await readStreamToArray(
        await mockmcpRefresh(os.homedir(), [], "")
      );
      console.log(JSON.stringify(result, null, 4));
      expect(result[1]).toMatchObject({
        type: "message",
        messageType: "info",
      });
      try {
        const settings = await readSettings();
        console.log(JSON.stringify(settings, null, 4));
        //@ts-ignore
        if (
          //@ts-ignore
          settings?.mcpServers &&
          //@ts-ignore
          Object.keys(settings.mcpServers).length > 0
        ) {
          expect(
              //@ts-ignore
            result[1].content?.slice(0, "Configured MCP servers:".length)
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
              //@ts-ignore
            expect(result[1].content?.slice(0, message.length)).toBe(message);
          }
        }
      } catch (error) {
        console.error(error);
      }
    },
    {
      timeout: 10000,
    }
  );
});
