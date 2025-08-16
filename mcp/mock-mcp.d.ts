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
export declare function mockmcpRefresh(
  cwd: string,
  argv: string[],
  args?: string,
): Promise<[
  {
    itemData?: Omit<HistoryItem, "id">;
    baseTimestamp?: number;
  },
  {
    type?: string;
    messageType?: string;
    content?: string;
  },
]>;
export declare function createcontext(
  config: Config,
  addItem: (itemData: Omit<HistoryItem, "id">, baseTimestamp: number) => number,
): CommandContext;
export declare function mockmcpAuth(
  cwd: string,
  argv: string[],
  args?: string,
): Promise<
  ReadableStream<{
    type?: string;
    messageType?: string;
    content?: string;
    itemData?: Omit<HistoryItem, "id">;
    baseTimestamp?: number;
  }>
>;
//# sourceMappingURL=mock-mcp.d.ts.map
