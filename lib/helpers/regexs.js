// source: https://semver.org/#is-there-a-suggested-regular-expression-regex-to-check-a-semver-string
export const semVerRegexLine = new RegExp(
  /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/,
);
export const semVerRegex = new RegExp(
  semVerRegexLine.source.replace(/[\^$]/g, ""),
);

export const regularVersionRegex = composeSemVerRegex(/\bversion:\s*"/, /"/);
export const attributeVersionRegex = composeSemVerRegex(/@version\s+"/, /"/);
export const allVersionRegexs = new RegExp(
  regularVersionRegex.source + "|" + attributeVersionRegex.source,
);

/**
 * Compose a RegEx by injecting the SemVer regex between `head` and `tail`
 *
 * @param {RegExp} head
 * @param {RegExp} tail
 * @returns {RegExp}
 */
function composeSemVerRegex(head, tail) {
  return new RegExp(head.source + "(" + semVerRegex.source + ")" + tail.source);
}
