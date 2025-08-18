import yargs from "yargs/yargs";
import process from "node:process";
import { getCliVersion } from "@qwen-code/qwen-code/dist/src/utils/version.js";
export async function parseArguments(argv) {
  const yargsInstance = yargs(argv)
    .scriptName("qwen")
    .usage(
      "$0 [options]",
      "Qwen Code - Launch an interactive CLI, use -p/--prompt for non-interactive mode",
    )
    .option("model", {
      alias: "m",
      type: "string",
      description: `Model`,
      default: process.env.GEMINI_MODEL,
    })
    .option("prompt", {
      alias: "p",
      type: "string",
      description: "Prompt. Appended to input on stdin (if any).",
    })
    .option("prompt-interactive", {
      alias: "i",
      type: "string",
      description:
        "Execute the provided prompt and continue in interactive mode",
    })
    .option("sandbox", {
      alias: "s",
      type: "boolean",
      description: "Run in sandbox?",
    })
    .option("sandbox-image", {
      type: "string",
      description: "Sandbox image URI.",
    })
    .option("debug", {
      alias: "d",
      type: "boolean",
      description: "Run in debug mode?",
      default: false,
    })
    .option("all-files", {
      alias: ["a"],
      type: "boolean",
      description: "Include ALL files in context?",
      default: false,
    })
    .option("all_files", {
      type: "boolean",
      description: "Include ALL files in context?",
      default: false,
    })
    .deprecateOption(
      "all_files",
      "Use --all-files instead. We will be removing --all_files in the coming weeks.",
    )
    .option("show-memory-usage", {
      type: "boolean",
      description: "Show memory usage in status bar",
      default: false,
    })
    .option("show_memory_usage", {
      type: "boolean",
      description: "Show memory usage in status bar",
      default: false,
    })
    .deprecateOption(
      "show_memory_usage",
      "Use --show-memory-usage instead. We will be removing --show_memory_usage in the coming weeks.",
    )
    .option("yolo", {
      alias: "y",
      type: "boolean",
      description:
        "Automatically accept all actions (aka YOLO mode, see https://www.youtube.com/watch?v=xvFZjo5PgG0 for more details)?",
      default: false,
    })
    .option("telemetry", {
      type: "boolean",
      description:
        "Enable telemetry? This flag specifically controls if telemetry is sent. Other --telemetry-* flags set specific values but do not enable telemetry on their own.",
    })
    .option("telemetry-target", {
      type: "string",
      choices: ["local", "gcp"],
      description:
        "Set the telemetry target (local or gcp). Overrides settings files.",
    })
    .option("telemetry-otlp-endpoint", {
      type: "string",
      description:
        "Set the OTLP endpoint for telemetry. Overrides environment variables and settings files.",
    })
    .option("telemetry-log-prompts", {
      type: "boolean",
      description:
        "Enable or disable logging of user prompts for telemetry. Overrides settings files.",
    })
    .option("telemetry-outfile", {
      type: "string",
      description: "Redirect all telemetry output to the specified file.",
    })
    .option("checkpointing", {
      alias: "c",
      type: "boolean",
      description: "Enables checkpointing of file edits",
      default: false,
    })
    .option("experimental-acp", {
      type: "boolean",
      description: "Starts the agent in ACP mode",
    })
    .option("allowed-mcp-server-names", {
      type: "array",
      string: true,
      description: "Allowed MCP server names",
    })
    .option("extensions", {
      alias: "e",
      type: "array",
      string: true,
      description:
        "A list of extensions to use. If not provided, all extensions are used.",
    })
    .option("list-extensions", {
      alias: "l",
      type: "boolean",
      description: "List all available extensions and exit.",
    })
    .option("ide-mode-feature", {
      type: "boolean",
      description: "Run in IDE mode?",
    })
    .option("openai-logging", {
      type: "boolean",
      description:
        "Enable logging of OpenAI API calls for debugging and analysis",
    })
    .option("openai-api-key", {
      type: "string",
      description: "OpenAI API key to use for authentication",
    })
    .option("openai-base-url", {
      type: "string",
      description: "OpenAI base URL (for custom endpoints)",
    })
    .option("proxy", {
      type: "string",
      description:
        "Proxy for gemini client, like schema://user:password@host:port",
    })
    .option("include-directories", {
      type: "array",
      string: true,
      description:
        "Additional directories to include in the workspace (comma-separated or multiple --include-directories)",
      coerce: (dirs) =>
        dirs.flatMap((dir) => dir.split(",").map((d) => d.trim())),
    })
    .option("load-memory-from-include-directories", {
      type: "boolean",
      description:
        "If true, when refreshing memory, QWEN.md files should be loaded from all directories that are added. If false, QWEN.md files should only be loaded from the primary working directory.",
      default: false,
    })
    .version(await getCliVersion())
    .alias("v", "version")
    .help()
    .alias("h", "help")
    .strict()
    .check((argv) => {
      if (argv.prompt && argv.promptInteractive) {
        throw new Error(
          "Cannot use both --prompt (-p) and --prompt-interactive (-i) together",
        );
      }
      return true;
    });
  yargsInstance.wrap(yargsInstance.terminalWidth());
  const result = yargsInstance.parseSync();
  return result;
}
//# sourceMappingURL=parseArguments.js.map
