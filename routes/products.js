const express = require('express')
const router = express.Router()
const Xray = require('x-ray')
const x = Xray()

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource')
})

router.get('/placas', (req, res) => {
  const stream = x('http://www.tricubo.com.ar/categoria-producto/placas-de-video/', '.hover', [{
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
  stream.pipe(res)
})

router.get('/make', (req, res) => {
  console.log(asyncFetch('http://localhost:3000/productos/placas'))
})

async function asyncFetch (url) {
  let response = await fetch(url)
  if (response.ok) return await response.json()
  throw new Error(response.status)
}

module.exports = router
