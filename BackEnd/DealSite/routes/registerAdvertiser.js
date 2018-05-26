//this moduole registers the advertiser.
//advertiser needs to provide their name and alloted publisher id.

const express = require('express');
const bodyparser = require('body-parser');
const registerAdvertiser = express.Router();
const morgan = require('morgan');
const advertiserModel = require('../database/schema/adverstisers');

registerAdvertiser.use(morgan('dev')); 
registerAdvertiser.use(bodyparser.urlencoded());
registerAdvertiser.use(bodyparser.json());

var dbName = 'deals1';
const mongoose = require('mongoose');
const url = "mongodb://localhost:27017";
var connectionToDb = mongoose.connect(url, {dbName: dbName});

var advertiser ={
    'name' : '',
    'publisherId' : ''
};


registerAdvertiser.route('/')
    .post((req, res, next)=>{
        connectionToDb.then((dbse)=>{
            try {
                console.log('connection to db established');
                console.log('req.body:\n', JSON.stringify(req.body, null, 2));
                if (req.body == undefined || req.body == '' || req.body == null) {
                    res.statusCode = 404;
                    res.end('empty body');
                    
                    console.log('req body is empty:\n', req.body);
                    return;

                } else {
                    advertiser.name = req.body.advertiserName;
                    advertiser.publisherId = req.body.publisherId;
                    advertiserModel.create(advertiser).then(function(rslt){
                        res.statusCode = 200;
                        
                        res.end(JSON.stringify(req.body, null,1));
                    }).catch(function(err){
                        res.statusCode = 404;
                        res.setHeader('content-type', 'text');
                        
                        res.end('some error in registering the advertiser . Plz try again');
                        console.log('some error in registering advertiser to db:\n', err);

                    });
                }
            } catch (e) {
                console.log('some error:\n', e);
            }
            
        });
        connectionToDb.catch(err=>console.log('connection to mongo error:\n', err));
    });

    module.exports = registerAdvertiser;