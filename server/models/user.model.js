let mongoose = require("mongoose");
let Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        googleId: {
            type: String,
            default: null,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        firstName: String,
        middleName: String,
        lastName: String,
        profilePhoto: String,
        role: {
            type: String,
            default: null,
        },
        lastVisited: { type: Date, default: new Date() }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('User', UserSchema);
