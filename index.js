require('dotenv').config()
const morgan = require('morgan')
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const winston = require('./config/winston')
const stylists = require('./routes/stylists.js')
const clients = require('./routes/clients.js')
const users = require('./routes/users.js')
const comments = require('./routes/comments.js')
const reviews = require('./routes/reviews.js')
const ratings = require('./routes/ratings.js')

const enableCors = function(req, res, next){
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE')
	res.header('Access-Control-Allow-Headers', 'Content-Type')
	next()
}


const server = express()
server.use(express.json())
server.use(morgan('combined', { stream: winston.stream }))
server.use(enableCors)
server.use(cors())
server.use(helmet())

server.use('/api/stylists', stylists)
server.use('/api/clients', clients)
server.use('/api', users)
server.use('/api/comments', comments)
server.use('/api/reviews', reviews)
server.use('/api/ratings', ratings)

const port = process.env.PORT || 5000

server.listen(port, () => {
	console.log(`//============== Server is active on port ${port} =======================//`)
})
