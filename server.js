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
        connectionString: process.env.DATABASE_URL,
        ssl: true
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

/*
Table DDL

CREATE TABLE public.logins (
	id serial NOT NULL,
	email text NOT NULL,
	"password" text NOT NULL,
	CONSTRAINT logins_email_key UNIQUE (email),
	CONSTRAINT logins_pkey PRIMARY KEY (id)
);

CREATE TABLE public.users (
	id serial NOT NULL,
	"name" varchar(100) NOT NULL,
	email text NOT NULL,
	entries int2 NULL DEFAULT 0,
	joined date NOT NULL,
	CONSTRAINT users_email_key UNIQUE (email),
	CONSTRAINT users_pkey PRIMARY KEY (id),
	CONSTRAINT users_logins_fk FOREIGN KEY (email) REFERENCES logins(email)
);
*/