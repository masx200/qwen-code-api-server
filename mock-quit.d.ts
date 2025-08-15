import type { SessionManager } from "./sessions.js";
export declare function mockQuit(sessionId: string, sessionManager: SessionManager): Promise<{
    type: string;
    messages: {
        type: string;
        text?: string | undefined;
        id: number;
        duration?: undefined | string;
    }[];
}>;
//# sourceMappingURL=mock-quit.d.ts.map