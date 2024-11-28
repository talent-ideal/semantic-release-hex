/** Official SemVer RegEx {@link https://semver.org/#is-there-a-suggested-regular-expression-regex-to-check-a-semver-string source} */
const semVerRegexLine = new RegExp(
  /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/,
);
const semVerRegex = new RegExp(semVerRegexLine.source.replace(/[\^$]/g, ""));
const semVerRegexGroup = new RegExp("(" + semVerRegex.source + ")");

/**
 * RegExes of all supported version formats in mix.exs
 *
 * see {@link https://github.com/unill-io/semantic-release-hex/#supported-version-formats Supported version formats}
 */
export const versionRegexesArray = [
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
 * Union RegEx of {@link versionRegexesArray} (for match only, don't use for capturing)
 */
export const versionRegex = new RegExp(
  versionRegexesArray.map((r) => r.source).join("|"),
  "s",
);

/**
 * Equivalent of {@link versionRegexesArray} but with special capturing groups for replacing (see {@link composedRegexToReplaceGroups})
 */
const versionRegexsReplaceGroupsArray = versionRegexesArray.map(
  composedRegexToReplaceGroups,
);

/**
 * Replaces the version part of a version RegEx match
 *
 * @param {string} content
 * @param {string} version
 * @returns {string}
 */
export function replaceVersionInContent(content, version) {
  let match;
  for (let regex of versionRegexsReplaceGroupsArray) {
    match = RegExp(regex).exec(content);
    if (match) break;
  }

  if (!match) throw new Error(`No match for: ${content}`);

  const [, g1, , g3] = match;

  return `${g1}${version}${g3}`;
}

/**
 * Compose a RegEx by injecting the SemVer regex between `head` and `tail`
 *
 * @param {RegExp} head
 * @param {RegExp} tail
 * @returns {RegExp}
 */
function composeSemVerRegex(head, tail) {
  return new RegExp(head.source + semVerRegexGroup.source + tail.source, "s");
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
