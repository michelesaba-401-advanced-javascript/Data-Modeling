"use strict";
const Category = require("./category-schema.js");

class CategoryRepo {
  getAll() {
    return Promise.resolve(Category.find());
  }
  async getbyId(_id) {
    return await Category.find();
  }
  post(categories) {
    var newCategory = new Category(categories);
    return newCategory.save();
  }

  async update(_id, entry) {
    let docToUpdate = await Category.findOne({ _id })

    console.log('before assign', docToUpdate);
    Object.assign(docToUpdate, entry)
    console.log('after assign', docToUpdate);

    return await docToUpdate.save()

//   async update(_id, entry) {
//     let docToUpdate = await Category.findOne({ _id });
//     Object.assign(docToUpdate, entry);
//     return await docToUpdate.save();
  }
  delete(_id) {
    return Category.deleteOne();
  }
}

module.exports = CategoryRepo;
