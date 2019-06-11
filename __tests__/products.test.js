const mongoConnect = require("../util/mongoose-connect");
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost/401d3-people";
const Products = require("../src/models/products.js");
const products = new Products();
let newId;
let newName;

describe("Data-modeling", () => {
  beforeAll(() => {
    return mongoConnect(MONGODB_URI);
  });
  it("should add a new product", async () => {
    var result = await products.post({
      name: "Fuzzy Blanket",
      description: "A super soft & fuzzy blanket ."
    });
    newId = result._id;
    newName = result.name;
    expect(result).toBeDefined();
    expect(newName).toBe("Fuzzy Blanket");
    expect(result._id).toBeDefined();
  });
  it("should get product by id", async () => {
    var result = await products.getbyId(newId);
    expect(result).toBeDefined();
    expect(newName).toBe("Fuzzy Blanket");
  });
  it("should add delete an entry", async () => {
    var result = await products.delete(newId);
    expect(result).toBeDefined();
  });
});
