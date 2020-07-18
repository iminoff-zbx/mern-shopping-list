const express = require('express');
const router = express.Router();
const auth = require('../../middleware/authMiddleware');

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

/**------------------------------------ PUT Item -------------------------------------------------- */

// @route PUT api/items
// @desc PUT item
// @access Private
router.put('/:id', auth, async (req, res) => {

    const id = req.params.id;
    let itemUpdate = await Item.findOneAndUpdate(id, {name: req.body.name}, {new: true});
    itemUpdate.save().then(item => res.json(item));    

});

/**------------------------------------ POST Item ------------------------------------------------- */

// @route POST api/items
// @desc Create a item
// @access Private
router.post('/', auth, (req, res) => {

    const newItem = new Item({
        name: req.body.name
    });

    newItem.save().then(item => res.json(item));

});

/**------------------------------------ DELETE Item ----------------------------------------------- */

// @route DELETE api/items/:id
// @desc Delete a item
// @access Private
router.delete('/:id', auth, (req, res) => {

    Item.findById(req.params.id)
        .then(item => item.remove().then(() => res.json({success: true})))
        .catch(err => res.status(404).json({success: false}));
})



module.exports = router;