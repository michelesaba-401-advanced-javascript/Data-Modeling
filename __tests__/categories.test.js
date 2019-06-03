const mongoConnect = require("../util/mongoose-connect");
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost/401d3-people";
const Categories = require("../src/models/categories.js");
const categories = new Categories();
let newId;
let newName;
describe("Data-modeling", () => {
  beforeAll(() => {
    return mongoConnect(MONGODB_URI);
  });
  it("should add a new category", async () => {
    var result = await categories.post({
      name: "Turquoise",
      description: "An amazing list of turquoise products."
    });
    newId = result._id;
    newName = result.name;
    expect(result).toBeDefined();
    expect(result.name).toBe('Turquoise');
    expect(result._id).toBeDefined();
  });
  it("should get category by id", async () => {
    var result = await categories.getbyId(newId);
    console.log(newId);
    expect(result).toBeDefined();
    expect(newName).toBe("Turquoise");
  });
  // it("should add delete an entry", async () => {
  //   var result = await categories.delete(newId);
  //   expect(result).toBeDefined();
  // });
  // it("should update an existing category", async () => {
  //   var result = await categories.update(newCategory._id, {
  //     name: "Yellow"
  //   });
  //   expect(result).toBeDefined();
  //   expect(result.name).toBe('Yellow');
  // });
});
