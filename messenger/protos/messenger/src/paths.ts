/* eslint-disable */
/// <reference types='@monstrs/types-import-proto'/>

declare const __non_webpack_require__: any

import { join } from 'path'

export const messengerServicePath =
  typeof __non_webpack_require__ === 'undefined'
    ? join(__dirname, '../team/messenger/messenger/v1alpha1/messenger.service.proto')
    : require('../team/messenger/messenger/v1alpha1/messenger.service.proto').default

export const includeDirs = [__dirname, join(__dirname, '..')]
