
const productModel = require('./database/schema/products');
const categoryModel = require('./database/schema/categories');

const http = require('http');
const express = require('express');
const bodyparser = require('body-parser');
const app = express.Router();
const morgan = require('morgan');
const cors = require('cors');

const hostname = 'localhost';
const port = 3000;

const dir = '/routes';

const registerAdvertiserHandler = require('./routes/registerAdvertiser');
const registerAdvertiserRoute = dir+'/registerAdvertiser';
const dealsUploadHandler = require('./routes/uploadDeals');
const dealsUploadRoute = dir+'/uploadDeals';
const allDealsHandler = require('./routes/allDeals');
const allDealsRoute = dir+"/allDeals";
const recordInterestedProductsRoute = dir+'/recordInterestedProducts';
const recordInterestedProductsHandler = require('./routes/recordInterestedProducts');

app.use(cors());
app.use(morgan('dev')); 
app.use(bodyparser.urlencoded());
app.use(bodyparser.json());

/* var dbName = 'deals1';
const mongoose = require('mongoose');
const url = "mongodb://localhost:27017";
var connectionToDb = mongoose.connect(url, {dbName: dbName}); */


/* var xlsx = require('node-xlsx').default;
const workSheetsFromFile = xlsx.parse(`${__dirname}/myFile.xlsx`); */
/* console.log(workSheetsFromFile);
console.log(workSheetsFromFile.length);
console.log(workSheetsFromFile[0]);
console.log(workSheetsFromFile[0].data[3]); */

/* for(var i =1; i<workSheetsFromFile[0].data.length; i++){
    for(var j=0; j<workSheetsFromFile[0].data[i].length; j++){
        console.log(workSheetsFromFile[0].data[i][j]);
        if(j==4 || j==5){
            var d = new Date(workSheetsFromFile[0].data[i][j]);
            console.log();
            console.log(d);
            console.log();
        }
    }
    
}; */



app.use(express.static(__dirname+'/public'));

app.use(registerAdvertiserRoute, registerAdvertiserHandler);

app.use(dealsUploadRoute, dealsUploadHandler);

app.use(allDealsRoute, allDealsHandler);

app.use(recordInterestedProductsRoute, recordInterestedProductsHandler);

app.use((req,res,next)=> {
             
    console.log("req.body now: ",req.body);
    console.log('req.url: ', req.url);
    console.log('req.query:\n', req.query );
   
    res.end('<html><body><h1>this is an express server </h1></body> </html>');
});

const server = http.createServer(app);
server.listen(port, hostname, ()=>{console.log(`server is running at http://${hostname}:${port}`)});

