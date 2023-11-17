/* eslint-disable no-unused-vars */

let verified;
let prepared;

export async function verifyConditions(pluginConfig, context) {
  verified = true;
}

export async function prepare(pluginConfig, context) {
  prepared = true;
}
