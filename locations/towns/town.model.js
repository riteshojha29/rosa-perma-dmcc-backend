const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    townName: { type: String },
    townCode: { type: Number },
    stateCode: { type: Number }
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});

module.exports = mongoose.model('Town', schema);