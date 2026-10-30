const mongoose = require('mongoose');

// 1. User Schema
const userSchema = new mongoose.Schema({
name: { type: String, required: true },
email: { type: String, required: true, unique: true },
password: { type: String, required: true },
role: { type: String, default: 'patient' }
}, { timestamps: true });

// 2. Doctor Schema (Dibuat Fleksibel Biar Seeder Langsung Masuk)
const doctorSchema = new mongoose.Schema({
name: { type: String, required: true },
title: { type: String, required: true },
specialty: { type: String},
availableDays: [String],
fee: { type: Number },
fees: { type: Number },
experience: { type: Number, default: 5 },
timings: { type: String },
userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
bio: { type: String },
image: { type: String }
}, { timestamps: true });

// 3. Appointment Schema
const appointmentSchema = new mongoose.Schema({
patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
date: { type: String, required: true },
time: { type: String, required: true },
status: { type: String, default: 'Scheduled' },
notes: { type: String }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
const Doctor = mongoose.model('Doctor', doctorSchema);
const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = { User, Doctor, Appointment };