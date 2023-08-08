const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/codeial_developement');
const db = mongoose.connection;

db.on('error',console.error.bind(console, "Error in connecting to MongoDB"));
  
db.once('open', () => {
    console.log('Connected to MongoDB');
});
  
module.exports = db;