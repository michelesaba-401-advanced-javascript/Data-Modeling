"use strict";

const auth = require("../auth/middleware");
const express = require("express");

const Products = require("../models/products.js");
const products = new Products();

const productsRouter = (module.exports = new express.Router());

const idCheck = require("../middleware/id-check.js");
productsRouter.param("id", idCheck);

productsRouter.get("/products", auth("read"), getProducts);
productsRouter.post("/products", auth("create"), postProducts);
productsRouter.get("/products/:id", auth("read"), getProduct);
productsRouter.put("/products/:id", auth("update"), putProducts);
productsRouter.delete("/products/:id", auth("delete"), deleteProducts);

function getProducts(request, response, next) {
  // expects an array of objects back
  products
    .getAll()
    .then(data => {
      const output = {
        count: data.length,
        results: data,
      };
      response.status(200).json(output);
    })
    .catch(next);
}

function getProduct(request, response, next) {
  // expects an array with one object in it
  products
    .getbyId(request.params.id)
    .then(result => response.status(200).json(result[0]))
    .catch(next);
}

function postProducts(request, response, next) {
  // expects the record that was just added to the database
  products
    .post(request.body)
    .then(result => response.status(200).json(result))
    .catch(next);
}
// PRODUCT HANDLER FUNCTIONS
function putProducts(request, response, next) {
  // expects the record that was just updated in the database
  products
    .put(request.params.id, request.body)
    .then(result => response.status(200).json(result))
    .catch(next);
}

function deleteProducts(request, response, next) {
  // Expects no return value (the resource should be gone)
  products
    .delete(request.params.id)
    .then(result => response.status(200).json(result))
    .catch(next);
}
