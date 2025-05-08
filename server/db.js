const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017";
const dbName = "automotive";

let db;

const connectDB = async () => {
  try {
    const client = new MongoClient(uri);

    await client.connect();
    console.log("Connesso a MongoDBBBBBBB!!");

    db = client.db(dbName);

    return db;
  } catch (err) {
    console.error(`Errore connessione: ${err.message}`);
    process.exit(1);
  }
};

const getDB = () => {
  if (!db) {
    throw new Error("Database no inizializzato");
  }
  return db;
};

module.exports = { connectDB, getDB };
