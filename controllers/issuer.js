const Issues = require('../models/issueMod')
const User = require('../models/user')
const mongoose = require('mongoose');
// const Threads = require('../models/thread2')
const Comments = require('../models/commentMod')
// var cloudinary = require('cloudinary').v2;

module.exports.renderIssues = async(req, res)=>{
    const issues = await Issues.find({}).populate('author');
    // console.log("issue rendered")
    res.json(issues)
    // res.send({thread: 'Threads'})
}

module.exports.renderComments = async(req, res)=>{
    const iss=req.path.substring(1);
    const issue = await Issues.findOne({id:iss});
    // console.log(issue)
    // console.log("rendering comment")
    
    const comments = await Comments.find({issue:issue}).populate({
        path:'issue',
        populate:{path:'author'}
    }).populate('author');
    // console.log(comments)
    res.json(comments)
    // res.send({thread: 'Threads'})
}

const generateRandomString = (length) => [...Array(length)].map(() => Math.random().toString(36)[2]).join('');

module.exports.newIssue = async (req, res)=>{
    const {title,author,body,priority,id} = req.body;
    const newIssue = new Issues({title,body,id, priority, author, contributors:[],status:false,isEdited:false,isDeleted:false,images:[]});
    await newIssue.save();

    const auth = await User.findById(author._id);
    // console.log(auth);
    // console.log(author);
    auth.issues.push(newIssue);
    await auth.save();
    // newIssue.author = req.user;
    // newIssue.id=generateRandomString(10);
    // newIssue.images = req.body.imgs.map(f=>({url: f.path, filename: f.name}));

        // console.log(newPost.images)
        // newPost.author = req.user._id;
    // const reqThread = await Threads.findById(req.body.thread._id)
    // console.log(newPost)
    // console.log("Files are ", req.files)
    // newPost.thread = reqThread; 
    // if(mongoose.isValidObjectId(req.body.log._id)){
    //     await newIssue.save();
    // }
    // await reqThread.save();
    res.json({stat:'Issue added'})
}
module.exports.editIssue = async (req, res)=>{
    const editIssue = await Issues.findByIdAndUpdate(req.body.id, {body : req.body.body, title:req.body.title, isEdited:true, status:req.body.status, priority:req.body.priority} );
    // editIssue.images = req.body.issue.images.map(f=>({url: f.path, filename: f.name}));
    // cloudinary.config({ 
    //     cloud_name: 'poison04', 
    //     api_key: process.env.CLOUDINARY_API, 
    //     api_secret: process.env.CLOUDINARY_SECRET 
    // });
    // req.body.prevImgs.map(img=>{
    //     cloudinary.uploader.destroy(img.url, function(result) { console.log(result) });
    // })
    // newcamp.images = req.files.map(f=>({url: f.path, filename: f.filename}));
        // console.log(newcamp.images)
        // newPost.author = req.user._id;
    console.log("Issue edited")
        // if(mongoose.isValidObjectId(req.body.log._id)){
    await editIssue.save();
        // }
    res.send(`Issue edited`)
}
// module.exports.deletePost = async (req, res)=>{
//     const reqpost = await Posts.findById(req.body.delPost);
//     await Comments.deleteMany({post:reqpost.id})
//     const delPost = await Posts.findByIdAndUpdate(req.body.delPost, {body : "This Post has been Deleted by its creator", isEdited:false, isDeleted:true});
//     // newcamp.images = req.files.map(f=>({url: f.path, filename: f.filename}));
//         // console.log(newcamp.images)
//         // newPost.author = req.user._id;
//     // const thread = await Threads.findById(req.body.thread._id)
//     console.log("post deleted")
//     if(mongoose.isValidObjectId(req.body.log._id)){
//     await delPost.save();
//     }
//     // await thread.save();
//     res.send(`Post added`)
// }

module.exports.newComment = async (req, res)=>{

    const {author,body,iss, replyAuth, replyBody} = req.body;
    const newComment = new Comments({body, author, issue:iss,isEdited:false,isDeleted:false,replyAuth:replyAuth, replyBody:replyBody});
    // await newIssue.save();
    // newComment.issue = iss;
    // const issue = iss;
    // console.log(newComment);
    // console.log("Issuing");
    await newComment.save();
    
    // console.log(req.body.commentData);
    // const newComment = new Comments(req.body.commentData);
    // newComment.author = req.user;
    
    // newcamp.images = req.files.map(f=>({url: f.path, filename: f.filename}));
    // console.log(newcamp.images)
    // newPost.author = req.user._id;
    const id = iss.id;  
    const issue = await Issues.findOne({id:id});
    const auth = await User.findById(author._id);
    // console.log(issue.contributors.find(e=>{console.log(e); return (e._id == auth._id)}));
    if(auth != null && (issue.contributors.find(e=>e._id === auth._id) == undefined)){ 
        issue.contributors.push(auth);     
        // auth.contributed [];
        auth.contributed.push(iss);
        await issue.save();
        await auth.save();
    }
        // console.log("issue changed")
    // const thread = await Threads.findById(req.body.thread._id)
    // console.log(req.body.post._id)
    // if(mongoose.isValidObjectId(req.body.log._id)){
    //     await newComment.save();
    // }
    res.send(`Comment added`)
}

module.exports.deleteComment = async(req,res)=>{
    // console.log(req.body)
    const reqDelComment = req.body.delId;
    if(mongoose.isValidObjectId(req.body.log._id)){
    const comment = await Comments.findByIdAndUpdate(reqDelComment,{body:"This comment was deleted", isDeleted:true})
    await comment.save();}
    // console.log(Comments.find({}))
}

module.exports.editComment = async(req,res)=>{
    // const reqpost = req.body.post._id
    // const post = await Posts.findById(reqpost)
    // const reqEditPost = post.comments[req.body.data.i]._id;
    // const i = req.body.Id
    // const reqEditCom = req.body.data.editId;
    // console.log("id is " , reqEditCom)
    // if(mongoose.isValidObjectId(req.body.data.log._id)){
    const comment = await Comments.findByIdAndUpdate(req.body.id,{body:req.body.desc, isEdited:true})
    await comment.save();
    console.log(comment);
    res.send(`Comment added`)

    // }
}