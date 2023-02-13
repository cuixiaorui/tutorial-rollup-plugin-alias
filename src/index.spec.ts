import { describe, it, expect } from "vitest";
import { alias } from ".";

describe("entries is object", () => {
  it("should replace alias value when match", () => {
    const aliasObj: any = alias({
      entries: {
        "@": "./src/utils",
        utils: "./src/utils",
      },
    });

    expect(aliasObj.resolveId("@/add")).toBe("./src/utils/add.js");
    expect(aliasObj.resolveId("utils/add")).toBe("./src/utils/add.js");
  });

  it("should does not replace alias value when does not match", () => {
    const aliasObj: any = alias({
      entries: {
        "@": "./src/utils",
      },
    });

    expect(aliasObj.resolveId("./src/utils/add.js")).toBe("./src/utils/add.js");
  });
});

describe("entries is array", () => {
  it("should replace alias value when match", () => {
    const aliasObj: any = alias({
      entries: [
        {
          find: "@",
          replacement: "./src/utils",
        },
        {
          find: "utils",
          replacement: "./src/utils",
        },
      ],
    });

    expect(aliasObj.resolveId("@/add")).toBe("./src/utils/add.js");
    expect(aliasObj.resolveId("utils/add")).toBe("./src/utils/add.js");
  });
  it("should replace alias value when find is RegExp", () => {
    const aliasObj: any = alias({
      entries: [{ find: /^(.*)\.js$/, replacement: "$1.alias" }],
    });

    expect(aliasObj.resolveId("add.js")).toBe("add.alias.js");
  });

  it("should does not replace alias value when does not match", () => {
    const aliasObj: any = alias({
      entries: {
        "@": "./src/utils",
      },
    });

    expect(aliasObj.resolveId("./src/utils/add.js")).toBe("./src/utils/add.js");
  });
});
