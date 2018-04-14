const express = require('express')
const router = express.Router()
const Xray = require('x-ray')
const x = Xray()
const axios = require('axios')

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource')
})

router.post('/tricubo', (req, res) => {
  const stream = x(req.body.url, '.hover', [{
    title: 'h3',
    img: 'img@src',
    link: '.product-loop-title@href',
    price: '.price span',
    stock: '.stock',
    onhot: '.onhost',
    onsale: '.onsale'
  }])
    .paginate('.next@href')
    .stream()
  return stream.pipe(res)
})

router.post('/compragamer', (req, res) => {
  // param nro_max=1000 en get para obtener todos los de la lista sin paginar
  const stream = x(req.body.url, 'div .products__item', [{
    title: 'li h4 a',
    img: 'li img@src',
    link: 'li h4 a@href',
    price: 'li span'
  }])
    .stream()
  return stream.pipe(res)
})

router.post('/make', (req, res) => {
  axios
    .post(req.body.website, {
      url: req.body.url
    })
    .then(response => {
      res.send(response.data)
    })
    .catch(error => {
      res.send(error)
    })
})

module.exports = router
