/*!
 * Copyright (C) QoS Energy
 *
 * All rights reserved
 * https://www.qosenergy.com/terms-of-use
 *
 * All information contained herein is, and remains the property of
 * QoS Energy and its suppliers, if any. The intellectual and technical
 * concepts contained herein are proprietary to QoS Energy and its suppliers
 * and may be covered by foreign patents, patents in process, and are
 * protected by trade secret or copyright law. Dissemination of this
 * information or reproduction of this material is strictly forbidden unless
 * prior written permission is obtained from QoS Energy.
 */

import * as env from "../utils/Env";

const symbolNames = `
  ExpressApplication
  Grpc
`
  .split(/\s+/)
  .filter((s) => s);

Object.keys(env).forEach((envVar) => {
  symbolNames.push(envVar);
});

const symbols = symbolNames.reduce((symbolHash, name) => {
  symbolHash[name] = Symbol();

  return symbolHash;
}, {} as Record<string, symbol>);

// tslint:disable-next-line: no-default-export
export default symbols;
