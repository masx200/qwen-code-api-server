import os from "node:os";
import { describe, expect, test } from "vitest";
import { SessionManager } from "../session/SessionManager.js";
import { mockQuit } from "./mock-quit.js";
describe("mockQuit", () => {
  test("should return expected structure when quitCommand.action is a function", async () => {
    const sessionManager = new SessionManager();
    const sessionId = sessionManager.createId();
    const cwd = os.homedir();
    const argv = [];
    const mockSession = await sessionManager.createSession(cwd, argv);
    sessionManager.sessions.set(sessionId, mockSession);
    const result = await mockQuit(sessionId, sessionManager);
    console.log(result);
    expect(result).toBeDefined();
    expect(result.type).toBe("quit");
    expect(result.messages).toBeInstanceOf(Array);
    expect(result.messages).toHaveLength(2);
    expect(result.messages[0]?.id).toBeTypeOf("number");
    expect(result.messages[0]?.text).toEqual("/quit");
    expect(result.messages[0]?.type).toEqual("user");
    expect(result.messages[1]?.id).toBeTypeOf("number");
    expect(result.messages[1]?.duration).toBeTypeOf("string");
    expect(result.messages[1]?.type).toEqual("quit");
  });
});
//# sourceMappingURL=mock-quit.test.js.map
