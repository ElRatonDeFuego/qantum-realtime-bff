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

import dotenv from "dotenv";

dotenv.config();

export const GRPC_SERVER = process.env.GRPC_SERVER || "localhost:50001";

export const LOG_LEVEL = process.env.LOG_LEVEL || "info";

export const PORT = parseInt(process.env.PORT || "7777", 10);

export type Env = Record<string, string | number | undefined>;
