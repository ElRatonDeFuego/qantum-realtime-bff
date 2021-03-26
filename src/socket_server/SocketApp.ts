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
import { inject, injectable } from "inversify";
import * as SocketIO from "socket.io";
import { SensorDataItem } from "../grpc_client/types/qantum_pb";
import { HTTPApp } from "../http_server/HTTPApp";

@injectable()
export class SocketApp {
  private readonly connectedSockets: {
    [socketID: string]: SocketIO.Socket;
  } = {};
  private socketIOInstance?: SocketIO.Server;

  public constructor(
    @inject(HTTPApp)
    private readonly httpApp: HTTPApp,
    @inject(Logger)
    private readonly logger: Logger,

    @inject(SocketIO.Server)
    private readonly socketIO: SocketIO.Server
  ) {}

  public start() {
    if (this.httpApp.server) {
      this.logger.info("Starting Socket.IO server");

      this.socketIOInstance = this.socketIO.listen(this.httpApp.server, {
        cors: { methods: ["GET", "POST"], origin: "*" },
      });

      this.socketIOInstance.on("connection", (socket) => {
        this.connectedSockets[socket.id] = socket;
        this.logger.info(`[socket ID "${socket.id}"] client connected`);

        socket.on("disconnect", () => {
          // tslint:disable-next-line: no-dynamic-delete
          delete this.connectedSockets[socket.id];
          this.logger.info(`[socket ID "${socket.id}"] client disconnected`);
        });
      });
    } else {
      setTimeout(() => {
        this.start();
      }, 10000);
    }
  }

  public sendData(data: SensorDataItem) {
    const sockets = Object.values(this.connectedSockets);

    if (sockets.length > 0) {
      sockets.forEach((socket) => {
        socket.emit("SENSOR_DATA", data);
      });
    }
  }
}
