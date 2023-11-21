import { composeSemVerRegex, createUnionRegex } from "./regexes.js";

export function createReadmeVersionRequirementRegexs(projectName) {
  const readmeVersionRegexesArray = [
    composeMixDepsSemVerRegex(
      projectName,
      /.*"\s*(?:>|>=|<|<=|==|!=|~>)\s*/,
      /"/,
      true,
    ),
    composeMixDepsSemVerRegex(projectName, /\s*?git.*?tag:\s*"v/, /"/, true),
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
 * @param {string} projectName
 * @param {RegExp} head
 * @param {RegExp} tail
 * @param {boolean | null} [optionalPatch] make the patch version optional
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
