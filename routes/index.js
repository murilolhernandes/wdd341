const express = require('express');

// const indexController = require('../controllers');

const router = express.Router();

router.use('/', require('./swagger'));

// router.get('/', indexController.index);
router.get('/', (req, res) => {
  //#swagger.tags=['Hello World']
  res.send('Hello World');
});
router.use('/contacts', require('./contacts'));

module.exports = router;