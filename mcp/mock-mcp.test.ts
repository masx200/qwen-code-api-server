import { describe, expect, it } from "vitest";
import { mockmcp, mockmcpList } from "./mock-mcp.js";
import * as os from "os";

describe("mockmcpList", () => {
  it("应该返回 MCP 服务器列表", async () => {
    const result = await mockmcp(os.homedir(), [], "");
    console.log(result);
    expect(result).toMatchObject({
      type: "message",
      messageType: "info",
    });
  });

  it("应该正确处理空的服务器列表", async () => {
    const result = await mockmcpList(os.homedir(), [], "");
    console.log(result);
    expect(result).toMatchObject({
      type: "message",
      messageType: "info",
    });
  });
});
