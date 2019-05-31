"use strict";
const Category = require("./category-schema.js");

class CategoryRepo {
  getAll() {
    return Promise.resolve(Category.find());
  }
  getbyId(_id) {
    return Category.find();
  }

  post(categories) {
    var newCategory = new Category(categories);
    return newCategory.save();
  }

  update(_id, entry) {
    return Category.updateOne();
  }

  delete(_id) {
    return Category.deleteOne();
  }
}

module.exports = CategoryRepo;
