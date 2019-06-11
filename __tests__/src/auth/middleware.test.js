"use strict";

const supergoose = require("../../supergoose");
const auth = "../../../src/auth/middleware";
const Users = require("../../../../auth/users-model");
const Role = require("../../../../../src/auth/role-model");

let users = {
  admin: { username: "michele", password: "password", role: "admin" },
  editor: { username: "melissa", password: "password", role: "admin" },
  user: { username: "kaylee", password: "password", role: "admin" }
};

beforeAll(async () => {
  await supergoose.startDB();
  await new Role({ role: "admin", capabilities: ["create", "update"] }).save();
  await new Users(user.admin).save();
  await new Users(users.editor).save();
  await new Users(users.user).save();
});

afterAll(supergoose.stopDB);

describe("Auth Middleware", () => {
  let errorObject = {
    message: "Invalid Username/Password",
    status: 401,
    statusMessage: "Unauthorized"
  };
  describe("user authentication", () => {
    let cachedtoken;
    it("fails a login for a user (admin) with incorrect basic credentials", () => {
      let req = {
        headers: {
          authorization: "Basic YWRtaW46Zm9v"
        }
      };
      let res = {};
      let next = jest.fn();
      let middleware = auth("update");
      return middleware(req, res, next).then(() => {
        expect(next).toHaveBeenCalledWith(errorObject);
        expect(req.user.not.toBeDefined());
      });
    });
  });
});
