import type { CommandContext } from "@qwen-code/qwen-code/dist/src/ui/commands/types.js";
import { Config } from "@qwen-code/qwen-code-core/dist/src/config/config.js";
import type { HistoryItem } from "@qwen-code/qwen-code/dist/src/ui/types.js";
import type { SessionManager } from "../session/sessions.js";
export declare function mockmcp(sessionId: string, sessionManager: SessionManager, args?: string): Promise<{
    type?: string;
    messageType?: string;
    content?: string;
}>;
export declare function mockmcpList(sessionId: string, sessionManager: SessionManager, args?: string): Promise<{
    type?: string;
    messageType?: string;
    content?: string;
}>;
export declare function createcontext(config: Config, addItem: (itemData: Omit<HistoryItem, "id">, baseTimestamp: number) => number): CommandContext;
//# sourceMappingURL=mock-mcp.d.ts.map