import type { CommandContext } from "@qwen-code/qwen-code/dist/src/ui/commands/types.js";
import { Config } from "@qwen-code/qwen-code-core/dist/src/config/config.js";
import type { HistoryItem } from "@qwen-code/qwen-code/dist/src/ui/types.js";
import type { SessionManager } from "../session/SessionManager.js";
export declare function mocktools(
  sessionId: string,
  sessionManager: SessionManager,
  args?: string,
): Promise<{
  itemData?: Omit<HistoryItem, "id">;
  baseTimestamp?: number;
}>;
export declare function createcontext(
  config: Config,
  addItem: (itemData: Omit<HistoryItem, "id">, baseTimestamp: number) => number,
): CommandContext;
//# sourceMappingURL=mock-tools.d.ts.map
