"use strict";
const Product = require("./products-schema.js");
const uuid = require("uuid/v4");

class ProductsRepo {
    getAll() {
        return Product.find();
      }

  get(id) {
    return Product.find();
  }

  post(product) {
    var newProduct = new Product(product);
    return newProduct.save();
  }

  put(id, entry) {
      return Product.updateOne();
  }

  delete(id) {
    return Product.deleteOne();
  }

  sanitize(entry) {}
}

module.exports = ProductsRepo;
