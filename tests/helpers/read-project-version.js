/**
 * @typedef {Object} ReadVersionResult
 * @property {string} version whole SemVer string
 * @property {string} major
 * @property {string} minor
 * @property {string} patch
 * @property {string} prerelease
 * @property {string} metadata
 */

import {
  attributeVersionRegex,
  regularVersionRegex,
} from "../../lib/helpers/regexs";

/**
 * Matches a SemVer regex and returns it and its subparts
 *
 * @param {string} content mix.exs content
 * @param {boolean} [asAttribute] whether to set the version as a module attribute
 * @returns {ReadVersionResult}
 */
export function readProjectVersion(content, asAttribute) {
  const regex = asAttribute ? attributeVersionRegex : regularVersionRegex;

  const [, version, major, minor, patch, prerelease, metadata] =
    RegExp(regex).exec(content);

  return { version, major, minor, patch, prerelease, metadata };
}
