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

import Logger from "bunyan";
import { interfaces } from "inversify";
import pjson from "pjson";
import symbols from "../Symbols";

export const loggerFactory = ({ container: c }: interfaces.Context) =>
  Logger.createLogger({
    level: c.get(symbols.LOG_LEVEL),
    name: pjson.name,
    serializers: Logger.stdSerializers,
  });
