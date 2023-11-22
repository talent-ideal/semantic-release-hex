/**
 * @typedef {Object} ReadVersionResult
 * @property {string} version complete SemVer string
 * @property {string} major
 * @property {string} minor
 * @property {string} patch
 * @property {string} prerelease
 * @property {string} metadata
 */
/**
 * @typedef {Object} ReadVersionNoMatch
 * @property {undefined} version complete SemVer string
 * @property {undefined} major
 * @property {undefined} minor
 * @property {undefined} patch
 * @property {undefined} prerelease
 * @property {undefined} metadata
 */

/**
 * Matches SemVer regexes (with the original groups) and returns the version and its subparts
 *
 * @param {string} content mix.exs content
 * @param {RegExp[]} regexesArray arrays of composed regexes to match the version parts
 * @returns {ReadVersionResult}
 */
export function readVersion(content, regexesArray) {
  let match;
  for (let regex of regexesArray) {
    match = RegExp(regex).exec(content);
    if (match) break;
  }

  const [, version, major, minor, patch, prerelease, metadata] = match ?? [];

  return { version, major, minor, patch, prerelease, metadata };
}
