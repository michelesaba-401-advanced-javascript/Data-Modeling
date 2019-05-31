"use strict";

const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true }
});

const Product =
  mongoose.models.product || mongoose.model("product", productSchema);

module.exports = Product;
