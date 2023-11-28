import { jest } from "@jest/globals";
import fs from "node:fs";
import {
  mixVersionRegex,
  mixVersionRegexesArray,
} from "../lib/helpers/regexes/mix.regexes.js";
import { createReadmeVersionRequirementRegexs } from "../lib/helpers/regexes/readme.regexes.js";
import { prepare } from "../lib/index.js";
import { createTestProject } from "./helpers/create-test-project.js";
import { readVersion } from "./helpers/read-project-version.js";

describe("prepare step", () => {
  const context = { logger: { log: jest.fn() } };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should not error in good conditions", async () => {
    expect.assertions(2);

    for (let asAttribute of [false, true]) {
      const { cwd } = createTestProject("0.0.0-dev", asAttribute);

      await expect(
        prepare(
          {},
          {
            ...context,
            cwd,
            nextRelease: { version: "1.0.0" },
          },
        ),
      ).resolves.not.toThrow();
    }
  });

  /**
   * mix.exs
   */

  describe("update mix.exs", () => {
    it("should update project version", async () => {
      expect.assertions(6);

      for (let asAttribute of [false, true]) {
        const {
          cwd,
          mix: { path },
        } = createTestProject("0.0.0-dev", asAttribute);

        await prepare(
          {},
          {
            ...context,
            cwd,
            nextRelease: { version: "1.0.0" },
          },
        );

        const packageContent = fs.readFileSync(path, { encoding: "utf-8" });

        expect(packageContent).toMatch(mixVersionRegex);
        expect(packageContent).not.toMatch(/0\.0\.0-dev/);
        const { version } = readVersion(packageContent, mixVersionRegexesArray);
        expect(version).toBe("1.0.0");
      }
    });

    it("should not update the version outside of the project definition", async () => {
      expect.assertions(10);

      for (let asAttribute of [false, true]) {
        const {
          cwd,
          mix: { path },
        } = createTestProject("0.0.0-dev", asAttribute, "trap");

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

        expect(packageContent).toMatch(mixVersionRegex);
        expect(packageContent).not.toMatch(/0\.0\.0-dev/);
        const { version } = readVersion(packageContent, mixVersionRegexesArray);
        expect(version).toBe("1.0.0");
      }
    });

    it("should preserve indentation and newline", async () => {
      expect.assertions(2);

      for (let asAttribute of [false, true]) {
        const {
          cwd,
          mix: { path, content },
        } = createTestProject("0.0.0-tobereplaced", asAttribute);

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
      expect.assertions(2);

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

        expect(context.logger.log).toHaveBeenCalledWith(
          "Write version %s to mix.exs in %s",
          "1.0.0",
          cwd,
        );
        context.logger.log.mockReset();
      }
    });
  });

  /**
   * README.md
   */

  describe("update README.md", () => {
    // eslint-disable-next-line jest/prefer-expect-assertions
    it("should update project version", async () => {
      const configs = [
        { asGitTag: false },
        { asGitTag: true },
        { override: "no-operator" },
        { override: "with-options" },
      ];

      expect.assertions(configs.length * 3);
      for (let { asGitTag, override } of configs) {
        const {
          cwd,
          readme: { path },
        } = createTestProject(
          "0.0.0-dev",
          null,
          null,
          asGitTag,
          // @ts-ignore
          override,
        );

        await prepare(
          {},
          {
            ...context,
            cwd,
            nextRelease: { version: "1.0.0" },
          },
        );

        const readmeContent = fs.readFileSync(path, { encoding: "utf-8" });
        const { readmeVersionRegex, readmeVersionRegexesArray } =
          createReadmeVersionRequirementRegexs("hello_world");

        expect(readmeContent).toMatch(readmeVersionRegex);
        expect(readmeContent).not.toMatch(/0\.0\.0-dev/);
        const { version } = readVersion(
          readmeContent,
          readmeVersionRegexesArray,
        );
        expect(version).toBe("1.0.0");
      }
    });

    it("should ignore empty README and call the logger with the cwd", async () => {
      expect.assertions(2);

      const { cwd } = createTestProject("0.0.0-dev", null, null, null, "empty");

      await expect(
        prepare(
          {},
          {
            ...context,
            cwd,
            nextRelease: { version: "1.0.0" },
          },
        ),
      ).resolves.not.toThrow();

      expect(context.logger.log).toHaveBeenCalledWith(
        "No version found in README.md in %s",
        cwd,
      );
    });

    it("should preserve indentation and newline", async () => {
      expect.assertions(2);

      for (let asGitTag of [false, true]) {
        const {
          cwd,
          readme: { path, content },
        } = createTestProject("0.0.0-tobereplaced", null, null, asGitTag);

        await prepare(
          {},
          {
            ...context,
            cwd,
            nextRelease: { version: "1.0.0" },
          },
        );

        const readmeContent = fs.readFileSync(path, { encoding: "utf-8" });
        expect(readmeContent).toBe(
          content.replace("0.0.0-tobereplaced", "1.0.0"),
        );
      }
    });

    it("should call the logger with the updated version and cwd", async () => {
      expect.assertions(2);

      for (let asGitTag of [false, true]) {
        const { cwd } = createTestProject("0.0.0-dev", null, null, asGitTag);

        await prepare(
          {},
          {
            ...context,
            cwd,
            nextRelease: { version: "1.0.0" },
          },
        );

        expect(context.logger.log).toHaveBeenCalledWith(
          "Write version %s to README.md in %s",
          "1.0.0",
          cwd,
        );
        context.logger.log.mockReset();
      }
    });
  });
});
