/** Official SemVer RegEx (matches whole line only) {@link https://semver.org/#is-there-a-suggested-regular-expression-regex-to-check-a-semver-string source} */
const officialSemVerRegex = new RegExp(
  /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/,
);
export const semVerRegex = new RegExp(
  officialSemVerRegex.source.replace(/[\^$]/g, ""),
);
export const semVerRegexGroup = new RegExp("(" + semVerRegex.source + ")");

/**
 * Compose a RegEx by injecting the SemVer regex between `head` and `tail`
 *
 * @param {RegExp} head
 * @param {RegExp} tail
 * @returns {RegExp}
 */
export function composeSemVerRegex(head, tail) {
  return new RegExp(head.source + semVerRegexGroup.source + tail.source, "s");
}

/**
 * Creates a union (`|`) RegEx from an array of RegExs
 *
 * @param {RegExp[]} regexes
 * @returns {RegExp}
 */
export function createUnionRegex(regexes) {
  return new RegExp(regexes.map((r) => r.source).join("|"), "s");
}

/**
 * Returns a RegEx that matches the same content as `composedRegex`,
 * but with only 3 capturing groups (for replacing):
 * - g1: everything before version string
 * - g2: version string
 * - g3: everything after version string
 *
 * @param {RegExp} composedRegex
 * @returns {RegExp} a RegEx composed with `composeSemVerRegex`
 *
 * @see {@link composedRegexToReplaceGroups} for the array version
 */
function composedRegexToReplaceGroups(composedRegex) {
  return new RegExp(
    "(.*" +
      composedRegex.source.replace(
        semVerRegexGroup.source,
        ")(" +
          // replace all capturing groups from the inner semVerRegex by non-capturing ones
          semVerRegex.source.replace(/\((?!\?:)/g, "(?:") +
          ")(",
      ) +
      ".*)",
    "s",
  );
}

/**
 * Mapped version of {@link composedRegexToReplaceGroups}
 *
 * @param {RegExp[]} composedRegexs
 * @returns {RegExp[]}
 */
export function composedRegexsToReplaceGroups(composedRegexs) {
  return composedRegexs.map(composedRegexToReplaceGroups);
}

/**
 * Replaces the second group (the SemVer string) of a replace groups RegExp match
 *
 * @param {string} content whole content containing a replace group SemVer RegEx match
 * @param {string} substitute string to insert in place of the second group
 * @param {RegExp[]} replaceGroupsRegexes array of RegExes with **three and only three** replace groups (see {@link composedRegexToReplaceGroups})
 * @returns {string}
 */
export function replaceSecondGroupInContent(
  content,
  substitute,
  replaceGroupsRegexes,
) {
  let match;
  for (let regex of replaceGroupsRegexes) {
    match = RegExp(regex).exec(content);
    if (match) break;
  }

  if (!match) throw new Error(`No match for: ${content}`);

  const [, g1, , g3] = match;

  return `${g1}${substitute}${g3}`;
}
