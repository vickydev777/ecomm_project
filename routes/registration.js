const express = require('express');
const router = express.Router();
var bodyParsar = require('body-parser');
const con = require('../connection');
const fileUpload = require("express-fileupload");

router.use(bodyParsar.json());
router.use(
  fileUpload()
);

//  router.get("/",(req,res)=>{
//      res.send("app is working fine.");
//    });

   router.get("/", (req, res, next)=>{
   // var emailId = req.body.email;
    console.log(req.body);
    console.log('working finde');
    con.query("select * from registration",(err,rows,fields)=>{
      if(err){
        //console.log('error generated');
        res.status(500).send({error:'something went wrong'});
      }else{
        res.json(rows);
      }
    });
});


router.post('/login', function(req, res, next){
  var useremail = req.body.email;
  var pwd = req.body.password;
  var token = req.body.token;
  console.log('token added');
         console.log(token);
  var queryStr = "select * from registration where email = '"+useremail+"' AND password = '"+pwd+"'";
  console.log(queryStr);
  con.query(queryStr,(err,rows,fields)=>{
      if(err){
        console.log('error generated');
        res.status(500).send({error:'something went wrong'});
      }else{
      console.log(rows[0]);
      res.json(rows[0]);
      }
    });
});


router.post('/signUp', function(req, res, next){
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.email;
  var gender = req.body.gender;
  var password = req.body.password;
  var status = req.body.status;
  console.log(req.body);
               console.log(firstName);
  var registrationSql = "Insert into registration set `firstName` = '" +
               firstName +
               "',`lastName` = '" +
               lastName +
               "',`email` = '" +
               email +
               "',`gender` = '" +
               gender +
               "',`password` = '" +
               password +
               "',`status` = '" +
               status +
               "',`created_at` = now()";
  console.log(registrationSql);
  con.query(registrationSql,(err,result)=>{
    if(err){
      //console.log('error generated');
      res.status(500).send({error:'something went wrong'});
    }else{
      res.json(result.insertId);
      //console.log(result.insertId);
    }
    });
});
   

router.get('/productDisplay', function(req, res, next){
  var queryStr = "select id, productName,productImage,productPrice,category,status from products where status = 1";
  console.log(queryStr);
  con.query(queryStr,(err,rows,fields)=>{
      if(err){
        console.log('error generated');
        res.status(500).send({error:'something went wrong'});
      }else{
      console.log(rows);
      res.json(rows);
      }
    });
});

router.get('/productSearch', function(req, res, next){
  var keyword = req.query.category;
  var queryStr = "select id,productName,productImage,productPrice,status from products where category = '"+keyword+"' AND status = 1";
  console.log(queryStr);
  con.query(queryStr,(err,rows,fields)=>{
      if(err){
        console.log('error generated');
        res.status(500).send({error:'something went wrong'});
      }else{
      console.log(rows);
      res.json(rows);
      }
    });
});


router.post('/addProduct', function(req, res, next){
  // var productFormData = JSON.parse(req.body.product_form_data);
  // var productName = productFormData[0].productName;
  // var productPrice = productFormData[0].productPrice;
  // var productCategory = productFormData[0].productCategory;
  // var status = productFormData[0].status;
  var productName = req.body.productName;
  var imageData = JSON.parse(JSON.stringify(req.files));
  var productImage = imageData.name;
  var productPrice = req.body.productPrice;
  var productCategory = req.body.productCategory;
  var status = req.body.status;
  console.log(req.files.productImage);
  var sampleFile = req.files.productImage;
  var filename = sampleFile.name;
  filename = filename.split('.').join('-' + Date.now() + '.');
  console.log(filename);
  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv('https://ecomm-project-1lsb.onrender.com/uploads/'+filename, function(err) {
    if (err){
      console.log('file not uploaded');
      return res.status(500).send(err);
    }else{
      var productDisplaySql = "Insert into products set `productName` = '" +
      productName +
                   "',`productImage` = '" +
                   filename +
                   "',`productPrice` = '" +
                   productPrice +
                   "',`category` = '" +
                   productCategory +
                   "',`status` = '" +
                   status +
                   "',`created_at` = now()";
      console.log(productDisplaySql);
      con.query(productDisplaySql,(err,result)=>{
        if(err){
          //console.log('error generated');
          res.status(500).send({error:'something went wrong'});
        }else{
          res.json(result.insertId);
          //console.log(result.insertId);
        }
        });
    }
  });
  
  // return false;
  
});

router.get('/productEdit/:id', function(req, res, next){
  var id = req.params.id;
  var queryStr = "select id,productName,productImage,productPrice,status from products where id = '"+id+"' AND status = 1";
  console.log(queryStr);
  con.query(queryStr,(err,rows,fields)=>{
      if(err){
        console.log('error generated');
        res.status(500).send({error:'something went wrong'});
      }else{
      console.log(rows);
      res.json(rows);
      }
    });
});

module.exports = router; 
