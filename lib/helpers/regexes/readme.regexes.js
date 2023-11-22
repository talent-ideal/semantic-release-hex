import {
  composeSemVerRegex,
  composedRegexToReplaceGroups,
  createUnionRegex,
  replaceSecondGroupInContent,
} from "./regexes.js";

export function createReadmeVersionRequirementRegexs(projectName) {
  const readmeVersionRegexesArray = [
    composeMixDepsSemVerRegex(
      projectName,
      /.*"\s*(?:>|>=|<|<=|==|!=|~>)\s*/,
      /"/,
      true,
    ),
    composeMixDepsSemVerRegex(projectName, /\s*?git.*?tag:\s*"v/, /"/, false),
  ];

  const readmeVersionRegex = createUnionRegex(readmeVersionRegexesArray);

  return {
    readmeVersionRegexesArray,
    readmeVersionRegex,
  };
}

/**
 * Composes a RegEx by injecting the SemVer regex between `head` and `tail`,
 * but matching only inside a specific mix dependency tuple
 *
 * @param {string} projectName the name of the mix app
 * @param {RegExp} head
 * @param {RegExp} tail
 * @returns {RegExp}
 */
export function composeMixDepsSemVerRegex(
  projectName,
  head,
  tail,
  optionalPatch,
) {
  return new RegExp(
    composeSemVerRegex(
      new RegExp(`{(?:(?!}).)*?:${projectName}\\s*?,` + head.source),
      new RegExp(tail.source + ".*?(?=})}"),
      optionalPatch,
    ).source,
    "s",
  );
}

/**
 * Replaces the version string in a README file content
 *
 * @param {string} projectName the name of the mix app
 * @param {string} content content of the README file
 * @param {string} version version to insert in place of the current one
 * @returns {string}
 */
export function replaceVersionInReadmeContent(projectName, content, version) {
  const { readmeVersionRegexesArray } =
    createReadmeVersionRequirementRegexs(projectName);

  return replaceSecondGroupInContent(
    content,
    version,
    readmeVersionRegexesArray.map((regex, i) =>
      composedRegexToReplaceGroups(regex, i === 0),
    ),
  );
}
