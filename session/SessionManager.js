import { createId, createSession } from "./sessions.js";
export class SessionManager {
    createId() {
        return createId();
    }
    listSessions() {
        return Array.from(this.sessions.keys());
    }
    createSession(cwd, argv) {
        return createSession(cwd, argv);
    }
    cwdtosession = new Map();
    sessions = new Map();
    getSession(sessionId) {
        return this.sessions.get(sessionId);
    }
    deleteSession(sessionId) {
        const session = this.sessions.get(sessionId);
        if (session) {
            this.sessions.delete(sessionId);
            const sessions = this.cwdtosession.get(session.cwd);
            if (sessions) {
                sessions.delete(session);
            }
        }
    }
    setSession(sessionId, session) {
        session.sessionId = sessionId;
        this.sessions.set(sessionId, session);
        const sessions = this.cwdtosession.get(session.cwd);
        if (sessions) {
            sessions.add(session);
        }
        else {
            this.cwdtosession.set(session.cwd, new Set([session]));
        }
    }
    findSessionsByCwd(cwd) {
        const matchingSessions = [];
        for (const session of this.sessions.values()) {
            if (session.cwd === cwd) {
                matchingSessions.push(session);
            }
        }
        return matchingSessions;
    }
}
//# sourceMappingURL=SessionManager.js.map