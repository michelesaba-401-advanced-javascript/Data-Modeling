"use strict";

const auth = require("../auth/middleware");
const express = require("express");

const Categories = require("../models/categories.js");
const categories = new Categories();

const categoryRouter = (module.exports = new express.Router());

categoryRouter.use(express.static("./public"));
categoryRouter.get("/categories", auth("update"), getCategories);
categoryRouter.post("/categories", postCategories);
categoryRouter.get("/categories/:id", getCategory);
categoryRouter.put("/categories/:id", putCategories);
categoryRouter.delete("/categories/:id", deleteCategories);

function getCategories(request, response, next) {
  categories
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

function getCategory(request, response, next) {
  // expects an array with the one matching record from the model
  categories
    .getbyId(request.params.id)
    .then(result => response.status(200).json(result[0]))
    .catch(next);
}

function postCategories(request, response, next) {
  // expects the record that was just added to the database
  categories
    .post(request.body)
    .then(result => response.status(200).json(result[0]))
    .catch(next);
}

function putCategories(request, response, next) {
  // expects the record that was just updated in the database
  categories
    .update(request.params.id, request.body)
    .then(result => response.status(200).json(result[0]))
    .catch(next);
}

function deleteCategories(request, response, next) {
  // Expects no return value (resource was deleted)
  categories
    .delete(request.params.id)
    .then(result => response.status(200).json(result))
    .catch(next);
}
