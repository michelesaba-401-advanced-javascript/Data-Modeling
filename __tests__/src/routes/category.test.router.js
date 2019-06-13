"use strict";

const { server } = require("../../../src/app.js");
const supergoose = require("../../supergoose.js");

beforeAll(supergoose.startDB);
afterAll(supergoose.stopDB);

const mockRequest = supergoose.server(server);

const User = require("../../../src/auth/users-model");
const Role = require("../../../src/auth/role-model");

const users = {};
beforeAll(async () => {
  await new Role({ role: "user", capabilities: ["read"] }).save();
  await new Role({ role: "editor", capabilities: ["read","create","update"] }).save();
  await new Role({ role: "admin", capabilities: ["read","create","update","delete"] }).save();

  users.user = await new User({ username: "my-user", password: "x", role: "user" }).save();
  users.editor = await new User({ username: "my-editor", password: "x", role: "editor" }).save();
  users.admin = await new User({ username: "my-admin", password: "x", role: "admin" }).save();
});

describe("API Routes", () => {
  describe("/categories", () => {
    it("returns 401 if not authenticated", () => {
      return mockRequest.get("/categories").expect(401);
    });

    it("returns 200 for user with READ capability", async () => {
      await mockRequest
        .get("/categories")
        .set("Authorization", `Bearer ${users.admin.generateToken()}`)
        .expect(200);
    });

    it("returns 401 for POST for user without create", () => {
      return mockRequest
        .post("/categories")
        .set("Authorization", `Bearer ${users.user.generateToken()}`)
        .expect(401);
    });

    let savedCategory;
    it("returns 200 for POST for user with create", () => {
      return mockRequest
        .post("/categories")
        .send({ name: "test!", description: "awesome!" })
        .set("Authorization", `Bearer ${users.admin.generateToken()}`)
        .expect(200)
        .expect(response => {
          console.log("POST body", response.body);
          expect(response.body).toHaveProperty("name", "test!");

          savedCategory = response.body;
        });
    });

    it("returns 404 for DELETE with invalid :id", () => {
      return mockRequest
        .delete("/categories/:id")
        .set("Authorization", `Bearer ${users.admin.generateToken()}`)
        .expect(404);
    });

    it("returns 401 for DELETE with user lacking delete permission", () => {
      return mockRequest
        .delete(`/categories/${savedCategory._id}`)
        .set("Authorization", `Bearer ${users.editor.generateToken()}`)
        .expect(401);
    });

    it("returns 200 for DELETE", () => {
      return mockRequest
        .delete(`/categories/${savedCategory._id}`)
        .set("Authorization", `Bearer ${users.admin.generateToken()}`)
        .expect(200);
    });

    it.skip("returns 200 for UPDATE", () => {
      return mockRequest
        .put("/categories/:id")
        .set("Authorization", `Bearer ${adminUser.generateToken()}`)
        .expect(200);
    });
  });
});
