/* eslint-disable */
/// <reference types='@monstrs/types-import-proto'/>

declare const __non_webpack_require__: any

import { join } from 'path'

export const timerServicePath =
  typeof __non_webpack_require__ === 'undefined'
    ? join(__dirname, '../team/messenger/timer/v1alpha1/timer.service.proto')
    : require('../team/messenger/timer/v1alpha1/timer.service.proto').default

export const includeDirs = [__dirname, join(__dirname, '..')]
