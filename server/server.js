const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors()); 
// 1. KONEKSI MONGODB ATLAS
// 
const MONGO_URI = "mongodb+srv://myAtlasDBUser:DRA4GOo002@myatlasclusteredu.vrpe1xa.mongodb.net/liyue_medical?retryWrites=true&w=majority&appName=MyAtlasClusterEDU";

mongoose.connect(MONGO_URI)
.then(() => console.log("✅ Berhasil terhubung ke MongoDB Atlas Liyue Medical Center!"))
.catch(err => console.error("❌ Koneksi MongoDB gagal:", err));


// 2. SKEMA & MODEL DATABASE

const doctorSchema = new mongoose.Schema({
name: String,
title: String,
  specialty: String, 
room: String,
schedule: Array,
fee: Number,
experience: Number,
bio: String,
image: String
});
const Doctor = mongoose.model('Doctor', doctorSchema, 'doctors');

const userSchema = new mongoose.Schema({
name: { type: String, required: true },
email: { type: String, unique: true, required: true },
password: { type: String, required: true }
});
const User = mongoose.model('User', userSchema, 'users');


// 3. ENDPOINT API BACKEND

// A. Endpoint untuk mengambil semua data dokter
app.get('/api/doctors', async (req, res) => {
try {
    const doctors = await Doctor.find({});
    res.json(doctors);
} catch (err) {
    console.error("Gagal mengambil data dokter:", err);
    res.status(500).json({ error: "Gagal mengambil data dokter dari database" });
}
});

// B. Endpoint untuk Registrasi Akun Baru (Sign Up)
app.post('/api/register', async (req, res) => {
try {
    const { name, email, password } = req.body;
    
    // Cek apakah email sudah terdaftar
    const existingUser = await User.findOne({ email });
    if (existingUser) {
    return res.status(400).json({ error: "Email is already registered!" });
    }

    // Simpan user baru
    const newUser = new User({ name, email, password });
    await newUser.save();

    res.json({ 
    message: "Registration successful! Welcome to Liyue Medical.", 
    user: { name: newUser.name, email: newUser.email } 
    });
} catch (err) {
    console.error("Error during registration:", err);
    res.status(500).json({ error: "Server error during registration" });
}
});

// C. Endpoint untuk Login Akun
app.post('/api/login', async (req, res) => {
try {
    const { email, password } = req.body;

    // Cari user berdasarkan email dan password
    const user = await User.findOne({ email, password });
    if (!user) {
    return res.status(400).json({ error: "Invalid email or password!" });
    }

    res.json({ 
    message: "Login successful!", 
    user: { name: user.name, email: user.email } 
    });
} catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ error: "Server error during login" });
}
});


// 4. MENJALANKAN SERVER
const PORT = 5000;
app.listen(PORT, () => {
console.log(`🚀 Server backend Liyue Medical Center berjalan di http://localhost:${PORT}`);
});