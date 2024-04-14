const express = require('express')
const cors = require('cors')
const axios = require('axios')
const fs = require('fs')
const https = require('https')

const configHome = process.env.RAYNMAKER_CONFIG
const key = fs.readFileSync(`${configHome}/selfsigned.key`);
const cert = fs.readFileSync(`${configHome}/selfsigned.crt`);

const app = express()
const server = https.createServer({key: key, cert: cert }, app);

const port = 8001
const httpsPort = 8002

app.use(express.static('public'))
app.use(cors())

app.get('/api/crypto', async (req, res) => {
  const api = axios.create({
    baseURL: 'https://pro-api.coinmarketcap.com',
    withCredentials: false,
    headers: {
      'X-CMC_PRO_API_KEY': process.env.COINMARKETCAP_API_KEY
    }
  })

  const store = require('./store.js')

  const prices = []

  try {
    const { data } = await api.get('/v1/cryptocurrency/quotes/latest', {
      params: {
        id: store.coins.map((x) => x.id).join(','),
        convert: 'EUR'
      }
    })

    for (const coin of store.coins) {
      const price = data.data[coin.id].quote.EUR.price
      prices.push({
        name: coin.name,
        value: price,
        buyingPrice: coin.buyingPrice ?? '-',
        profit: coin.buyingPrice ? (price - coin.buyingPrice) / coin.buyingPrice * 100 : '-',
        currency: 'EUR'
      })
    }
  } catch (error) {
    prices.push({ error: error.message })
  }

  res.json(prices)
})

app.get('/api/stocks', async (req, res) => {
  const api = axios.create({
    baseURL: 'http://api.marketstack.com/v1/',
    withCredentials: false
  })

  const store = require('./store.js')
  const prices = []

  try {
    const { data } = await api.get('/eod/latest', {
      params: {
        access_key: process.env.MARKETSTACK_API_KEY,
        symbols: store.stocks.map((x) => x.id).join(',')
      }
    })

    for (const symbol of store.stocks) {
      const price = data.data.find((x) => x.symbol === symbol.id).close
      prices.push({
        name: symbol.name,
        value: price,
        buyingPrice: symbol.buyingPrice ?? '-',
        profit: symbol.buyingPrice ? (price - symbol.buyingPrice) / symbol.buyingPrice * 100 : '-',
        currency: 'EUR'
      })
    }
  } catch (error) {
    prices.push({ error: error.message })
  }

  res.json(prices)
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})

server.listen(httpsPort, function () {
  console.log(`Listening at https://localhost:${httpsPort}`)
})