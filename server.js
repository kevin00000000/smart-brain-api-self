const express = require('express')
const knex = require('knex')
const bcrypt = require('bcrypt-nodejs')
const bodyParser = require('body-parser')
const cors = require('cors')

const signinHandler = require('./controllers/signinHandler')
const registerHandler = require('./controllers/registerHandler')
const entryHandler = require('./controllers/entryHandler')
const clarifaiHandler = require('./controllers/clarifaiHandler')

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user:'postgres',
        password: '123456',
        database: 'smart-brain-self'
    }
});

const app = express();

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {res.json('server is workding，please access api')})
app.post('/signin', signinHandler(db, bcrypt))
app.post('/register', registerHandler(db, bcrypt))
app.put('/entry', entryHandler(db))
app.post('/clarifai', clarifaiHandler())

app.listen(process.env.PORT, () => {
    console.log(`app is running on port ${process.env.PORT}`)
})