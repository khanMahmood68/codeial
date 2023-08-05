const express = require('express');
const port = 8000;
const app = express();


// Use express Router
app.use('/',require('./routes'));


app.listen(port,(err)=>{
    if(err){
        console.log(`Error on running: ${err}`);
        return;
    }
    console.log(`The server is running on port: ${port}`);

})