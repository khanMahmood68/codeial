const express = require('express');
const cookieParser = require('cookie-parser');
const port = 8000;
const app = express();
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy')

const MongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMware = require('./config/middleware');

app.use(sassMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug:true,
    outputStyle:'expanded',
    prefix:'/css'
}))


app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static('./assets'))
app.use('/uploads', express.static(__dirname+'/uploads'))

app.use(expressLayouts);


// Extract style and scripts from sub pages into the layout
app.set('layout extractStyles',true)
app.set('layout extractScripts',true)


// setup the view engine
app.set('view engine', 'ejs');
app.set('views','./views');


// Mongo store is used to store the session cookie in db
app.use(session({
    name:'codeial',
    // TODO change the secret before the deployment in production mode
    secret:'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store:MongoStore.create(
        {   
            mongoUrl:('mongodb://127.0.0.1/codeial_developement'),
            mongooseConnection:db,
            autoRemove:'disabled'

        },
        function(err){
            console.log(err || 'connect-mongodb connection is okay');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser)

app.use(flash());
app.use(customMware.setFlash);

// Use express Router
app.use('/',require('./routes'));



app.listen(port,(err)=>{
    if(err){
        console.log(`Error on running: ${err}`);
        return;
    }
    console.log(`The server is running on port: ${port}`);

})