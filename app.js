if(process.env.NODE_ENV !== "production"){
    require("dotenv").config();
}
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const session = require('express-session')
// const flash = require('connect-flash')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const GoogleStrategy = require('passport-google-oauth20');
const User = require('./models/user')
// const Thread = require('./models/thread')
// const Post = require('./models/post')
// const Comments = require('./models/comments')
const userRoutes = require('./routes/useAuth')
const googleRoutes = require('./routes/googleAuth')
const issueRoutes = require('./routes/issue')
// const postRoutes = require('./routes/post')
const mongoSanitize = require('express-mongo-sanitize')
// const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/socialBackend';
const dbUrl = process.env.DB_URL;
const MongoStore = require('connect-mongo');
const bodyParser = require('body-parser')
const cors = require('cors');
const UserSchema=require('./models/user');
// import { createClient } from '@supabase/supabase-js'

// const supabaseUrl = 'https://jdedygjnmuqavgaglyvs.supabase.co'
// const supabaseKey = process.env.SUPABASE_KEY
// const supabase = createClient(supabaseUrl, supabaseKey)

app.set('view engine', 'ejs');  
app.set(__dirname,path.join(__dirname,'views'));

// app.use(expressLayouts);
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname,'public')))
// app.use(express.static(path.resolve(__dirname, "./frontend/build")));


// Review.deleteMany({}).then(m=>console.log(m));
const secret = process.env.SECRET || 'ThisShouldBeSecret'

console.log("url is ", process.env.DB_URL);
const sessionStore = MongoStore.create({
mongoUrl: dbUrl,
touchAfter: 24*60*60,
})
sessionStore.on("error", function(e){
console.log("Session store error! ",e);
})

const sessionConfig = {
store: sessionStore,
secret,
resave:false,
saveUninitialized:true,
cookie:{
    httpOnly:true,
    expires: Date().now + 1000*60*60*24*7,
    maxAge: 1000*60*60*24*7
}                
}
app.use(session(sessionConfig))

// app.use(flash())

app.use(passport.initialize())
app.use(passport.session())
app.use(mongoSanitize())
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// mongoose.connect(dbUrl, {
// useNewUrlParser: true,
// useCreateIndex: true,
// useUnifiedTopology: true,
// useFindAndModify: false
// });

// mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology:true});
mongoose.connect(dbUrl);
const db = mongoose.connection;

passport.use(new LocalStrategy(User.authenticate()))
// passport.serializeUser(User.serializeUser()) 
// passport.deserializeUser(User.deserializeUser())

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});

const GUser = User;

passport.use(GUser.createStrategy());


passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: `${process.env.SERVER_URL}/auth/google/callback`,
  },
  function(accessToken, refreshToken, profile, callback) {
    // console.log(profile);
    GUser.findOrCreate({  googleId: profile.id , username: profile.displayName, photos:profile._json.picture}, function (err, user) {
      return callback(err, user);
    });
  }
));


// app.get("/auth/google",
//     passport.authenticate("google", {scope:["profile"]})
// );


// app.get("/auth/google/callback", 
//   passport.authenticate("google", { failureRedirect: "/auth/login/failed" }),
//   function(req, res) {
//     return res.redirect(`${process.env.SERVER_URL}/profile/`);
//   }
// );



// app.use((req,res,next)=>{
// res.locals.loggedInUser = req.user;
// console.log(res.locals)
// res.locals.success = req.flash('success');
// res.locals.error = req.flash('error');
// next();
// })

app.use('/user',userRoutes)
app.use('/auth',googleRoutes)
app.use('/issues',issueRoutes)

if(process.env.NODE_ENV === "production"){
app.use(express.static('client/build'))
app.get("*", function (request, response) {
        response.sendFile(path.join(__dirname, 'client','build','index.html'));
    });
}
// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
// });
// console.log(process.env)
const port = process.env.PORT ||4000;
app.listen(port,()=>{
    +
       console.log(`Server connected on port ${port}`)
})