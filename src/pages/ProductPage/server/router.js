const router = require('express').Router();
const controller = require('./controller.js');

router.route('/product')
  .get(controller.getProduct)

router.route('/sellerId/products')
  .get(controller.getAllProducts)

router.route('/similar')
  .get(controller.getAllSimilar)


module.exports = router;