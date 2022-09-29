import { NextFunction, Request, Response } from "express";
import { Product } from "../models/product";

const productController = {
  index: async (req: Request, res: Response, next: NextFunction) => {
    let products = await Product.findAll();
    let message: string = "";
    if (!Array.isArray(products)) {
      products = [];
      message = "Fail to retrieve records.";
    }
    res.render("pages/product/index", {
      message,
      products,
    });
  },

  create: async (req: Request, res: Response, next: NextFunction) => {
    // FIXME
    res.render("pages/product/error", {
      message: "not implemented",
    });
  },

  store: async (req: Request, res: Response, next: NextFunction) => {
    // FIXME
    res.render("pages/product/error", {
      message: "not implemented",
    });
  },

  show: async (req: Request, res: Response, next: NextFunction) => {
    // FIXME
    res.render("pages/product/error", {
      message: "not implemented",
    });
  },

  edit: async (req: Request, res: Response, next: NextFunction) => {
    // FIXME
    res.render("pages/product/error", {
      message: "not implemented",
    });
  },

  update: async (req: Request, res: Response, next: NextFunction) => {
    // FIXME
    res.render("pages/product/error", {
      message: "not implemented",
    });
  },

  destroy: async (req: Request, res: Response, next: NextFunction) => {
    // FIXME
    res.render("pages/product/error", {
      message: "not implemented",
    });
  },
};

export default productController;
