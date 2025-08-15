import { describe, expect, test } from "vitest";
import { mockQuit } from "./mock-quit.js";
import { SessionManager } from "../session/sessions.js";

describe("mockQuit", () => {
  test("should return expected structure when quitCommand.action is a function", async () => {
    // Setup mock session manager
    const sessionManager = new SessionManager();
    const sessionId = sessionManager.createId();

    // Create a mock session
    const mockSession = sessionManager.createSession();

    sessionManager.sessions.set(sessionId, mockSession);
    sessionManager.sessionShellAllowlist.set(
      sessionId,
      new Set(["bash", "node"]),
    );

    // Mock the quitCommand.action response

    // Execute the function
    const result = await mockQuit(sessionId, sessionManager);
    console.log(result);
    // Assertions
    expect(result).toBeDefined();
    expect(result.type).toBe("quit");
    expect(result.messages).toBeInstanceOf(Array);
    expect(result.messages).toHaveLength(2);
    expect(result.messages[0]?.id).toBeTypeOf("number");
    expect(result.messages[0]?.text).toEqual("/quit");
    expect(result.messages[0]?.type).toEqual("user");

    // Verify the mock was called with correct context
    expect(result.messages[1]?.id).toBeTypeOf("number");
    expect(result.messages[1]?.duration).toBeTypeOf("string");
    expect(result.messages[1]?.type).toEqual("quit");
  });
});
