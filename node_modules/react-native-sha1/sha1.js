/**
 * react-native-sha1
 * @flow
 */

'use strict';

const {NativeModules} = require('react-native')
const sha1Lib = NativeModules.sha1Lib;

export function sha1(data) {
  return sha1Lib.sha1(data);
}
