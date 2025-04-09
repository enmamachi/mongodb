const express = require('express');
const app = express();

const mysql = require('mysql');
const MongoClient = require('mongodb').MongoClient;

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mydb'
});

MongoClient.connect('mongodb://localhost:27017', (err, client) => {
  if (err) {
    console.error('error connecting:', err);
    return;
  }
  console.log('connected to MongoDB');

  const db = client.db('mydb');
  const collection = db.collection('mycollection');

  app.get('/', (req, res) => {
    db.query('SELECT * FROM mytable', (err, rows) => {
      if (err) {
        console.error('error running query:', err);
        return;
      }
      res.send(rows);
    });
  });

  app.get('/mongo', (req, res) => {
    collection.find({}).toArray((err, docs) => {
      if (err) {
        console.error('error running query:', err);
        return;
      }
      res.send(docs);
    });
  });
});
