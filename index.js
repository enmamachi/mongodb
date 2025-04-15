const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'mydb';

async function main() {
  let client;

  try {
    // 1. Gunakan async/await untuk kode yang lebih bersih
    client = await MongoClient.connect(url, {
      useNewUrlParser: true,        // Opsional (driver v3.6+ sudah auto-set)
      useUnifiedTopology: true     // Rekomendasi untuk stabil connection
    });
    console.log('Connected to MongoDB');

    const db = client.db(dbName);
    const collection = db.collection('mycollection');

    // 2. Gunakan cursor secara efisien (tanpa toArray() jika dataset besar)
    const cursor = collection.find({});
    const docs = await cursor.toArray();
    console.log('Query results:', docs);

  } catch (err) {
    console.error('Error:', err);
  } finally {
    // 3. Pastikan koneksi ditutup bahkan jika error terjadi
    if (client) await client.close();
    console.log('Connection closed');
  }
}

// Eksekusi
main().catch(console.error);
