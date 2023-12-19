const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const userRoutes = require('./routes/userRoutes')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI)

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.use('/api/users', userRoutes)


const PORT = process.env.PORT ?? 3000
app.listen(PORT, () => {
  console.log(`Your app is listening on port  ${PORT}`)
})
