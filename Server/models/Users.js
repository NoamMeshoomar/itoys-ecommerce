const mongoose = require('mongoose');

const usersSchema = mongoose.Schema({
    image: { type: String, default: 'default-profile.jpg' },
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('users', usersSchema);