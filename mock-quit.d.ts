import type { HistoryItemAbout } from "@qwen-code/qwen-code/dist/src/ui/types.js";
import type { SessionManager } from "./sessions.js";
export declare function mockQuit(model: string, sessionId: string, sessionManager: SessionManager): Promise<{
    itemData?: HistoryItemAbout;
    baseTimestamp?: number;
}>;
//# sourceMappingURL=mock-quit.d.ts.map