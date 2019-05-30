"use strict";
const Category = require("./category-schema.js");

class CategoryRepo {
  getAll() {
    return Category.find();
  }
  get(_id) {
   
  }

  post(categories) {
    var newCategory = new Category(categories);
    return newCategory.save();
  }

  put(_id, record) {}

  delete(_id) {}
}

module.exports = CategoryRepo;
