"use strict";

const auth = require("../auth/middleware");

const express = require("express");

const router = (module.exports = new express.Router());

router.get("/system", auth("read"), (req, res) => {
  res.send("Admin only!");
});

router.get("/home", auth("read"), (req, res) => {
  res.send("Admin only!");
});
