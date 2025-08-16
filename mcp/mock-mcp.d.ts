import type { CommandContext } from "@qwen-code/qwen-code/dist/src/ui/commands/types.js";
import { Config } from "@qwen-code/qwen-code-core/dist/src/config/config.js";
import type { HistoryItem } from "@qwen-code/qwen-code/dist/src/ui/types.js";
export declare function mockmcp(
  cwd: string,
  argv: string[],
  args?: string,
): Promise<{
  type?: string;
  messageType?: string;
  content?: string;
}>;
export declare function mockmcpList(
  cwd: string,
  argv: string[],
  args?: string,
): Promise<{
  type?: string;
  messageType?: string;
  content?: string;
}>;
export declare function createcontext(
  config: Config,
  addItem: (itemData: Omit<HistoryItem, "id">, baseTimestamp: number) => number,
): CommandContext;
//# sourceMappingURL=mock-mcp.d.ts.map
