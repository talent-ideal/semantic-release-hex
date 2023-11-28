import fs from "node:fs";
import path from "node:path";
import { temporaryDirectory } from "tempy";

/**
 * @typedef {Object} Project
 * @property {string} cwd absolute path of the temporary working directory
 * @property {ProjectFile} mix properties of the mix.exs file
 * @property {ProjectFile} readme properties of the README.md file
 */

/**
 * @typedef {Object} ProjectFile
 * @property {string} path absolute path of the file
 * @property {string} content content of the file
 */

/**
 * Creates a temporary folder with mix.exs & README.md files with the specified version
 *
 * @param {string | null} [version] initial version to set in mix.exs (empty if not provided)
 * @param {boolean | null} [asAttribute] (mix.exs) whether to set the version as a module attribute
 * @param {"trap" | "complex-name" | null} [mixSuffix] (mix.exs) optional mix fixture file suffix
 * @param {boolean | null} [asGitTag] (README.md) whether to set the version as a git tag
 * @param {"empty" | "no-operator" | "with-options" | null} [gitOverride] (README.md) override for the filename suffix
 * @returns {Project}
 */
export function createTestProject(
  version,
  asAttribute,
  mixSuffix,
  asGitTag,
  gitOverride,
) {
  /**
   * mix.exs
   */

  const versionType = "-" + (asAttribute ? "attribute" : "regular");
  const projectFixtureSuffix = mixSuffix ? `-${mixSuffix}` : "";

  const cwd = temporaryDirectory();

  const projectPath = path.resolve(cwd, "mix.exs");
  const projectContent = fs
    .readFileSync(
      `./tests/fixtures/mix/mix${versionType}${projectFixtureSuffix}.exs`,
      {
        encoding: "utf-8",
      },
    )
    .replace("{{VERSION}}", version ?? "");
  fs.writeFileSync(projectPath, projectContent);

  /**
   * README.md
   */

  const dependencyType = asGitTag ? "git-tag" : "regular";
  const readmeFixtureSuffix = gitOverride ? `${gitOverride}` : dependencyType;

  const readmePath = path.resolve(cwd, "README.md");
  const readmeContent = fs
    .readFileSync(`./tests/fixtures/readme/readme-${readmeFixtureSuffix}.md`, {
      encoding: "utf-8",
    })
    .replace("{{VERSION}}", version ?? "");
  fs.writeFileSync(readmePath, readmeContent);

  return {
    cwd,
    mix: { path: projectPath, content: projectContent },
    readme: { path: readmePath, content: readmeContent },
  };
}
