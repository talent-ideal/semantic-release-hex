// source: https://semver.org/#is-there-a-suggested-regular-expression-regex-to-check-a-semver-string
export const semVerRegex = new RegExp(
  /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/,
);

export const regularVersionRegex = composeSemverRegex(/\bversion:\s*"/, /"/);
export const attributeVersionRegex = composeSemverRegex(/@version\s+"/, /"/);
export const allVersionRegexs = new RegExp(
  regularVersionRegex.source + "|" + attributeVersionRegex.source,
);

function composeSemverRegex(head, tail) {
  return new RegExp(
    head.source +
      "(" +
      semVerRegex.source.replace(/[\^$]/g, "") +
      ")" +
      tail.source,
  );
}
