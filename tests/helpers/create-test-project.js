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
 * Creates a temporary folder with a mix.exs file with the specified version
 *
 * @param {string | null} [version] initial version to set in mix.exs (empty if not provided)
 * @param {boolean | null} [asAttribute] whether to set the version as a module attribute
 * @param {"trap" | "complex-name" | null} [suffix] optional mix fixture file suffix
 * @returns {Project}
 */
export function createTestProject(version, asAttribute, suffix) {
  const versionType = "-" + (asAttribute ? "attribute" : "regular");
  const fixtureSuffix = suffix ? `-${suffix}` : "";

  const cwd = temporaryDirectory();

  const projectPath = path.resolve(cwd, "mix.exs");
  const projectContent = fs
    .readFileSync(
      `./tests/fixtures/mix/mix${versionType}${fixtureSuffix}.exs`,
      {
        encoding: "utf-8",
      },
    )
    .replace("{{VERSION}}", version ?? "");
  fs.writeFileSync(projectPath, projectContent);

  const readmePath = path.resolve(cwd, "README.md");
  const readmeContent = fs
    .readFileSync(`./tests/fixtures/readme/readme-regular.md`, {
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
