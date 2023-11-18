## [1.0.0-alpha.3](https://github.com/talent-ideal/semantic-release-hex/compare/v1.0.0-alpha.2...v1.0.0-alpha.3) (2023-11-18)


### 🐛 Bug Fixes

* fix missing extensions in imports ([89984f5](https://github.com/talent-ideal/semantic-release-hex/commit/89984f580c53d232354eccbc5497dfea8f84f29e))
* remove extra argument in `readProjectVersion` calls ([f573d5e](https://github.com/talent-ideal/semantic-release-hex/commit/f573d5e02514742bf02d131b2c5de3f2faa88b65))

## [1.0.0-alpha.2](https://github.com/talent-ideal/semantic-release-hex/compare/v1.0.0-alpha.1...v1.0.0-alpha.2) (2023-11-18)


### ✨ Features

* add `replaceVersionInContent` helper ([24126fe](https://github.com/talent-ideal/semantic-release-hex/commit/24126feba635ab4f7c10cbed55fd788debb58578))
* add whole semver capturing group in regexs ([2c0ab4a](https://github.com/talent-ideal/semantic-release-hex/commit/2c0ab4a839cd996d8651e4e8c2748b7e96808f2e))
* implement prepare step ([58dd830](https://github.com/talent-ideal/semantic-release-hex/commit/58dd830ef637f03a699fa6c27d0fa09f5947a733))


### 📦 Code Refactoring

* add actual semVerRegex and rename old one ([09fe555](https://github.com/talent-ideal/semantic-release-hex/commit/09fe5550c5730defa48b08249882c2c055c81de3))
* don't rely on individual version regexes ([4ad0261](https://github.com/talent-ideal/semantic-release-hex/commit/4ad02616339bc19b2ed5d371c9b0209afe481438))


### 📚 Documentation

* add missing JSDoc ([7600ce0](https://github.com/talent-ideal/semantic-release-hex/commit/7600ce0a0fc873c6bbf748b18132a467c0d9619d))


### 🚨 Tests

* add failing prepare tests ([8a68496](https://github.com/talent-ideal/semantic-release-hex/commit/8a684965c7b8814a59e11d3f316cb6c3b1c64f38))
* re-enable 100% coverage threshold ([3dd2160](https://github.com/talent-ideal/semantic-release-hex/commit/3dd2160232c59b2958f73f5a8d3cc62c27c03afe))
* remove superfluous semVerRegexLine test case ([9fd0bd9](https://github.com/talent-ideal/semantic-release-hex/commit/9fd0bd9c2e7e9fe78bee5c91b9c59f0f21932edd))


### ♻️ Chores

* move regexs test file to src folder ([b6a5e4d](https://github.com/talent-ideal/semantic-release-hex/commit/b6a5e4de8f49ff86a305ef0084b8ccf221fced0c))

## [1.0.0-alpha.1](https://github.com/talent-ideal/semantic-release-hex/compare/v0.0.1-alpha.1...v1.0.0-alpha.1) (2023-11-18)


### ⚠ Breaking changes

* minimum supported Node version is now 16.3.0

### ✨ Features

* add version regexs ([6710281](https://github.com/talent-ideal/semantic-release-hex/commit/6710281be7e08b8ca419c68055beabc73caf09af))
* implement verifyConditions step ([a8e0763](https://github.com/talent-ideal/semantic-release-hex/commit/a8e0763e3970b4b032ad996c1e79d20f20054262))
* replace placeholder content with plugin API ([7f6c932](https://github.com/talent-ideal/semantic-release-hex/commit/7f6c932ddc2d4b5ff1104cc6c50697b2367075fd))


### 🐛 Bug Fixes

* set Promise return types in declaration file ([e54865f](https://github.com/talent-ideal/semantic-release-hex/commit/e54865f22ec0ddf3316c129cc714f26ea74f40dd))


### 📚 Documentation

* **readme:** add supported version formats section ([9f64d24](https://github.com/talent-ideal/semantic-release-hex/commit/9f64d24ba9a7b8c5dcb6fdd6cbb84d9b022a3d71))


### 🚨 Tests

* add failing verifyConditions tests ([321860d](https://github.com/talent-ideal/semantic-release-hex/commit/321860d5b919f2fe77c8c5af69f69c7515d63339))
* add todo test cases ([1542e5e](https://github.com/talent-ideal/semantic-release-hex/commit/1542e5ec0422aca4825244ff578594387880f687))


### ⚙️ Continuous Integrations

* **action:** update insurgent-lab/is-in-pr-action action to v0.1.4 ([#11](https://github.com/talent-ideal/semantic-release-hex/issues/11)) ([89a92d3](https://github.com/talent-ideal/semantic-release-hex/commit/89a92d39367014f3f9ab6a026f3069f181f9503e))


### ♻️ Chores

* add mix.exs fixture ([36db0f3](https://github.com/talent-ideal/semantic-release-hex/commit/36db0f344d510797c8f8a1d12dc3328d7c9afc5b))
* split test suites & remove coverage thresholds ([4f71478](https://github.com/talent-ideal/semantic-release-hex/commit/4f714784d5e62ec8bb74a7942e33704dbe871e6f))
* use es2020 ([f319be3](https://github.com/talent-ideal/semantic-release-hex/commit/f319be3e3071ee90ba0308e2acce63cfb1db0aa9))


### 💎 Styles

* add .prettierignnore ([cdd8162](https://github.com/talent-ideal/semantic-release-hex/commit/cdd8162efd2123eb225a6b4001de7d3348806c85))
* fix eslint config ([930a64b](https://github.com/talent-ideal/semantic-release-hex/commit/930a64b451af72b055b5014a60f8f0ad9b622a17))

## [0.0.1-alpha.1](https://github.com/talent-ideal/semantic-release-hex/compare/v0.0.0...v0.0.1-alpha.1) (2023-11-17)


### 📚 Documentation

* **readme:** add semantic-release-hex plugin doc ([77e083e](https://github.com/talent-ideal/semantic-release-hex/commit/77e083e0005d9a4eb2f3c4ecb73827f7c55df23a))


### ⚙️ Continuous Integrations

* **action:** fix prevent-duplicate-checks output ([#9](https://github.com/talent-ideal/semantic-release-hex/issues/9)) ([7a950d9](https://github.com/talent-ideal/semantic-release-hex/commit/7a950d9f1c39638679b9bbb137664ebaedeb5438))
* **action:** fix renovate branches pattern ([cec2c9c](https://github.com/talent-ideal/semantic-release-hex/commit/cec2c9c2474652d5a60ac4d2c7ed084ec84c4b2b))
* **action:** prevent duplicate checks on PRs ([57847af](https://github.com/talent-ideal/semantic-release-hex/commit/57847afbdefb7481c8cd5b73a1d14c1facdc2acd))
* **action:** run tests on all branches and PRs to dev ([f9927ad](https://github.com/talent-ideal/semantic-release-hex/commit/f9927adeff740cb4b5d6012e5c027f9f93ebb318))
* **action:** update github/codeql-action action to v2.22.7 ([#5](https://github.com/talent-ideal/semantic-release-hex/issues/5)) ([02894af](https://github.com/talent-ideal/semantic-release-hex/commit/02894afd86dbadebcc7ac53ab0c8f8e1d9b97e55))
* **action:** update step-security/harden-runner action to v2.6.1 ([#6](https://github.com/talent-ideal/semantic-release-hex/issues/6)) ([cf849b2](https://github.com/talent-ideal/semantic-release-hex/commit/cf849b222e93c139ea95478a97a1d8cf29f6fa92))
* setup alpha releases on dev branch ([e88cdfd](https://github.com/talent-ideal/semantic-release-hex/commit/e88cdfd4dfc180f27e98e9791c9e1bc7223e897e))


### ♻️ Chores

* **deps:** lock file maintenance ([2b76633](https://github.com/talent-ideal/semantic-release-hex/commit/2b76633e747e86e06b20bcf91ce44fbe2e97b005))
* **deps:** lock file maintenance ([1047f4c](https://github.com/talent-ideal/semantic-release-hex/commit/1047f4c82953ebe033fbcfc83c09325605550ce1))
* **deps:** lock file maintenance ([2135ed7](https://github.com/talent-ideal/semantic-release-hex/commit/2135ed7e9d8b634271ff12f8a21703282e3248d5))
* **deps:** update dependency [@commitlint](https://github.com/commitlint)/cli to v18.4.0 ([6f67bd2](https://github.com/talent-ideal/semantic-release-hex/commit/6f67bd2f9ed47d7b837129b3e76833eb9f3effed))
* **deps:** update dependency [@commitlint](https://github.com/commitlint)/cli to v18.4.1 ([ca92dc6](https://github.com/talent-ideal/semantic-release-hex/commit/ca92dc60566d1995bdbe25784a674ed1ac2df0af))
* **deps:** update dependency [@insurgent](https://github.com/insurgent)/conventional-changelog-preset to v9 ([#4](https://github.com/talent-ideal/semantic-release-hex/issues/4)) ([dc6133a](https://github.com/talent-ideal/semantic-release-hex/commit/dc6133a3b7491729e2abe2cb1ace801c5d85b47e))
* **deps:** update dependency [@types](https://github.com/types)/jest to v29.5.8 ([880015f](https://github.com/talent-ideal/semantic-release-hex/commit/880015facb63e52bcca187066eeb62909c7fe138))
* **deps:** update dependency eslint to v8.53.0 ([2d36c1a](https://github.com/talent-ideal/semantic-release-hex/commit/2d36c1a92dff19f1219e7f72937e6d3ffa77f77c))
