import { jest } from "@jest/globals";
import fs from "node:fs";
import { prepare } from "../lib";
import { versionRegex } from "../lib/helpers/regexes";
import { createTestProject } from "./helpers/create-test-project";
import { readProjectVersion } from "./helpers/read-project-version";

describe("prepare", () => {
  it("should not error in good conditions", async () => {
    expect.assertions(2);

    for (let asAttribute of [false, true]) {
      const { cwd } = createTestProject("0.0.0-dev", asAttribute);

      expect(
        async () =>
          await prepare(
            {},
            {
              cwd,
              nextRelease: { version: "1.0.0" },
            },
          ),
      ).not.toThrow();
    }
  });

  it("should update version in mix.exs", async () => {
    expect.assertions(4);

    for (let asAttribute of [false, true]) {
      const { cwd, path } = createTestProject("0.0.1-dev", asAttribute);

      await prepare(
        {},
        {
          cwd,
          nextRelease: { version: "1.0.0" },
        },
      );

      const packageContent = fs.readFileSync(path, { encoding: "utf-8" });

      expect(packageContent).toMatch(versionRegex);
      const { version } = readProjectVersion(packageContent);
      expect(version).toBe("1.0.0");
    }
  });

  it("should preserve indentation and newline", async () => {
    expect.assertions(2);

    for (let asAttribute of [false, true]) {
      const { cwd, path, content } = createTestProject(
        "0.0.0-tobereplaced",
        asAttribute,
      );

      await prepare(
        {},
        {
          cwd,
          nextRelease: { version: "1.0.0" },
        },
      );

      const packageContent = fs.readFileSync(path, { encoding: "utf-8" });
      expect(packageContent).toBe(
        content.replace("0.0.0-tobereplaced", "1.0.0"),
      );
    }
  });

  it("should call the logger with the updated version and cwd", async () => {
    expect.assertions(2);

    for (let asAttribute of [false, true]) {
      const { cwd } = createTestProject("0.0.1-dev", asAttribute);

      const logger = { log: jest.fn() };

      await prepare(
        {},
        {
          cwd,
          nextRelease: { version: "1.0.0" },
          logger,
        },
      );

      expect(logger.log).toHaveBeenCalledWith(
        "Write version %s to mix.exs in %s",
        "1.0.0",
        cwd,
      );
    }
  });
});
