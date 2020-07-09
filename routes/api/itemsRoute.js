const express = require('express');
const router = express.Router();

// Item Model
const Item = require('../../models/ItemModel');


/**------------------------------------ GET ALL Items --------------------------------------------- */

// @route GET api/items
// @desc GET all items
// @access Public
router.get('/', (req, res) => {

    Item.find()
        .sort({date: -1})
        .then(items => { res.json(items) });

});

/**------------------------------------ GET Item -------------------------------------------------- */

// @route GET api/items
// @desc GET item
// @access Public
router.get('/:id', (req, res) => {

    Item.findById(req.params.id)
        .then(items => { res.json(items) })
        .catch(err => res.status(404).json({success: false}));

});

/**------------------------------------ POST Item ------------------------------------------------- */

// @route POST api/items
// @desc Create a item
// @access Public
router.post('/', (req, res) => {

    const newItem = new Item({
        name: req.body.name
    });

    newItem.save().then(item => res.json(item));

});

/**------------------------------------ DELETE Item ----------------------------------------------- */

// @route DELETE api/items/:id
// @desc Delete a item
// @access Public
router.delete('/:id', (req, res) => {

    Item.findById(req.params.id)
        .then(item => item.remove().then(() => res.json({success: true})))
        .catch(err => res.status(404).json({success: false}));
})



module.exports = router;