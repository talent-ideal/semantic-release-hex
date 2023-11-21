import { jest } from "@jest/globals";
import fs from "node:fs";
import { versionRegex } from "../lib/helpers/regexes.js";
import { prepare } from "../lib/index.js";
import { createTestProject } from "./helpers/create-test-project.js";
import { readProjectVersion } from "./helpers/read-project-version.js";

describe("prepare", () => {
  const context = { logger: { log: jest.fn() } };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should not error in good conditions", async () => {
    expect.assertions(2);

    for (let asAttribute of [false, true]) {
      const { cwd } = createTestProject("0.0.0-dev", asAttribute);

      expect(
        async () =>
          await prepare(
            {},
            {
              ...context,
              cwd,
              nextRelease: { version: "1.0.0" },
            },
          ),
      ).not.toThrow();
    }
  });

  it("should update project version in mix.exs", async () => {
    expect.assertions(4);

    for (let asAttribute of [false, true]) {
      const { cwd, path } = createTestProject("0.0.0-dev", asAttribute);

      await prepare(
        {},
        {
          ...context,
          cwd,
          nextRelease: { version: "1.0.0" },
        },
      );

      const packageContent = fs.readFileSync(path, { encoding: "utf-8" });

      expect(packageContent).toMatch(versionRegex);
      expect(packageContent).not.toMatch(/0\.0\.0-dev/);
      const { version } = readProjectVersion(packageContent);
      expect(version).toBe("1.0.0");
    }
  });

  it("should not update the version outside of the project definition in mix.exs", async () => {
    expect.assertions(4);

    for (let asAttribute of [false, true]) {
      const { cwd, path } = createTestProject("0.0.0-dev", asAttribute, "trap");

      await prepare(
        {},
        {
          ...context,
          cwd,
          nextRelease: { version: "1.0.0" },
        },
      );

      const packageContent = fs.readFileSync(path, { encoding: "utf-8" });

      // should still contain the versions in some_config and some_other_config
      expect(packageContent).toMatch(/1\.2\.3/);
      expect(packageContent).toMatch(/4\.5\.6/);

      expect(packageContent).toMatch(versionRegex);
      expect(packageContent).not.toMatch(/0\.0\.0-dev/);
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
          ...context,
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
    expect.assertions(4);

    for (let asAttribute of [false, true]) {
      const { cwd } = createTestProject("0.0.0-dev", asAttribute);

      await prepare(
        {},
        {
          ...context,
          cwd,
          nextRelease: { version: "1.0.0" },
        },
      );

      expect(context.logger.log).toHaveBeenCalledTimes(1);
      expect(context.logger.log).toHaveBeenCalledWith(
        "Write version %s to mix.exs in %s",
        "1.0.0",
        cwd,
      );
      context.logger.log.mockReset();
    }
  });
});
