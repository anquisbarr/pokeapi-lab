const express = require('express')
const app = express()
const port = 3000

const axios = require('axios');

var URL = "https://pokeapi.co/api/v2/pokemon/"

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/query',(req, res) => {
let name = req.query.name
axios.get(`${URL}${name}`).then((apiRes) => {
  console.log(apiRes.data.types)
  res.send(200,{response: {tipo : apiRes.data.types, habilidades:  apiRes.data.abilities}})
})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})