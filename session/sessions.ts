import { Config } from "@qwen-code/qwen-code-core/dist/src/config/config.js";
import { UiTelemetryService } from "@qwen-code/qwen-code-core/dist/src/telemetry/uiTelemetry.js";
import type { CommandContext } from "@qwen-code/qwen-code/dist/src/ui/commands/types.js";
import { creategeminiconfig } from "../mcp/gemini.js";

export function createId() {
  return Array(5)
    .fill(undefined)
    .map(() => Math.random().toString(36).substring(2).padStart(12, "0"))
    .join("");
}
export interface SessionContext {
  cwd: string;
  argv: string[];
  session: CommandContext["session"];
  services: CommandContext["services"];
}
export async function createSession(
  cwd: string,
  argv: string[]
): Promise<SessionContext> {
  const sessionShellAllowlist = new Set<string>();
  const config = (await creategeminiconfig(cwd, argv)) as Config;
  const uiTelemetryService = new UiTelemetryService();

  return {
    argv,
    cwd,
    session: {
      stats: {
        sessionStartTime: new Date(),

        get metrics() {
          return uiTelemetryService.getMetrics();
        },
        get lastPromptTokenCount() {
          return uiTelemetryService.getLastPromptTokenCount();
        },
        promptCount: 0,
      },
      sessionShellAllowlist: sessionShellAllowlist,
    },
    services: {
      settings: {
        merged: {
          selectedAuthType: "openai",
        },
      },
      config: config,
    },
  } as SessionContext;
}
