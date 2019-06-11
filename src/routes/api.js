"use strict";

const auth = require("../auth/middleware");

const express = require("express");

const router = (module.exports = new express.Router());

router.get("/system", auth("admin"), (req, res) => {
  res.send("Admin only!");
});
