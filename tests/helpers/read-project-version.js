import {
  attributeVersionRegex,
  regularVersionRegex,
} from "../../lib/helpers/regexs";

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
 * Matches a SemVer regex and returns the version and its subparts
 *
 * @param {string} content mix.exs content
 * @param {boolean | null} [asAttribute] whether to set the version as a module attribute
 * @returns {ReadVersionResult}
 */
export function readProjectVersion(content, asAttribute) {
  const regex = asAttribute ? attributeVersionRegex : regularVersionRegex;

  const match = RegExp(regex).exec(content);

  const [, version, major, minor, patch, prerelease, metadata] = match ?? [];

  return { version, major, minor, patch, prerelease, metadata };
}
