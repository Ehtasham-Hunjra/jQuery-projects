const express = require('express')
const app = express()
const port = 3000;
const path = require("path");

app.set("view options", {layout:false});
app.use(express.static(path.join(_dirname, 'public')));


app.get('/', function (req, res) {
    res.sendFile(path.join(_dirname + '/public.index.html'))
  })

  app.listen(port, function(){
    console.log('server running');
  })
