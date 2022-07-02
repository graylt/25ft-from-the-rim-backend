const Client = require('pg').Client
// require("dotenv").config();

const devConfig = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;

const proConfig = process.env.DATABASE_URL; 
// heroku addons

// const dbConfig = {
// 	connectionString:  process.env.NODE_ENV === "production" ? proConfig : devConfig,
// }

const dbConfig = {
	connectionString: 'postgresql://localhost:5432/twentyfiveftfromtherim',
}

if (process.env.DATABASE_URL){
	dbConfig.ssl = { rejectUnauthorized: false }
	dbConfig.connectionString = process.env.DATABASE_URL

}

const client = new Client(dbConfig)


module.exports = client;
