// Update with your config settings.

require('dotenv').config()
const localPgConnection = {
	host     : process.env.HOSTSER, // address to find the db server
	database : process.env.DBNAME,
	user     : process.env.USERDB,
	password : process.env.DBPASS,
}
// where is DATABASE_URL coming from?
const dbConnection = process.env.DATABASE_URL || localPgConnection

module.exports = {
	development : {
		client           : 'sqlite3',
		connection       : {
			filename : './data/database.sqlite3',
		},
		useNullAsDefault : true,
		migrations       : {
			directory : './data/migrations/',
		},
		seeds            : {
			directory : './data/seeds',
		},
		production       : {
			client     : 'pg',
			connection : dbConnection, // can be and object or a string
			pool       : {
				min : 2,
				max : 10,
			},
			migrations : {
				tableName : 'knex_migrations',
				directory : './db/migrations',
			},
			seeds      : {
				directory : './db/seeds',
			},
		},
	},
}
