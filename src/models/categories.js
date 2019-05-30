"use strict";
const Catagory = require('./category-schema.js');

class CategoryRepo {
  constructor() {
    
  }

  get(_id) {
    
  }

  post(catagory) {
    var newCatagory = new Category(categories);
    return newCatagory.save();
  }


  put(_id, record) {

  }

  delete(_id) {

  }
}

module.exports = CategoryRepo;
