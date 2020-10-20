const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    userid: { type: String, required: true },
    country: { type: String, required: true },
    region: { type: String, required: true },
    state: { type: String, required: true },
    town: { type: String, required: true },
    jobTitle: { type: String, required: true },
    address: { type: String, required: true},
    coordinate: {type: String, required: true},
    profilePhoto: {type: String, required: true}
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});

module.exports = mongoose.model('JobApplication', schema);