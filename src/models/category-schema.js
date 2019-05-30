'use strict'

const mongoose = require('mongoose');

const catagorySchema = mongoose.Schema({
    name: {type: String, required: true}
})

const Catagory = mongoose.models.catagories || mongoose.model('catagory', catagorySchema);

module.exports = Catagory;