const mongoose = require('mongoose');

// Koneksi ke MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true });

// Definisikan schema untuk koleksi users
const userSchema = new mongoose.Schema({
  username: String,
  password: String
});

// Buat model untuk koleksi users
const User = mongoose.model('User', userSchema);

// Fungsi untuk menambahkan user baru
async function addUser(username, password) {
  try {
    const user = new User({ username, password });
    await user.save();
    console.log('User berhasil ditambahkan!');
  } catch (error) {
    console.error('Error:', error);
  }
}
