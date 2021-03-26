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
import { Container } from "inversify";
import * as SocketIO from "socket.io";
import { GrpcApp } from "../grpc_client/GrpcApp";
import "../http_server/controllers/StatusController";
import { HTTPApp } from "../http_server/HTTPApp";
import { expressApplicationFactory } from "../ioc/factories/expressApplicationFactory";
import { loggerFactory } from "../ioc/factories/loggerFactory";
import symbols from "../ioc/Symbols";
import { SocketApp } from "../socket_server/SocketApp";
import * as env from "../utils/Env";

const container = new Container();

Object.keys(env).forEach((envVar) => {
  if (symbols[envVar]) {
    container.bind(symbols[envVar]).toConstantValue((env as env.Env)[envVar]);
  }
});

container
  .bind(symbols.ExpressApplication)
  .toDynamicValue(expressApplicationFactory)
  .inSingletonScope();

container.bind(symbols.Grpc).toConstantValue(grpc);

container.bind(GrpcApp).to(GrpcApp).inSingletonScope();

container.bind(HTTPApp).to(HTTPApp).inSingletonScope();

container.bind(Logger).toDynamicValue(loggerFactory).inSingletonScope();

container.bind(SocketApp).to(SocketApp).inSingletonScope();

container
  .bind(SocketIO.Server)
  .toDynamicValue(() => new SocketIO.Server())
  .inSingletonScope();

export { container };
