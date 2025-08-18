import type { CommandContext } from "@qwen-code/qwen-code/dist/src/ui/commands/types.js";
export declare function createId(): string;
export interface SessionContext {
  sessionId: string;
  cwd: string;
  argv: string[];
  session: CommandContext["session"];
  services: CommandContext["services"];
}
export declare function createSession(
  cwd: string,
  argv: string[],
): Promise<SessionContext>;
//# sourceMappingURL=sessions.d.ts.map
