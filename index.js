const express = require('express')
const app = express();
var registrationRouter = require('./routes/registration');



app.get('/', function (req, res) {
  res.send('Hello World')
})

app.use('/registration', registrationRouter);

app.listen(3000, function(){
	console.log('Node server listening on port 3000');
});