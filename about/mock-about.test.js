import { mockAbout } from "./mock-about.js";
import { expect, test } from "vitest";
test("mockAbout", async () => {
  const { itemData, baseTimestamp } = await mockAbout("glm-4.5");
  console.log({ itemData, baseTimestamp });
  expect(itemData).toBeDefined();
  expect(baseTimestamp).toBeTypeOf("number");
  if (typeof itemData === "object") {
    expect(itemData.type).toBeTypeOf("string");
    expect(itemData.cliVersion).toBeTypeOf("string");
    expect(itemData.osVersion).toBeTypeOf("string");
    expect(itemData.sandboxEnv).toBeTypeOf("string");
    expect(itemData.modelVersion).toBeTypeOf("string");
    expect(itemData.selectedAuthType).toBeTypeOf("string");
    expect(itemData.gcpProject).toBeTypeOf("string");
    expect(itemData.modelVersion).toEqual("glm-4.5");
  } else {
    throw new Error("itemData is not an object");
  }
});
//# sourceMappingURL=mock-about.test.js.map
