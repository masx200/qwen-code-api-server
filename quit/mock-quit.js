import { quitCommand } from "@qwen-code/qwen-code/dist/src/ui/commands/quitCommand.js";
export async function mockQuit(sessionId, sessionManager) {
    const session = sessionManager.sessions.get(sessionId);
    if (!session) {
        throw new Error("Session not found");
    }
    const context = {
        session: {
            stats: session.session.stats,
            sessionShellAllowlist: session.session.sessionShellAllowlist,
        },
        services: {
            settings: {
                merged: {
                    selectedAuthType: "openai",
                },
            },
            config: session.services.config,
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