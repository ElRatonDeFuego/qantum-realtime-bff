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
import { Application } from "express";
import http from "http";
import { inject, injectable } from "inversify";
import symbols from "../ioc/Symbols";

@injectable()
export class HTTPApp {
  private httpServer?: http.Server;

  public constructor(
    @inject(symbols.ExpressApplication)
    private readonly expressServer: Application,
    @inject(Logger)
    private readonly logger: Logger,
    @inject(symbols.PORT)
    private readonly port: number
  ) {}

  public get server() {
    return this.httpServer;
  }

  public start() {
    this.httpServer = this.expressServer
      .listen(this.port, "0.0.0.0", () => {
        this.logger.info(`Starting HTTP server on port ${this.port}`);
      })
      .on("error", (error) => {
        this.logger.fatal(error);

        throw error;
      });
  }
}
