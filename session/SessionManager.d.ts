import { type SessionContext } from "./sessions.js";
export declare class SessionManager {
  createId(): string;
  listSessions(): string[];
  createSession(cwd: string, argv: string[]): Promise<SessionContext>;
  cwdtosession: Map<string, Set<SessionContext>>;
  sessions: Map<string, SessionContext>;
  getSession(sessionId: string): SessionContext | undefined;
  deleteSession(sessionId: string): void;
  setSession(sessionId: string, session: SessionContext): void;
  findSessionsByCwd(cwd: string): SessionContext[];
}
//# sourceMappingURL=SessionManager.d.ts.map
