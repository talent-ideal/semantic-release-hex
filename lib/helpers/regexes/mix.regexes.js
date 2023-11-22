import {
  composeSemVerRegex,
  composedRegexsToReplaceGroups,
  createUnionRegex,
  replaceSecondGroupInContent,
} from "./regexes.js";

/**
 * RegEx to parse the project name from mix.exs content
 */
const mixProjectNameRegex = RegExp(
  /(?<=\bdef project\b)(?:(?!\bend\b).)+?app:\s*:([A-Za-z0-9_@]{1,255})+?.+?(?=end)/,
  "s",
);

/**
 * Parses the project name from a mix.exs file content
 *
 * @param {string} content content of the mix.exs file
 * @returns {string} project name
 */
export function parseProjectName(content) {
  const match = RegExp(mixProjectNameRegex).exec(content);

  if (!match) throw new Error(`No project name match in mix.exs.`);

  // @ts-ignore match is checked to not be null
  const [, projectName] = match;

  return projectName;
}

/**
 * RegExes of all supported version formats in mix.exs
 *
 * see {@link https://github.com/Talent-Ideal/semantic-release-hex/#supported-version-formats Supported version formats}
 */
export const mixVersionRegexesArray = [
  /**
   * matches `version: "x.x.x"` only inside "def project"
   */
  composeSemVerRegex(
    /(?<=\bdef project\b)(?:(?!\bend\b).)+?\bversion:\s*"/,
    /".+?(?=end)/,
  ),
  /**
   * matches `@version "x.x.x"`
   */
  composeSemVerRegex(/@version\s+"/, /"/),
];

/**
 * Union RegEx of {@link mixVersionRegexesArray} (for match only, don't use for capturing)
 */
export const mixVersionRegex = createUnionRegex(mixVersionRegexesArray);

/**
 * Replaces the version string in a mix.exs file content
 *
 * @param {string} content content of the mix.exs file
 * @param {string} version version to insert in place of the current one
 * @returns {string}
 */
export function replaceVersionInMixContent(content, version) {
  return replaceSecondGroupInContent(
    content,
    version,
    composedRegexsToReplaceGroups(mixVersionRegexesArray),
  );
}
