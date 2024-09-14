const express = require('express');
require('dotenv').config();
const cors = require('cors');
const app = express();
var registrationRouter = require('./routes/registration');

app.use(cors());
// app.use((req, res, next) => {
// 	res.header("Access-Control-Allow-Origin","*");
// 	res.header("Access-Control-Allow-Headers","Origins","X-Requested-With","Content-Type","Accept","Authorization");
// 	if(req.method === 'OPTIONS'){
// 		res.header('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
// 		return res.status(200).json({});
// 	}

// });



app.get('/', function (req, res) {
  res.send('Hello World')
})

app.use('/registration', registrationRouter);

app.listen(3000, function(){
	console.log('Node server listening on port 3000');
 
});