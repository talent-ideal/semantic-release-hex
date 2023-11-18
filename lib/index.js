/* eslint-disable no-unused-vars */
import SemanticReleaseError from "@semantic-release/error";
import fs from "node:fs";
import path from "node:path";
import { versionRegex } from "./helpers/regexes";

let verified;
let prepared;

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

  if (!projectContent.match(versionRegex)) {
    throw new SemanticReleaseError(
      "no version was found in mix.exs",
      "ENOVERSION",
    );
  }

  verified = true;
}

export async function prepare(pluginConfig, context) {
  prepared = true;
}
