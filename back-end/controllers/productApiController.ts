import e, { NextFunction, Request, Response } from "express";
// import logger from "../core/logger";
import { Product, ProductAdd } from "../models/product";

const getPaginatedData = (data: any, page: number, limit: number) => {
  const { count: totalItems, rows: products } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, products, totalPages, currentPage };
};

const productApiController = {
  listing: (req: Request, res: Response, next: NextFunction): void => {
    // logger.info("retrieving product listing");
    console.log("productApiController");
    let size: number = Number(req.query.size);
    if (Number.isNaN(size)) {
      size = 10;
    }
    if (size <= 0) {
      size = 10;
    } else if (size > 25) {
      size = 25;
    }
    let page: number = Number(req.query.page);
    if (Number.isNaN(page)) {
      page = 1;
    }
    if (page <= 0) {
      page = 1;
    }
    let sort: string = String(req.query.sort);
    let dir: string = String(req.query.dir);
    const dirOptions = ["asc", "desc"];
    const sortOptions = [
      "name",
      "code",
      "category",
      "description",
      "brand",
      "type",
      "id",
    ];
    if (!sortOptions.includes(sort)) {
      sort = "id";
    }

    if (!dirOptions.includes(dir)) {
      dir = "desc";
    }

    dir = dir.toUpperCase();
    Product.findAndCountAll({
      offset: (page - 1) * size,
      limit: size,
      order: [[sort, dir]],
    })
      .then((result) => {
        if (result.rows) {
          const response = getPaginatedData(result, page, size);
          res.status(200).json(response);
        } else {
          res.status(200).json([]);
        }
      })
      .catch((err) => {
        // logger.error(JSON.stringify(err));
        res.status(422).json({
          status: false,
          message: "Fail retrieving data!",
          error: err,
        });
      });
  },

  retrieveByCode: (req: Request, res: Response, next: NextFunction): void => {
    // FIXME
    const code: string = req.params.code.trim().toUpperCase();
    Product.findOne({
      where: {
        code,
      },
    })
      .then((result) => {
        if (result) {
          res.status(200).json(result);
        } else {
          res.status(200).json({ status: false, message: "Code not found!" });
        }
      })
      .catch((err) => {
        res.status(422).json({
          status: false,
          message: "Fail retrieving data!",
          error: err,
        });
      });
  },

  createProduct: (req: Request, res: Response, next: NextFunction): void => {
    const { code, name, description, category, brand, type } = req.body;

    if (!code || !name || !category) {
      res.status(403).json({
        status: false,
        message: "Invalid product data!",
      });
      return;
    }
    const regex: RegExp = /^P\d{1,5}$/;
    if (!regex.test(code)) {
      res.status(403).json({
        status: false,
        message: "Invalid product code!",
      });
      return;
    }

    const newProduct = {
      code,
      name,
      category,
      brand,
      type,
      description,
    };

    Product.create(newProduct)
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        console.log(err);
        if (err.name === "SequelizeUniqueConstraintError") {
          return res.status(403).json({
            status: false,
            message: "Product code already exists!",
          });
        }

        return res.status(500).json({
          status: false,
          message: "Fail creating product!",
          error: err.message || "Unknown error",
        });
      });
  },

  updateProduct: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    // find product by code if found update else return error
    const productToUpdate = await Product.findOne({
      where: { code: req.params.code },
    });
    if (!productToUpdate) {
      res.status(404).json({
        status: false,
        message: "Product not found!",
      });
      return;
    }

    // update product data
    productToUpdate.name = req.body.name || productToUpdate.name;
    productToUpdate.category = req.body.category || productToUpdate.category;
    productToUpdate.brand = req.body.brand;
    productToUpdate.type = req.body.type;
    productToUpdate.description = req.body.description;

    // save product to db
    await productToUpdate.save().catch((err) => {
      res.status(500).json({
        status: false,
        message: "Fail updating product!",
        error: err.message || "Unknown error",
      });
    });
    res.status(200).json("Product updated successfully");
  },

  deleteProduct: (req: Request, res: Response, next: NextFunction): void => {
    Product.destroy({
      where: {
        code: req.params.code,
      },
    })
      .then((result) => {
        if (result) {
          res.status(200).json("Product deleted successfully");
        } else {
          res.status(404).json({
            status: false,
            message: "Product not found!",
          });
        }
      })
      .catch((err) => {
        res.status(500).json({
          status: false,
          message: "Fail deleting product!",
          error: err.message || "Unknown error",
        });
      });
  },
};

export default productApiController;
