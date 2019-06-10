'use strict';
const Product = require('./products-schema.js');
const uuid = require('uuid/v4');

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

  delete(id) {
    return Product.deleteOne();
  }

  sanitize(entry) {}
}

module.exports = ProductsRepo;
