const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    username: { type: String, required: true },
    mobile: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    usertype: { type: Number, required: true },
    activated: { type: Boolean, required: false },
    otp: { type: Number, required: false }
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});

module.exports = mongoose.model('User', schema);