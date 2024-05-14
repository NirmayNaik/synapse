const express = require('express');
const router = express.Router();
// const User = require('../models/user');
// const passport = require('passport')
// const threader = require('../controllers/threader')
// const {isLoggedIn, ValidatePost, ValidateThread, isAuthor} = require('../middleware');
const issuer = require('../controllers/issuer')
const wrapAsync = require('../Utils/wrapAsync')
// const {storage} = require('../cloudinary/index')
// const upload = multer({storage})

router.route('/')
    .get(issuer.renderIssues)
    .post(wrapAsync(issuer.newIssue))
    // .post(isLoggedIn, wrapAsync(issuer.newIssue))
    .put(wrapAsync(issuer.editIssue))
    .delete(wrapAsync(issuer.deleteIssue))

router.route('/:issueName')
    .get(issuer.renderComments)
    .post(issuer.newComment)
    .put(issuer.editComment)
    .delete(issuer.deleteComment)
// router.route('/posts')
//     .get(auth.renderLogin)
//     .post(passport.authenticate('local', {failureFlash:true, failureRedirect:'/login'}), auth.login)

// router.get('/logout', auth.logout)

module.exports = router;