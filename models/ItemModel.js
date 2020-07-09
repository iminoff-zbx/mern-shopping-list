const mongoose = require('mongoose');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ItemSchema = new Schema({

    name: {
        type: String,
        require: true
    },

    data: {
        type: Date,
        default: Date.now
    }

});

    const Item = mongoose.model('item', ItemSchema);

module.exports = Item;