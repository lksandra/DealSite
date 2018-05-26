//it records all the products that were clicked to buy by the customer.
console.log('first line of recordInterestedProducts.js file');
const productModel = require('../database/schema/products');
const categoryModel = require('../database/schema/categories');
const interestedProductModel = require('../database/schema/interestedProducts');
const express = require('express');
const bodyparser = require('body-parser');
const recordInterestedProductsHandler = express.Router();
const morgan = require('morgan');
recordInterestedProductsHandler.use(morgan('dev')); 
recordInterestedProductsHandler.use(bodyparser.urlencoded());
recordInterestedProductsHandler.use(bodyparser.json());

var dbName = 'deals1';
const mongoose = require('mongoose');
const url = "mongodb://localhost:27017";
var connectionToDb = mongoose.connect(url, {dbName: dbName});

//this method stores all the product deals that were clicked by the users.
recordInterestedProductsHandler.route('/')
    .post((req, res, next)=>{
        console.log('recordInterestedProductsHandler.post method enetered');
        connectionToDb.then((dbse)=>{
            console.log("connection to db established");
            console.log('req.body:\n', req.body);
            console.log(`req.body[0]:\n ${req.body[0]}`);
            console.log(`req.body[1]:\n ${req.body[1]}`);
            if(req.body==undefined || req.body==null || req.body == ''){
                res.statusCode = 400;
                res.end(JSON.stringify(req.body));
                return;
            }else{
                let productProm = productModel.findById(req.body._id);
                productProm.then((resultProd)=>{
                    console.log('resultProd:\n', resultProd);
                    if(resultProd!=null){
                        let interestedProdProm = interestedProductModel.findOne({'name' : resultProd._id}).select("count");
                       //let interestedProdProm = interestedProductModel.findOneAndUpdate({'name' : resultProd._id}, {$inc: {count : 1}}, {"new": true, "upsert" : true, "setDefaultsOnInsert" : true});
                        
                       interestedProdProm.then((resultInterestedProd)=>{
                            console.log('resultInterestedProd:\n', resultInterestedProd);
                            
                            if(resultInterestedProd!=null){
                                resultInterestedProd.count = resultInterestedProd.count+1;
                                resultInterestedProd.save().then(
                                    rslt=>{
                                        console.log('interested product saved successfuly to db');
                                        res.statusCode = 200;
                                        res.end(JSON.stringify(req.body));
                                    }
                                ).catch(err=>{
                                    console.log('some error in saving interestedProduct to db:\n', err);
                                    res.statusCode = 403;
                                    res.end(JSON.stringify(req.body));
                                });
                            }else{
                                interestedProductModel.create({
                                    'name' : resultProd._id
                                }).then(resultIntprod=>{
                                    console.log('resultIntProd added to db:\n', resultIntprod);
                                    res.statusCode = 200;
                                    res.end(JSON.stringify(req.body));
                                }).catch(err=>{
                                    console.log('some error in saving resultIntProd to db:\n', err);
                                    res.statusCode = 403;
                                    res.end(JSON.stringify(req.body));
                                });
                            }
                        });
                        interestedProdProm.catch(err=>{
                            console.log('some error in fetching interestedProdProm:\n', err);
                            res.statusCode = 403;
                            res.end(JSON.stringify(req.body));
                        })
                                    
                    }
                    //
                });
                productProm.catch(err=>{
                    console.log('some error in fetching productProm:\n', err);
                    res.statusCode = 403;
                    res.end(JSON.stringify(req.body));
                })
                
            }
            

        })
    })

    //this method provides an API through which one can get all the deals viewed by the customers.
    .get((req, res, next)=>{
        console.log('recordInterestedProductsHandler.get method enetered');
        connectionToDb.then((dbse)=>{
            console.log("connection to db established");
            var interestedProdProm = interestedProductModel.find({},{"name":1}).populate({path: "name", populate: {path: "advertiser category"}});
            
                                        
            interestedProdProm.then((rsltProds)=>{
                console.log('rsltProds:\n', rsltProds);
                 let fullDate = new Date();
               let year = fullDate.getFullYear(); 
               let month =  fullDate.getMonth();
               let day = fullDate.getDate();

               var filteredProds = rsltProds.filter((product)=>{
                   
                   console.log(`today's year: ${year} month: ${month} day: ${day}`);
                   let productDate = new Date(product.name.endDate);
                   console.log('product name:\n', product.name.name);
                   console.log(`year:${productDate.getFullYear()} month: ${productDate.getMonth()} day: ${productDate.getDate()}`);
                   if(productDate.getFullYear()>= year && productDate.getMonth() >= month && productDate.getDate() >= day){
                       return true;
                   }else{
                       return false;
                   }
               }) ;
               console.log('fileteredProds:\n', filteredProds);
               
             let resultToClient = [];
              filteredProds.map((each)=>{
                resultToClient.push( each.name );
                   console.log('resultToClient after:\n', resultToClient);
               });
               console.log('resultToClient final:\n', resultToClient);
               
                res.statusCode = 200;
                res.end(JSON.stringify(resultToClient, null, 1));
            });
            interestedProdProm.catch((err)=>{
                console.log('some error in querying interestedProd:\n', err);
                res.statusCode = 400;
                res.end(null);
            })                                        
        })
    })


    module.exports = recordInterestedProductsHandler;