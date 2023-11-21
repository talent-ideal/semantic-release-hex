import {
  composeSemVerRegex,
  composedRegexsToReplaceGroups,
  createUnionRegex,
  replaceSecondGroupInContent,
} from "./regexes.js";

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
 * Equivalent of {@link mixVersionRegexesArray} but with special capturing groups for replacing (see {@link composedRegexsToReplaceGroups})
 */
export const mixVersionRegexesReplaceGroupsArray =
  composedRegexsToReplaceGroups(mixVersionRegexesArray);

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
    mixVersionRegexesReplaceGroupsArray,
  );
}
