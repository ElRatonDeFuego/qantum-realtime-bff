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

import { default as express } from "express";
import {
  controller,
  httpGet,
  interfaces,
  response,
} from "inversify-express-utils";

@controller("/status")
export class StatusController implements interfaces.Controller {
  @httpGet("/")
  public getStatus(@response() res: express.Response) {
    res.json({
      PID: process.pid,
      status: "OK",
    });
  }
}
