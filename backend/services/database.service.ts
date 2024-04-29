// external dependencies
import * as mongoDB from "mongodb";
import * as config from '../config.json';


// global variables
export const collections: { quotes?: mongoDB.Collection } = {}

// initialize connection
export async function connectToDatabase() {
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(config.mongo_db_conn_string);
    await client.connect();
    const db: mongoDB.Db = client.db(config.mongo_db_name);
    const quotesCollection: mongoDB.Collection = db.collection(config.mongo_db_collection_name);

    collections.quotes = quotesCollection;
    console.log(`successfully connected to:\ndatabase: ${db.databaseName}\ncollection: ${quotesCollection.collectionName}`);
};
