"use strict";
const Product = require("./products-schema.js");

class ProductsRepo {
  getAll() {
    return Product.find();
  }

  getbyId(_id) {
    return Product.find(_id);
  }

  post(product) {
    var newProduct = new Product(product);
    return newProduct.save();
  }

  // put(id, entry) {
  //   return Product.updateOne();
  // }

  delete(_id) {
    return Product.deleteOne({ _id }).then(result => {
      console.log(result);
    });
  }

  sanitize() {}
}

module.exports = ProductsRepo;
