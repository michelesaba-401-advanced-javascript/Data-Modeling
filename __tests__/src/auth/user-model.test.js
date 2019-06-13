"use strict";

const supergoose = require("../../supergoose");

const User = require("../../../src/auth/users-model");
const Role = require("../../../src/auth/role-model");

beforeAll(supergoose.startDB);
afterAll(supergoose.stopDB);

describe("User Model", () => {
  describe("findOne", () => {
    it("populates acl", async () => {
      // Arrange
      await new User({
        username: "michele",
        password: "helloWorld123",
        role: "editor",
      }).save();
      await new Role({
        role: "editor",
        capabilities: ["create", "read", "update"],
      }).save();

      // Act
      let user = await User.findOne({ username: "michele" });

      // Assert
      expect(user).toBeDefined();
      expect(user.acl).toBeDefined();
      expect(user.acl.capabilities.toObject()).toEqual([
        "create",
        "read",
        "update",
      ]);

      expect(user.can("create")).toBe(true);
      expect(user.can("read")).toBe(true);
      expect(user.can("update")).toBe(true);

      expect(user.can("delete")).toBe(false);
    });
  });
});
