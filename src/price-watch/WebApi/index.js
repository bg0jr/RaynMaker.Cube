const express = require('express')
const cors = require('cors')
const axios = require('axios')
const store = require('./store.js')

const app = express()
const port = 8001

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

  const prices = []

  try {
    const { data } = await api.get('/v1/cryptocurrency/quotes/latest', {
      params: {
        id: Object.values(store.coins).join(','),
        convert: 'EUR'
      }
    })

    Object.keys(store.coins).forEach((coin) =>
      prices.push({
        name: coin,
        value: data.data[store.coins[coin]].quote.EUR.price,
        currency: 'EUR'
      })
    )
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

  const prices = []

  try {
    const { data } = await api.get('/eod/latest', {
      params: {
        access_key: process.env.MARKETSTACK_API_KEY,
        symbols: Object.values(store.stocks).join(',')
      }
    })

    Object.keys(store.stocks).forEach((symbol) =>
      prices.push({
        name: symbol,
        value: data.data.find((x) => x.symbol === store.stocks[symbol]).close,
        currency: "EUR"
      })
    )
  } catch (error) {
    prices.push({ error: error.message })
  }

  res.json(prices)
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})
