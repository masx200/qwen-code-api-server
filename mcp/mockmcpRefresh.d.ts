import type { HistoryItem } from "@qwen-code/qwen-code/dist/src/ui/types.js";
import type { SessionManager } from "../session/SessionManager.js";
export declare function mockmcpRefresh(
  sessionId: string,
  sessionManager: SessionManager,
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
//# sourceMappingURL=mockmcpRefresh.d.ts.map
