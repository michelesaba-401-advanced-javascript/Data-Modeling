"use strict";
const Category = require("./category-schema.js");

class CategoryRepo {
  getAll() {
    return Category.find();
  }
  getbyId(_id) {
    return Category.find();
  }

  post(categories) {
    var newCategory = new Category(categories);
    return newCategory.save();
  }

  update(_id, categories) {
    return Category.updateOne();
  }

  delete(_id) {
    return Category.deleteOne();
  }
}

module.exports = CategoryRepo;
