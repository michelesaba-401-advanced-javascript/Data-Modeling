const mongoConnect = require("../util/mongoose-connect");
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost/401d3-people";
const Products = require("../src/models/products.js");
const products = new Products();

describe("Data-modeling", () => {
  beforeAll(() => {
    return mongoConnect(MONGODB_URI);
  });
  it("should add a new product", async () => {
    var result = await products.post({
      name: "Fuzzy Blanket",
      description: "A super soft & fuzzy blanket .",
    });
    expect(result).toBeDefined();
    expect(result.name).toBe("Fuzzy Blanket");
    expect(result._id).toBeDefined();
  });
  it("should get category by id", async () => {
    var result = await products.post({
      name: "Turquoise",
      description: "An amazing list of turquoise products.",
    });

    var getId = await products.getbyId(result.getId_id);
    expect(getId).toBeDefined();
    expect(result.name).toBe("Turquoise");
  });
  it("should delete an entry", async () => {
    var result = await products.post({
      name: "Fuzzy Blanket",
      description: "A super soft & fuzzy blanket .",
    });
    console.log(result._id);
    var deleteItem = await products.delete(result._id);
    console.log(result._id);
    expect({ deleteItem }).toBeDefined();
  });
});
