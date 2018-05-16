var express = require('express');
var router = express.Router();
const {promisify} = require('util');

var redis = require("async-redis"),
redisClient = redis.createClient();

/* GET home page. */
router.post('/addToWishlist', function(req, res, next) {
  redisClient.sadd('pgweb:wishlist',req.body.id).then( _ =>
    res.send("ok!")
  )
});
/* GET home page. */
router.post('/removeFromWishlist', function(req, res, next) {
  redisClient.srem('pgweb:wishlist',req.body.id).then( _ =>
    res.send("ok!")
  )
});
/* GET home page. */
router.get('/getWishlist', function(req, res, next) {
  redisClient.smembers('pgweb:wishlist')
    .then( _ => res.send(_.map(Number)))
});

module.exports = router;
