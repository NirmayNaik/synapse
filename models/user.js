const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose')
const findOrCreate = require("mongoose-findorcreate");

const UserSchema = new Schema({
    username:{
        type:String,
        required: true,
        unique: true
    },
    googleId: String, 
    photos:String,
    desk:String,
    contributed:[{
        type:Schema.Types.ObjectId,
        ref:'Issue'
     }],
    issues:[{
        type:Schema.Types.ObjectId,
        ref:'Issue'
     }],
});

UserSchema.plugin(passportLocalMongoose);
UserSchema.plugin(findOrCreate);

module.exports = mongoose.model('User', UserSchema);