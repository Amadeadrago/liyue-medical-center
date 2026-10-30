const doctorSchema = new mongoose.Schema({
name: { type: String, required: true },
title: { type: String, required: true },
specialty: { type: String, required: true },
availableDays: [String],
fee: { type: Number },
fees: { type: Number },
experience: { type: Number },
timings: { type: String },
userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
bio: { type: String },
image: { type: String }
}, { timestamps: true });