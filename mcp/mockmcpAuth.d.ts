import type { HistoryItem } from "@qwen-code/qwen-code/dist/src/ui/types.js";
export declare function mockmcpAuth(cwd: string, argv: string[], args?: string): Promise<ReadableStream<{
    type?: string;
    messageType?: string;
    content?: string;
    itemData?: Omit<HistoryItem, "id">;
    baseTimestamp?: number;
}>>;
//# sourceMappingURL=mockmcpAuth.d.ts.map