import { UiTelemetryService } from "@qwen-code/qwen-code-core/dist/src/telemetry/uiTelemetry.js";
export const sessions = new Map();
export function createId() {
    return Array(5)
        .fill(undefined)
        .map(() => Math.random().toString(36).substring(2))
        .join("");
}
export function createSession() {
    const uiTelemetryService = new UiTelemetryService();
    return {
        sessionStartTime: new Date(),
        get metrics() {
            return uiTelemetryService.getMetrics();
        },
        get lastPromptTokenCount() {
            return uiTelemetryService.getLastPromptTokenCount();
        },
        promptCount: 0,
    };
}
export function deleteSession(sessionId) {
    sessions.delete(sessionId);
}
export function getSession(sessionId) {
    return sessions.get(sessionId);
}
export class SessionManager {
    sessionShellAllowlist = new Map();
    createId() {
        return createId();
    }
    listSessions() {
        return Array.from(this.sessions.keys());
    }
    createSession() {
        return createSession();
    }
    sessions = new Map();
    getSession(sessionId) {
        return this.sessions.get(sessionId);
    }
    deleteSession(sessionId) {
        this.sessions.delete(sessionId);
    }
    setSession(sessionId, session) {
        this.sessions.set(sessionId, session);
    }
}
//# sourceMappingURL=sessions.js.map