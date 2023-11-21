import { composeSemVerRegex, createUnionRegex } from "./regexes.js";

export function createReadmeVersionRequirementRegexs(projectName) {
  const readmeVersionRegexesArray = [
    composeSemVerRegex(
      new RegExp(
        `{(?:(?!}).)*?:${projectName}\\s*?,.*"\\s*(?:>|>=|<|<=|==|!=|~>)\\s*`,
      ),
      /".*?(?=})}/,
      true,
    ),
  ];

  const readmeVersionRegex = createUnionRegex(readmeVersionRegexesArray);

  return {
    readmeVersionRegexesArray,
    readmeVersionRegex,
  };
}
