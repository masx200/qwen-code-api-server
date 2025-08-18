import type { HistoryItem } from "@qwen-code/qwen-code/dist/src/ui/types.js";
import type { SessionManager } from "../session/sessions.js";
export declare function mockmcpAuth(sessionId: string, sessionManager: SessionManager, args?: string): Promise<ReadableStream<{
    type?: string;
    messageType?: string;
    content?: string;
    itemData?: Omit<HistoryItem, "id">;
    baseTimestamp?: number;
}>>;
//# sourceMappingURL=mockmcpAuth.d.ts.map