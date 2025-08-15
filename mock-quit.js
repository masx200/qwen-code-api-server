import { quitCommand } from "@qwen-code/qwen-code/dist/src/ui/commands/quitCommand.js";
export async function mockQuit(model, sessionId, sessionManager) {
    const result = {};
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
            config: {
                getModel() {
                    return model;
                },
            },
        },
        ui: {
            addItem(itemData, baseTimestamp) {
                result.itemData = itemData;
                result.baseTimestamp = baseTimestamp;
            },
        },
    };
    if (typeof quitCommand.action === "function") {
        await quitCommand.action(context, "");
    }
    else {
        throw new Error("quitCommand.action is not a function");
    }
    return result;
}
//# sourceMappingURL=mock-quit.js.map