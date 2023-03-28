const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('./dist/Esit'));

app.get('/*', (req,res) => 
   res.sendFile('index.html',{root:'./dist/Esit'}),

	) ;
app.listen(process.env.PORT || 8080);