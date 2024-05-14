const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');
const Issue = require('./issueMod')
const commentSchema = new Schema({
    body :String,
    isEdited: Boolean,
    isDeleted: Boolean,
    author:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    issue:{
       type:Schema.Types.ObjectId,
       ref:'Issue'
    },
    replyAuth:String,
    replyBody:String
})

module.exports = mongoose.model("Comment", commentSchema);