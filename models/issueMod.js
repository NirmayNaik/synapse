const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const Thread = require('./thread2');

const imageSchema = new Schema({
        url:String,
        filename:String     
})

// imageSchema.virtual('thumbnail').get(function(){
//     return this.url.replace('/upload','/upload/w_200')
// })

const issueSchema = new Schema({
    title:String,
    body:String,
    id:String,
    priority:String,
    author:{
        type: Schema.Types.ObjectId,
        ref:'User'
    },
    contributors:[{
        type: Schema.Types.ObjectId,
        ref:'User'
    }],
    status:Boolean,
    isEdited:Boolean,
    isDeleted:Boolean,
    images:[imageSchema],
});

// postSchema.post('findOneAndDelete', async function(doc){
//     if(doc){
//         await comments.deleteMany({_id:{$in : doc.reviews}})
//     }
// })

module.exports = mongoose.model('Issue',issueSchema);