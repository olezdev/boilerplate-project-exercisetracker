const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const userRoutes = require('./routes/userRoutes')
const exerciseRoutes = require('./routes/exerciseRoutes')
require('dotenv').config()
require('./database/mongodb')

const app = express()
app.use(cors())
// app.use(express.static('public'))
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.use('/api/users', userRoutes)
app.use('/api/users', exerciseRoutes)

const PORT = process.env.PORT ?? 3000
app.listen(PORT, () => {
  console.log(`Your app is listening on port  ${PORT}`)
})
