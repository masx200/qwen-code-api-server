import type { SessionStatsState } from "@qwen-code/qwen-code/dist/src/ui/contexts/SessionContext.js";
export declare const sessions: Map<string, SessionStatsState>;
export declare function createId(): string;
export declare function createSession(): SessionStatsState;
export declare function deleteSession(sessionId: string): void;
export declare function getSession(
  sessionId: string,
): SessionStatsState | undefined;
export declare class SessionManager {
  sessionShellAllowlist: Map<string, Set<string>>;
  createId(): string;
  listSessions(): string[];
  createSession(): SessionStatsState;
  sessions: Map<string, SessionStatsState>;
  getSession(sessionId: string): SessionStatsState | undefined;
  deleteSession(sessionId: string): void;
  setSession(sessionId: string, session: SessionStatsState): void;
}
//# sourceMappingURL=sessions.d.ts.map
