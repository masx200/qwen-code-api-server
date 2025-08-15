import { AuthType, Config, sessionId } from "@qwen-code/qwen-code-core";
import { getOauthClient } from "@qwen-code/qwen-code-core";
import { loadCliConfig } from "@qwen-code/qwen-code/dist/src/config/config.js";
import { loadExtensions } from "@qwen-code/qwen-code/dist/src/config/extension.js";
import { SettingScope, loadSettings, } from "@qwen-code/qwen-code/dist/src/config/settings.js";
import { setupUnhandledRejectionHandler, validateDnsResolutionOrder, } from "@qwen-code/qwen-code/dist/src/gemini.js";
import { setMaxSizedBoxDebugging } from "@qwen-code/qwen-code/dist/src/ui/components/shared/MaxSizedBox.js";
import { cleanupCheckpoints } from "@qwen-code/qwen-code/dist/src/utils/cleanup.js";
import { start_sandbox } from "@qwen-code/qwen-code/dist/src/utils/sandbox.js";
import dns from "node:dns";
import { parseArguments } from "./parseArguments.js";
export async function creategeminiconfig(cwd, argv) {
    setupUnhandledRejectionHandler();
    const workspaceRoot = cwd; //process.cwd();
    const settings = loadSettings(workspaceRoot);
    await cleanupCheckpoints();
    if (settings.errors.length > 0) {
        for (const error of settings.errors) {
            let errorMessage = `Error in ${error.path}: ${error.message}`;
            //@ts-ignore
            if (!process.env.NO_COLOR) {
                errorMessage = `\x1b[31m${errorMessage}\x1b[0m`;
            }
            console.error(errorMessage);
            console.error(`Please fix ${error.path} and try again.`);
        }
        throw new Error("Invalid settings");
        // process.exit(1);
    }
    const cliargv = await parseArguments(argv);
    //   const argv = await parseArguments(argv);
    const extensions = loadExtensions(workspaceRoot);
    const config = await loadCliConfig(settings.merged, extensions, sessionId, cliargv //argv
    );
    dns.setDefaultResultOrder(validateDnsResolutionOrder(settings.merged.dnsResolutionOrder));
    //   if (argv.promptInteractive && !process.stdin.isTTY) {
    //     console.error(
    //       "Error: The --prompt-interactive flag is not supported when piping input from stdin."
    //     );
    //     process.exit(1);
    //   }
    if (config.getListExtensions()) {
        console.log("Installed extensions:");
        for (const extension of extensions) {
            console.log(`- ${extension.config.name}`);
        }
        // process.exit(0);
        throw new Error("Listing extensions");
    }
    // Set a default auth type if one isn't set.
    if (!settings.merged.selectedAuthType) {
        //@ts-ignore
        if (process.env.CLOUD_SHELL === "true") {
            settings.setValue(SettingScope.User, "selectedAuthType", AuthType.CLOUD_SHELL);
        }
    }
    setMaxSizedBoxDebugging(config.getDebugMode());
    await config.initialize();
    // Load custom themes from settings
    themeManager.loadCustomThemes(settings.merged.customThemes);
    if (settings.merged.theme) {
        if (!themeManager.setActiveTheme(settings.merged.theme)) {
            // If the theme is not found during initial load, log a warning and continue.
            // The useThemeCommand hook in App.tsx will handle opening the dialog.
            console.warn(`Warning: Theme "${settings.merged.theme}" not found.`);
        }
    }
    // hop into sandbox if we are outside and sandboxing is enabled
    //@ts-ignore
    if (!process.env.SANDBOX) {
        const memoryArgs = settings.merged.autoConfigureMaxOldSpaceSize
            ? getNodeMemoryArgs(config)
            : [];
        const sandboxConfig = config.getSandbox();
        if (sandboxConfig) {
            if (settings.merged.selectedAuthType &&
                !settings.merged.useExternalAuth) {
                // Validate authentication here because the sandbox will interfere with the Oauth2 web redirect.
                try {
                    const err = validateAuthMethod(settings.merged.selectedAuthType);
                    if (err) {
                        throw new Error(err);
                    }
                    await config.refreshAuth(settings.merged.selectedAuthType);
                }
                catch (err) {
                    console.error("Error authenticating:", err);
                    //   process.exit(1);
                    throw err;
                }
            }
            await start_sandbox(sandboxConfig, memoryArgs, config);
            //   process.exit(0);
            throw new Error("Error starting sandbox");
        }
        else {
            // Not in a sandbox and not entering one, so relaunch with additional
            // arguments to control memory usage if needed.
            if (memoryArgs.length > 0) {
                await relaunchWithAdditionalArgs(memoryArgs, argv);
                // process.exit(0);
                throw new Error("Error relaunching with additional args");
            }
        }
    }
    if (settings.merged.selectedAuthType === AuthType.LOGIN_WITH_GOOGLE &&
        config.isBrowserLaunchSuppressed()) {
        // Do oauth before app renders to make copying the link possible.
        await getOauthClient(settings.merged.selectedAuthType, config);
    }
    return config;
}
import { validateAuthMethod } from "@qwen-code/qwen-code/dist/src/config/auth.js";
import { themeManager } from "@qwen-code/qwen-code/dist/src/ui/themes/theme-manager.js";
import os from "node:os";
import v8 from "node:v8";
import { spawn } from "node:child_process";
async function relaunchWithAdditionalArgs(additionalArgs, argv) {
    //   const nodeArgs = [...additionalArgs, ...process.argv.slice(1)];
    const nodeArgs = [...additionalArgs, ...argv];
    const newEnv = { ...process.env, GEMINI_CLI_NO_RELAUNCH: "true" };
    const child = spawn(process.execPath, nodeArgs, {
        stdio: "inherit",
        env: newEnv,
    });
    await new Promise((resolve) => child.on("close", resolve));
    //   process.exit(0);
    throw new Error("Relaunch failed or was cancelled.");
}
function getNodeMemoryArgs(config) {
    const totalMemoryMB = os.totalmem() / (1024 * 1024);
    const heapStats = v8.getHeapStatistics();
    const currentMaxOldSpaceSizeMb = Math.floor(heapStats.heap_size_limit / 1024 / 1024);
    // Set target to 50% of total memory
    const targetMaxOldSpaceSizeInMB = Math.floor(totalMemoryMB * 0.5);
    if (config.getDebugMode()) {
        console.debug(`Current heap size ${currentMaxOldSpaceSizeMb.toFixed(2)} MB`);
    }
    //@ts-ignore
    if (process.env.GEMINI_CLI_NO_RELAUNCH) {
        return [];
    }
    if (targetMaxOldSpaceSizeInMB > currentMaxOldSpaceSizeMb) {
        if (config.getDebugMode()) {
            console.debug(`Need to relaunch with more memory: ${targetMaxOldSpaceSizeInMB.toFixed(2)} MB`);
        }
        return [`--max-old-space-size=${targetMaxOldSpaceSizeInMB}`];
    }
    return [];
}
//# sourceMappingURL=gemini.js.map