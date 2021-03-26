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

import compression from "compression";
import { default as cors } from "cors";
import { default as express } from "express";
import helmet from "helmet";
import { interfaces } from "inversify";
import { InversifyExpressServer } from "inversify-express-utils";

export const expressApplicationFactory = ({
  container: c,
}: interfaces.Context) =>
  new InversifyExpressServer(c)
    .setConfig((app) => {
      app
        .use("/", express.static("src/http_server/public"))
        .use(cors())
        .use(helmet())
        .use(helmet.referrerPolicy({ policy: "same-origin" }))
        .use(compression());

      return app;
    })
    .build();
