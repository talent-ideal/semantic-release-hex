import SemanticReleaseError from "@semantic-release/error";
import fs from "node:fs";
import path from "node:path";
import {
  mixVersionRegex,
  parseProjectName,
  replaceVersionInMixContent,
} from "./helpers/regexes/mix.regexes.js";
import { replaceVersionInReadmeContent } from "./helpers/regexes/readme.regexes.js";

export async function verifyConditions(_, context) {
  const { cwd } = context;

  const projectPath = path.resolve(cwd, "mix.exs");

  if (!fs.existsSync(projectPath)) {
    throw new SemanticReleaseError(
      "mix.exs not found in the current working directory",
      "ENOPROJECT",
    );
  }

  const projectContent = fs.readFileSync(projectPath, {
    encoding: "utf-8",
  });

  if (!projectContent.match(mixVersionRegex)) {
    throw new SemanticReleaseError(
      "no version was found in mix.exs",
      "ENOVERSION",
    );
  }
}

export async function prepare(_, { cwd, nextRelease: { version }, logger }) {
  /**
   * Update mix.exs
   */

  const projectPath = path.join(cwd, "mix.exs");

  const projectContent = fs.readFileSync(projectPath, {
    encoding: "utf-8",
  });

  const updatedProjectContent = replaceVersionInMixContent(
    projectContent,
    version,
  );

  logger.log("Write version %s to mix.exs in %s", version, cwd);

  fs.writeFileSync(projectPath, updatedProjectContent);

  /**
   * Update README.md
   */

  const readmePath = path.join(cwd, "README.md");

  const readmeContent = fs.readFileSync(readmePath, {
    encoding: "utf-8",
  });

  const projectName = parseProjectName(projectContent);

  try {
    const updatedReadmeContent = replaceVersionInReadmeContent(
      projectName,
      readmeContent,
      version,
    );

    logger.log("Write version %s to README.md in %s", version, cwd);

    fs.writeFileSync(readmePath, updatedReadmeContent);
  } catch {
    logger.log("No version found in README.md in %s", cwd);
  }
}
