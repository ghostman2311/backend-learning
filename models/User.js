const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    fullName: {
        type: String,
        required: [true, "Fullname not provided"],
    },
    email: {
        type: String,
        unique: [true, "Email already exist in database"],
        lowercase: true,
        required: [true, "Email not provided"],
        validate: {
            validator: function(v){
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: `{VALUE}is not a valid email!`
        }
    },
    role: {
        type: String,
        enum: ["normal", "admin"],
        required: [true, "Please specify user role"]
    },
    password: {
        type:String,
        required: true,
    },
    created: {
        type: Date,
        default: Date.now
    }
})


module.exports = mongoose.model("User", userSchema)