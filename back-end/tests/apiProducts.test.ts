import request from "supertest";

import server from "./../server";

describe("API Products endpoints", () => {
  it("Should return a list with records", async () => {
    const res = await request(server).get("/api/products");
    expect(res.statusCode).toEqual(200);
  });

  it("Should return a list with no record", async () => {
    const res = await request(server).get("/api/products?page=50");
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toEqual(0);
  });

  it("should create new product", async () => {
    const res = await request(server).post("/api/products").send({
      code: "P101",
      name: "Tall Basket",
      category: "Home Decoration",
      brand: null,
      type: null,
      description: "The next super product of the year.",
    });
    expect(res.status).toEqual(200);
  });

  it("should update existing product", async () => {
    const res = await request(server).put("/api/products/P001").send({
      description: "update description",
    });
    expect(res.status).toEqual(200);
  });

  it("should delete existing product", async () => {
    const res = await request(server).delete("/api/products/P101");
    expect(res.status).toEqual(200);
    expect(res.body).toEqual("Product deleted successfully");
  });

  //Missing :code when updating product
  it("should return error when updating product", async () => {
    const res = await request(server).put("/api/products").send({
      description: "update description",
    });
    expect(res.status).toEqual(404);
  });

  //Missing :code when deleting product
  it("should return error when deleting product", async () => {
    const res = await request(server).delete("/api/products");
    expect(res.status).toEqual(404);
  });

  //Record not found scenarios
  //Update
  it("should return error when updating product", async () => {
    const res = await request(server).put("/api/products/P999").send({
      description: "update description",
    });
    expect(res.status).toEqual(404);
  });

  //Delete
  it("should return error when deleting product", async () => {
    const res = await request(server).delete("/api/products/P999");
    expect(res.status).toEqual(404);
  });

  //Invalid data scenarios
  //Create product with duplicate code
  it("should return error when creating product", async () => {
    const res = await request(server).post("/api/products").send({
      code: "P001",
      name: "Tall Basket",
      category: "Home Decoration",
      brand: null,
      type: null,
      description: "The next super product of the year.",
    });
    expect(res.status).toEqual(403);
  });
  //Create product with null required fields
  it("should return error when creating product", async () => {
    const res = await request(server).post("/api/products").send({
      code: "P109",
      name: null,
      category: "Home Decoration",
      brand: null,
      type: null,
      description: "The next super product of the year.",
    });
    expect(res.status).toEqual(403);
    expect(res.body.message).toEqual("Invalid product data!");
  });

  //Create product with wrong code format
  it("should return error when creating product", async () => {
    const res = await request(server).post("/api/products").send({
      code: "ABCD1099",
      name: "Tall Basket",
      category: "Home Decoration",
      brand: null,
      type: null,
      description: "The next super product of the year.",
    });
    expect(res.status).toEqual(403);
    expect(res.body.message).toEqual("Invalid product code!");
  });
});
