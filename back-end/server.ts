import express, { Application } from "express";
import * as routes from "./routes";
import webRoutes from "./routes/web";
import apiRoutes from "./routes/api";
import cors from "cors";

const server: Application = express();
server.use(cors());
server.use(express.json());

routes.register(server);
server.use("/", webRoutes);
server.use("/api", apiRoutes);
export default server;
