/* eslint-disable */
/// <reference types='@monstrs/types-import-proto'/>

declare const __non_webpack_require__: any

import { join } from 'path'

export const paymentsServicePath =
  typeof __non_webpack_require__ === 'undefined'
    ? join(__dirname, '../team/youthink/payments/v1alpha1/payments.service.proto')
    : require('../team/youthink/payments/v1alpha1/payments.service.proto').default

export const includeDirs = [__dirname, join(__dirname, '..')]
