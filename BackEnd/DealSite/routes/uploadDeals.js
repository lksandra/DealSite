//this module provides an API through which companies/advertisers can upload deals to the server.
//client need to upload a deals object whose fields matches the product schema.




const productModel = require('../database/schema/products');
const categoryModel = require('../database/schema/categories');
const fieldsToUpload = require('../database/fieldsToUpload');
const advertiserModel = require('../database/schema/adverstisers');
const express = require('express');
const bodyparser = require('body-parser');
const dealUploadHandler = express.Router();
const morgan = require('morgan');
const xlsx = require('node-xlsx').default;
dealUploadHandler.use(morgan('dev')); 
dealUploadHandler.use(bodyparser.urlencoded());

var dbName = 'deals1';
const mongoose = require('mongoose');
const url = "mongodb://localhost:27017";
var connectionToDb = mongoose.connect(url, {dbName: dbName});





var product={
    'name' :'',
    'advertiser':'',
    'category' :'',
    'description' : '',
    'startDate' : '',
    'endDate' :'',
    'currency' :'',
    'price' :'',
    'discount' :'',
    'url':'',
    'comments' : []
};


dealUploadHandler.route('/')
 .post((req, res, next)=>{
     connectionToDb.then((dbse)=>{
         console.log('connection to db established');
        // console.log('req.body.deal:\n', req.body.deal);
         console.log('req.body:\n', req.body);
         if(req.body==undefined || req.body==null || req.body ==''){
             res.statusCode = 400;
             res.send('body cant be emmpty for the post request');
             console.log('empty req.body:\n', req.body);
            
             return;
         }else{
             product.name = req.body.productName;
             product.currency = req.body.currency;
             product.description = req.body.productDescription;
             product.discount = req.body.discount; 
             product.price = req.body.price;
             product.startDate = req.body.dealStartDate;
             product.endDate = req.body.dealEndDate;
             product.url = req.body.url;
             var categoryIdProm = categoryModel.findOne({'name' : req.body.categoryName.toLowerCase()}).select("_id");
            var advertiserIdProm = advertiserModel.findOne({'name': req.body.advertiserName.toLowerCase()}).select("_id");
            categoryIdProm.then((resultCategory)=>{
                if(resultCategory!=null){

                    product.category = resultCategory["_id"];
                    advertiserIdProm.then((resultAdvert)=>{
                        if(resultAdvert!=null){
                            product.advertiser = resultAdvert["_id"];
                            productModel.create(product).then(rslt=>{
                                console.log('successfully updated the db:\n', rslt);
                                res.statusCode = 200;
                            res.end(JSON.stringify(req.body, null,1));
                            }).catch((err)=>{
                                console.log('some error in updating the db:\n', err);
                                res.statusCode = 404;
                                res.end('technical glitch. Plz try again');
                            })
                            
                        }else{
                            console.log('advertiser not registered:\n', resultAdvert);
                            res.statusCode = 404;
                            res.end('advertiser not registered');
                        }
                    })
                }else{
                    console.log('category not present:\n', resultCategory);
                    res.statusCode = 404;
                    res.end('category not available');
                }
            })
         }
     })
 })
 .get((req, res, next)=>{
     connectionToDb.then((dbse)=>{
         
         productModel.findOne({'name' : 'ip'}).then(rslt=>{console.log(rslt); res.end('search found');}).catch(err=>{console.log('some error in search:\n', err); res.end('search not found');});
     });
 })


/* function doIt(product){
    let productLocal = product;
    let categoryIdProm = categoryModel.findOne({'name' : productLocal.category.toLowerCase()}).select("_id");
    let advertiserIdProm = advertiserModel.findOne({'name' : productLocal.advertiser.toLowerCase()}).select("_id");
    categoryIdProm.then(function(resultCategory){
        let productLocalToAdvertiser = productLocal;
        if(resultCategory!=''){
            productLocalToAdvertiser.category = resultCategory['_id'];

            
                advertiserIdProm.then(function(resultAdvertiser){
                    if(resultAdvertiser!=''){
                        productLocalToAdvertiser.advertiser = resultAdvertiser['_id'];
                        console.log('productLocalTOadvertiser:\n', productLocalToAdvertiser);
                        let productProm = productModel.create(productLocalToAdvertiser);
                        productProm.then(rslt=>console.log('product uploaded to the db successfully:\n', rslt));
                        productProm.catch(err=>console.log('some error in uploading to the db:\n', err));
        
                    }else{
                        console.log('unregistered advertiser of the product');
                        return;
                    }
                }).catch(err=>console.log('some error in querying advertiserId for the product:\n', err));

            
            
        }else{
            console.log('unknown category of the product');
            return;
        }
    }).catch(err=>console.log('some error in querying categoryId for the product:\n', err));
    console.log('sandra');
                
}
 */
module.exports = dealUploadHandler;