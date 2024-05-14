const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport')
const url = require('url');    

// router.get('/logout', auth.logout)
router.get("/getG",async function(req, res){
    console.log('Hey g')
    res.redirect('/auth/google')
    
}
    // passport.authenticate("google", {scope:["profile"]})
);

router.get("/google", 
    passport.authenticate("google", {scope:["profile"]}),
    // res.json(scope)
    // redirect('http://localhost:3000/')
    // function(req, res) {
    //     // console.log(req.user);
    //     // res.json({scope:req.user});
    //     res.redirect('http://localhost:3000/')
    //   }

);


router.get("/google/callback", 
  passport.authenticate("google", { failureRedirect: "/auth/login/failed" }),
  function(req, res) {
    // console.log(req.user);
    // res.json({"scope":req.user});
    // res.redirect()
    res.redirect(url.format({
        pathname:`http://localhost:3000/googleAuth/${req.user.googleId}`,
        query: {
           "scope": req.user,
         }
      }));

  }
);

router.get("/login/failed", (req, res) => {
	res.status(401).json({
		error: true,
		message: "Log in failure",
	});
});

router.get("/logout",function(req,res){
  req.logOut(function(err){
      if(err){
          console.log("logout error: "+err);
      }
  });
  res.redirect(`http://localhost:3000`)
});

router.get("/check", (req,res) => {
    if (req.isAuthenticated()) {
      // Access the user's data from req.user
      console.log(JSON.stringify(req.user));
      res.json({ user: req.user });
    } else {
      console.log(`entering not authenticated phase at ${new Date()}`);
      res.status(401).json({ message: "Unauthorized" });
    }
  });  

module.exports = router;