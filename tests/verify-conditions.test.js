import SemanticReleaseError from "@semantic-release/error";
import fs from "node:fs";
import { verifyConditions } from "../lib";
import { createTestProject } from "./helpers/create-test-project";

describe("verifyConditions", () => {
  it("should return SemanticReleaseError if mix.exs is missing", async () => {
    expect.assertions(2);

    const { cwd, path } = createTestProject();
    fs.rmSync(path);

    try {
      await verifyConditions({}, { cwd });
    } catch (e) {
      expect(e).toBeInstanceOf(SemanticReleaseError);
      expect(e.code).toBe("ENOPROJECT");
    }
  });

  it("should return SemanticReleaseError if there is no version defined in mix.exs", async () => {
    expect.assertions(4);

    for (let asAttribute of [false, true]) {
      const { cwd, path, content } = createTestProject(
        "REMOVE_LINE",
        asAttribute,
      );
      fs.writeFileSync(path, content.replace(/^.*REMOVE_LINE.*\n/m, ""));

      try {
        await verifyConditions({}, { cwd });
      } catch (e) {
        expect(e).toBeInstanceOf(SemanticReleaseError);
        expect(e.code).toBe("ENOVERSION");
      }
    }
  });

  it("should return SemanticReleaseError if the version defined in mix.exs is not parseable", async () => {
    expect.assertions(4);

    for (let asAttribute of [false, true]) {
      const { cwd } = createTestProject(null, asAttribute);

      try {
        await verifyConditions({}, { cwd });
      } catch (e) {
        expect(e).toBeInstanceOf(SemanticReleaseError);
        expect(e.code).toBe("ENOVERSION");
      }
    }
  });
});
