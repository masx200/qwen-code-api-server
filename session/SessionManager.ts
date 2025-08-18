import { createId, createSession, type SessionContext } from "./sessions.js";

export class SessionManager {
  createId() {
    return createId();
  }
  listSessions() {
    return Array.from(this.sessions.keys());
  }
  createSession(cwd: string, argv: string[]): Promise<SessionContext> {
    return createSession(cwd, argv);
  }
  cwdtosession = new Map<string, Set<SessionContext>>();

  sessions = new Map<string, SessionContext>();
  getSession(sessionId: string): SessionContext | undefined {
    return this.sessions.get(sessionId);
  }
  deleteSession(sessionId: string) {
    const session = this.sessions.get(sessionId);
    if (session) {
      this.sessions.delete(sessionId);
      const sessions = this.cwdtosession.get(session.cwd);
      if (sessions) {
        sessions.delete(session);
      }
    }
  }
  setSession(sessionId: string, session: SessionContext) {
    session.sessionId = sessionId;
    this.sessions.set(sessionId, session);
    const sessions = this.cwdtosession.get(session.cwd);
    if (sessions) {
      sessions.add(session);
    } else {
      this.cwdtosession.set(session.cwd, new Set([session]));
    }
  }

  /**
   * 根据cwd查找对应的session
   * @param cwd 要查找的工作目录路径
   * @returns 返回匹配该cwd的session数组，可能包含多个session
   */
  findSessionsByCwd(cwd: string): SessionContext[] {
    const matchingSessions: SessionContext[] = [];

    for (const session of this.sessions.values()) {
      if (session.cwd === cwd) {
        matchingSessions.push(session);
      }
    }

    return matchingSessions;
  }
}
