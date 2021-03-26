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

import "reflect-metadata";
// IMPORTANT: leave the empty line below

import pjson from "pjson";
import { GrpcApp } from "./grpc_client/GrpcApp";
import { HTTPApp } from "./http_server/HTTPApp";
import { container } from "./ioc/Container";
import { SocketApp } from "./socket_server/SocketApp";

try {
  const grpcApp = container.get(GrpcApp);
  const httpApp = container.get(HTTPApp);
  const socketApp = container.get(SocketApp);

  // Keep the order below: httpApp, then socketApp, then grpcApp
  httpApp.start();
  socketApp.start();
  grpcApp.start();
  //
} catch (error) {
  // tslint:disable-next-line: no-console
  console.error(
    `\n${pjson.name} exiting on fatal error:\n\n${(error as Error).message}\n\n`
  );

  process.exit(1);
}
