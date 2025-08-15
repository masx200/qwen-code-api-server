import type { SessionStatsState } from "@qwen-code/qwen-code/dist/src/ui/contexts/SessionContext.js";
import { UiTelemetryService } from "@qwen-code/qwen-code-core/dist/src/telemetry/uiTelemetry.js";
export const sessions = new Map<string, SessionStatsState>();
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
    metrics: uiTelemetryService.getMetrics(),
    lastPromptTokenCount: uiTelemetryService.getLastPromptTokenCount(),
    promptCount: 0,
  };
}
export function deleteSession(sessionId: string) {
  sessions.delete(sessionId);
}
export function getSession(sessionId: string) {
  return sessions.get(sessionId);
}
export class SessionManager {
  listSessions() {
    return Array.from(this.sessions.keys());
  }
  createSession() {
    return createSession();
  }
  sessions = new Map<string, SessionStatsState>();
  getSession(sessionId: string) {
    return this.sessions.get(sessionId);
  }
  deleteSession(sessionId: string) {
    this.sessions.delete(sessionId);
  }
  setSession(sessionId: string, session: SessionStatsState) {
    this.sessions.set(sessionId, session);
  }
}
