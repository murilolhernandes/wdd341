const express = require('express');
const router = express.Router();

const indexController = require("../controllers");

router.get('/', indexController.getAll);

router.get('/:id', indexController.getSingle);

router.post('/', indexController.addContact);

router.put('/:id', indexController.updateContact);

router.delete('/:id', indexController.deleteContact);

module.exports = router;