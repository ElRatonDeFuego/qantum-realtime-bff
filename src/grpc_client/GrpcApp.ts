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
import grpc from "grpc";
import { inject, injectable } from "inversify";
import symbols from "../ioc/Symbols";
import { SocketApp } from "../socket_server/SocketApp";
import { SensorsClient } from "./types/qantum_grpc_pb";
import { SensorDataItem } from "./types/qantum_pb";

@injectable()
export class GrpcApp {
  public constructor(
    @inject(symbols.Grpc)
    private readonly gRPC: typeof grpc,
    @inject(symbols.GRPC_SERVER)
    private readonly grpcServer: string,
    @inject(Logger)
    private readonly logger: Logger,
    @inject(SocketApp)
    private readonly socketApp: SocketApp
  ) {}

  public start() {
    const grpcClient = new SensorsClient(
      this.grpcServer,
      this.gRPC.credentials.createInsecure()
    );

    this.logger.info(`Starting gRPC client call to ${this.grpcServer}`);

    const grpcCall = grpcClient.sensorData();

    grpcCall.on("end", () => {
      this.logger.info("The gRPC server ended the call");

      setTimeout(() => {
        this.start();
      }, 5000);
    });

    grpcCall.on("error", (error: Error & { code: number }) => {
      if (!(error.code === 2 || error.code === 14)) {
        throw error;
      }

      if (error.code === 14) {
        this.logger.error(`Can't connect to gRPC server ${this.grpcServer}`);
      } else if (error.code === 2) {
        this.logger.error(`Stream removed by gRPC server ${this.grpcServer}`);
      }

      setTimeout(() => {
        this.start();
      }, 5000);
    });

    grpcCall.on("data", (data: SensorDataItem) => {
      this.socketApp.sendData(data);
    });
  }
}
