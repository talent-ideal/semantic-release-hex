/** source: https://semver.org/#is-there-a-suggested-regular-expression-regex-to-check-a-semver-string */
const semVerRegexLine = new RegExp(
  /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/,
);
const semVerRegex = new RegExp(semVerRegexLine.source.replace(/[\^$]/g, ""));
const semVerRegexGroup = new RegExp("(" + semVerRegex.source + ")");

export const versionRegexesArray = [
  composeSemVerRegex(/\bversion:\s*"/, /"/),
  composeSemVerRegex(/@version\s+"/, /"/),
];

export const versionRegex = new RegExp(
  versionRegexesArray.map((r) => r.source).join("|"),
);

/**
 * Compose a RegEx by injecting the SemVer regex between `head` and `tail`
 *
 * @param {RegExp} head
 * @param {RegExp} tail
 * @returns {RegExp}
 */
function composeSemVerRegex(head, tail) {
  return new RegExp(head.source + semVerRegexGroup.source + tail.source);
}
