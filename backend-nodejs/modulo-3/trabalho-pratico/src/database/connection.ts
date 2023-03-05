import { Pool } from 'pg';
import { MongoClient } from 'mongodb';

const connection = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DBNAME,
})

const mongoCredentials = `${process.env.MONGO_USER || 'root'}:${process.env.MONGO_PASS || 'root'}`
const mongoURL = `mongodb://${mongoCredentials}@${process.env.MONGO_HOST || 'localhost'}:${process.env.MONGO_PORT || '27017'}`
export const mongoDBConnection = {
  connect: ()=> MongoClient.connect(
    mongoURL
  )
}

export default connection;