import { NextFunction, Request, Response } from "express";
import path from "path";
// import logger from "../core/logger";

const homeController = {
  homePage: (req: Request, res: Response, next: NextFunction): void => {
    const result = {
      name: null,
    } as any;
    if (req.query.name) {
      result.name = req.query.name;
    }
    // logger.debug("result => " + JSON.stringify(result));
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  },
};

export default homeController;
