const mongoose = require('mongoose');

mongoose.pluralize(null);
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    userName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
    },
    userId: { type: String, index: true },
    password: String, // Salted+Hashed
    admin: Boolean,

},
{
    timestamps: true,
});

const USERS = mongoose.model('Users', userSchema);

module.exports = { USERS };
