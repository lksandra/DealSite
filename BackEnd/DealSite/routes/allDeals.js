//this route handler provides API which results in all the available deals.

console.log('first line of allDeals.js file');
const productModel = require('../database/schema/products');
const categoryModel = require('../database/schema/categories');
const express = require('express');
const bodyparser = require('body-parser');
const dealsHandler = express.Router();
const morgan = require('morgan');
dealsHandler.use(morgan('dev')); 
dealsHandler.use(bodyparser.urlencoded());
dealsHandler.use(bodyparser.json());

var dbName = 'deals1';
const mongoose = require('mongoose');
const url = "mongodb://localhost:27017";
var connectionToDb = mongoose.connect(url, {dbName: dbName});



dealsHandler.route('/')
    .get((req, res, next)=>{
        console.log('dealsHanlder.get method enetered');
        connectionToDb.then((dbse)=>{
            console.log("connection to db established");
            var productProm = productModel.find({}).populate({path: "advertiser"}).select(
                "name advertiser.name description startDate endDate currency price discount url");
            productProm.then((resultProducts)=>{
                console.log('resultProducts:\n', resultProducts);
                if(resultProducts.length!=0){

                    res.statusCode = 200;
                    res.end(JSON.stringify(resultProducts, null, 1));
                }else{
                    res.statusCode = 200;
                    res.end(null);
                }
            }).catch(err=>{
                res.statusCode=400; 
                res.send('backend fetching failed');
                console.log('some error in querying products db');
            });

        }).catch((err)=>{
            res.statusCode = 400;
            res.end('technical erro retry after sometime');
            console.log('some error in connecting to mongodb');
        })
    });

    module.exports = dealsHandler;


