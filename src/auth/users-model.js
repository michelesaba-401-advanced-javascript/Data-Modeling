"use strict";

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Role = require('./role-model');

const users = new mongoose.Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  email: {type: String},
  role: {type: String, required:true, default:'user', enum:['admin','editor','user'] },
  // TODO: the above enum is not going to work long-term
  // Something like this would be more appropriate:
  // role: { type: mongoose.Types.ObjectId, ref: Role.schema },
}, { toObject: { virtuals: true }, toJSON: { virtuals: true } });

users.virtual("acl", {
  ref: "roles",
  localField: "role",
  foreignField: "role",
  justOne: true
});

users.pre("findOne", function() {
  this.populate("acl");
});

users.pre("save", function(next) {
  bcrypt
    .hash(this.password, 10)
    .then(hashedPassword => {
      this.password = hashedPassword;
      next();
    })
    .catch(error => {
      throw error;
    });
});

users.statics.authenticateToken = async function(token) {
  try {
    let parsedToken = jwt.verify(token, process.env.SECRET || "changeit");
    let query = { _id: parsedToken.id };
    return this.findOne(query);
  } catch {
    return null;
  }
};

users.statics.authenticateBasic = function(auth) {
  let query = { username: auth.username };
  return this.findOne(query)
    .then(user => user && user.comparePassword(auth.password))
    .catch(console.error);
};

// Compare a plain text password against the hashed one we have saved
users.methods.comparePassword = function(password) {
  return bcrypt
    .compare(password, this.password)
    .then(valid => (valid ? this : null));
};

// Generate a JWT from the user id and a secret
users.methods.generateToken = function() {
  let tokenData = {
    id: this._id,
    capabilities: (this.acl && this.acl.capabilities) || []
  };
  return jwt.sign(tokenData, process.env.SECRET || "changeit");
};

users.methods.can = function(capability) {
  if (!this.acl || !this.capabilities) return false;

  return this.acl.capabilities.includes(capability);
};

module.exports = mongoose.model("users", users);
