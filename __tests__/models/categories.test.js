'use strict';

const mongoConnect = require('../../util/mongoose-connect');
const MONGODB_URI = process.env.MONGODB_URI ||
  'mongodb://localhost/401d3-test';

const Categories = require("../../src/models/categories");
const categories = new Categories();

describe('categories', () => {
  beforeAll(() => {
    return mongoConnect(MONGODB_URI);
  });

  let newCategory = null;

  it('should add a new category', async () => {
      var result = await categories.post({
          name: "Jade",
          description: "An amazing list of jade products"
      });
      expect(result).toBeDefined();
      expect(result.name).toBe('Jade');

      newCategory = result;
  });

  it('should fail update an existing category with bad data', () => {
    return expect(categories.update(newCategory._id, {
      name: null,
    })).rejects.toBeDefined();
  });

  it('should update an existing category', async () => {
    var result = await categories.update(newCategory._id, {
      name: "Yellow",
    });

    expect(result).toBeDefined();
    expect(result.name).toBe('Yellow');
  });
});
