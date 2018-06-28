var express = require('express')
var router = express.Router()
const {promisify} = require('util')

var redis = require('async-redis'),
  redisClient = redis.createClient()

/* POST add to wishlist. */
router.post('/addToWishlist/:user', function(req, res, next) {
  redisClient.sadd('pgweb:wishlist:'+req.params.user, req.body.id).then(_ =>
    res.send('ok!')
  )
})
/* POST remove wishlist. */
router.post('/removeFromWishlist/:user', function(req, res, next) {
  redisClient.srem('pgweb:wishlist:'+req.params.user, req.body.id).then(_ =>
    res.send('ok!')
  )
})

/* GET wishlist. */
router.get('/getWishlist/:user', function(req, res, next) {
  redisClient.smembers('pgweb:wishlist:'+req.params.user)
    .then(_ => res.send(JSON.stringify(_)))
})

/* POST init cart. */
router.post('/initCart', function(req, res, next) {
  const key = 'pgweb:cart:' + req.body.user
  redisClient.get(key)
    .then(cart => {
        if (cart && !JSON.parse(cart).paid) {
          console.log(cart)
          res.send(JSON.stringify(JSON.parse(cart).shoppingCart))
        } else {
          const newCart = {shoppingCart:{id:req.body.user}}
          redisClient.set(key, JSON.stringify(newCart)).then( cart => {
            res.send(JSON.stringify(newCart.shoppingCart))
          })
        }
      }
    )
})

/* POST update cart. */
router.post('/updateCart', function(req, res, next) {
  redisClient.set('pgweb:cart:' + req.body.shoppingCart.id, JSON.stringify(req.body))
    .then(id =>
      res.send('OK!')
    )
})
/* POST paid cart. */
router.post('/payCart/:id', function(req, res, next) {
  const redisKey = 'pgweb:cart:' + req.params.id
  redisClient.get(redisKey)
    .then(_ => JSON.parse(_))
    .then(_ => redisClient.set(redisKey, JSON.stringify({..._, paid: true})))
    .then(id =>
      res.send('ok')
    )
})

/* GET carts ids */
router.get('/carts/', function(req, res, next) {
  redisClient.keys('pgweb:cart:*')
    .then(keys =>
      res.send(JSON.stringify({carts: keys.map(_ => _.replace('pgweb:cart:', ''))}))
    )
})
/* GET single cart. */
router.get('/carts/:id', function(req, res, next) {
  console.log('pgweb:cart:' + req.params.id)
  redisClient.get('pgweb:cart:' + req.params.id)
    .then(cart =>
      console.log(cart) ||
      res.send(JSON.stringify(cart))
    )
})

module.exports = router
