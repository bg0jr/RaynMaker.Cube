const fs = require('fs')
const path = require('path')

const configHome = process.env.RAYNMAKER_CONFIG

let config = {
  coins: [],
  stocks: []
}

if (configHome) {
  const fullPath = path.join(configHome, 'price-watch.json')

  if (fs.existsSync(fullPath)) {
    const rawData = fs.readFileSync(fullPath)
    config = JSON.parse(rawData)
    console.log('Config loaded from', fullPath)
  } else {
    console.log('No configuration found at', fullPath)
  }
}

// id is CoinMarketCap internal ID
const coins = {
  Bitcoin: '1',
  Etherium: '1027',
  Cardano: '2010'
}

config.coins.forEach((x) => (coins[x.name] = x.id))

const stocks = {
  Siemens: 'SIE.XETRA'
}

config.stocks.forEach((x) => (stocks[x.name] = x.id))

exports.coins = coins
exports.stocks = stocks
