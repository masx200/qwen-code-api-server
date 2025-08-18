import { aboutCommand } from "@qwen-code/qwen-code/dist/src/ui/commands/aboutCommand.js";
export async function mockAbout(model) {
    const result = {};
    const context = {
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
                return 0;
            },
        },
    };
    if (typeof aboutCommand.action === "function") {
        await aboutCommand.action(context, "");
    }
    else {
        throw new Error("aboutCommand.action is not a function");
    }
    return result;
}
//# sourceMappingURL=mock-about.js.map