const mongoConnect = require("../util/mongoose-connect");
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost/401d3-people";
const Categories = require("../src/models/categories.js");
const categories = new Categories();
describe("Data-modeling", () => {
  beforeAll(() => {
    return mongoConnect(MONGODB_URI);
  });
  it("should add a new category", async () => {
    var result = await categories.post({
      name: "Turquoise",
      description: "An amazing list of turquoise products.",
    });
    expect(result).toBeDefined();
    expect(result.name).toBe("Turquoise");
    expect(result._id).toBeDefined();
  });
  it("should get category by id", async () => {
    var result = await categories.post({
      name: "Turquoise",
      description: "An amazing list of turquoise products.",
    });

    var getId = await categories.getbyId(result.getId_id);
    expect(getId).toBeDefined();
    expect(result.name).toBe("Turquoise");
  });
});