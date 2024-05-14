const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport')
const auth = require('../controllers/auth')
const wrapAsync = require('../Utils/wrapAsync')

router.route('/getRegister')
    .get(auth.renderReg)
    .post(wrapAsync(auth.Register))

router.get('/getGUser',auth.renderGUser);
router.post('/getUser',auth.renderUser);
router.post('/getProf',auth.renderProf);

router.route('/getLogin')
    // .get(auth.renderLogin)
    .post(passport.authenticate('local'), auth.login)

// router.route('/googleLogin')
//     // .get(auth.renderLogin)
//     .post(passport.authenticate('google', {scope:["profile"],
//         successRedirect: '/auth/google',
//         failureRedirect: '/auth/login/failed',
//     }),auth.googleLogin)

// router.get('/logout', auth.logout)
// router.get("/auth/google",
//     passport.authenticate("google", {scope:["profile"]})
// );


// router.get("/auth/google/callback", 
//   passport.authenticate("google", { failureRedirect: "/auth/login/failed" }),
//   function(req, res) {
//     console.log(req);
//     return res.redirect(`localhost:3000/`);
//   }
// );

// router.get("/auth/login/failed", (req, res) => {
// 	res.status(401).json({
// 		error: true,
// 		message: "Log in failure",
// 	});
// });

// router.get("/auth/logout",function(req,res){
//   req.logOut(function(err){
//       if(err){
//           console.log("logout error: "+err);
//       }
//   });
//   res.redirect(`${process.env.CLIENT_URL}`)
// });

// router.get("/auth/check", (req,res) => {
//     if (req.isAuthenticated()) {
//       // Access the user's data from req.user
//       console.log(JSON.stringify(req.user));
//       res.json({ user: req.user });
//     } else {
//       console.log(`entering not authenticated phase at ${new Date()}`);
//       res.status(401).json({ message: "Unauthorized" });
//     }
//   });  

module.exports = router;