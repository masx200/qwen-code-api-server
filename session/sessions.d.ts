import type { CommandContext } from "@qwen-code/qwen-code/dist/src/ui/commands/types.js";
export declare function createId(): string;
export interface SessionContext {
    session: CommandContext["session"];
    services: CommandContext["services"];
}
export declare function createSession(cwd: string, argv: string[]): Promise<SessionContext>;
export declare class SessionManager {
    createId(): string;
    listSessions(): string[];
    createSession(cwd: string, argv: string[]): Promise<SessionContext>;
    sessions: Map<string, SessionContext>;
    getSession(sessionId: string): SessionContext | undefined;
    deleteSession(sessionId: string): void;
    setSession(sessionId: string, session: SessionContext): void;
}
//# sourceMappingURL=sessions.d.ts.map