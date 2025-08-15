import { quitCommand } from "@qwen-code/qwen-code/dist/src/ui/commands/quitCommand.js";
export async function mockQuit(sessionId, sessionManager) {
    const context = {
        session: {
            stats: sessionManager.sessions.get(sessionId),
            sessionShellAllowlist: sessionManager.sessionShellAllowlist.get(sessionId),
        },
        services: {
            settings: {
                merged: {
                    selectedAuthType: "openai",
                },
            },
            config: {},
        },
        ui: {},
    };
    if (typeof quitCommand.action === "function") {
        return (await quitCommand.action(context, ""));
    }
    else {
        throw new Error("quitCommand.action is not a function");
    }
}
//# sourceMappingURL=mock-quit.js.map