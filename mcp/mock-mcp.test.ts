import { describe, it, expect } from "vitest";
import { mockmcp, mockmcpList } from "./mock-mcp.js";
import * as os from "os";

describe("mockmcpList", () => {
  it("应该返回 MCP 服务器列表", async () => {
    const result = await mockmcp(os.homedir(),[]);
    console.log(result);
    expect(result).toEqual({
      type: "response",
      messageType: "mcp_list",
      content: JSON.stringify([
        { id: "server1", name: "Test MCP Server 1", status: "connected" },
        { id: "server2", name: "Test MCP Server 2", status: "disconnected" },
      ]),
    });
  });

  it("应该正确处理空的服务器列表", async () => {
    const result = await mockmcpList(os.homedir(),[]);
    console.log(result);
    expect(result).toEqual({
      type: "response",
      messageType: "mcp_list",
      content: JSON.stringify([]),
    });
  });
});
