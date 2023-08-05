const express = require('express');
const port = 8000;
const app = express();


app.get('/',(req,res)=>{
    return res.send('Hi this is me');
})
app.listen(port,(err)=>{
    if(err){
        console.log(`Error on running: ${err}`);
        return;
    }
    console.log(`The server is running on port: ${port}`);

})