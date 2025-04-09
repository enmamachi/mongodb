const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';
const dbName = 'mydb';

MongoClient.connect(url, (err, client) => {
  if (err) {
    console.error('error connecting:', err);
    return;
  }
  console.log('connected to MongoDB');

  const db = client.db(dbName);
  const collection = db.collection('mycollection');

  collection.find({}).toArray((err, docs) => {
    if (err) {
      console.error('error running query:', err);
      return;
    }
    console.log('query results:', docs);
  });
});
