"use strict";

const { server } = require("../../../src/app.js");
const supergoose = require("../../supergoose.js");

beforeAll(supergoose.startDB);
afterAll(supergoose.stopDB);

const mockRequest = supergoose.server(server);

const User = require("../../../src/auth/users-model");
const Role = require("../../../src/auth/role-model");

describe("API Routes", () => {
  describe("/system", () => {
    it("returns 401 if not authenticated", () => {
      return mockRequest.get("/products").expect(401);
    });

    it("returns 401 for user without read capability", async () => {
      await new Role({
        role: "user",
        capabilities: ["update"],
      }).save();

      var nonReadUser = await new User({
        username: "Michele",
        password: "HelloWorld123",
        role: "editor",
      }).save();

      await mockRequest
        .get("/system")
        .set("Authorization", `Bearer ${nonReadUser.generateToken()}`)
        .expect(401);
    });
    var adminUser;
    it("returns 200 for user with system capability", async () => {
      await new Role({
        role: "admin",
        capabilities: ["read", "update"],
      }).save();

      adminUser = await new User({
        username: "Lily",
        password: "12345678",
        role: "admin",
      }).save();

      await mockRequest
        .get("/system")
        .set("Authorization", `Bearer ${adminUser.generateToken()}`)
        .expect(200);
    });

    it("returns 404 for POST", () => {
      return mockRequest
        .post("/system")
        .set("Authorization", `Bearer ${adminUser.generateToken()}`)
        .expect(404);
    });
  });
});
