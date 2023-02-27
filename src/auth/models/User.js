import mongoose from 'mongoose';
import * as  bcrypt from 'bcrypt';
import crypto from 'crypto';
const Schema = mongoose.Schema;
import jwt from 'jsonwebtoken';
import config from "../../config/config";

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: [true, ' Please add first Name'],
        maxLength: [50, 'Name can not Exceed more then 50 Characters'],
        trim: true
    },
    lastName: {
        type: String,
        required: [true, ' Please add first Name'],
        maxLength: [50, 'Name can not Exceed more then 50 Characters'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: 6,
        select: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    roles: [String],
    createdAt: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    activeSession:[String],
}, {
    versionKey: false // You should be aware of the outcome after set to false
});

// Encrypt password using bcrypt
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Encrypt password using bcrypt
UserSchema.pre('insertMany', async function (next, docs) {
    for (let i = 0; i < docs.length; i++) {
        const user = docs[i];
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
    }
    next();
});

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};


// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({id: this._id}, config.secretHashKey, {
        expiresIn: config.tokenExpiryTime
    });
};

// Generate and hash password token
UserSchema.methods.getResetPasswordToken = function () {
    // Generate token
    const resetToken = crypto.randomBytes(20).toString('hex');
    // Hash token and set to resetPasswordToken field
    this.resetPasswordToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');
    // Set expire
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
    return resetToken;
};

export default mongoose.model('User', UserSchema);