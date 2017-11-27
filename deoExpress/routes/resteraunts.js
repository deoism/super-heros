const express = require("express");
const router = express.Router();

const Resteraunts = require("../models/resteraunts.model");

router.get("/", function(req,res,next){

    Resteraunts.aggregate(
        [{$group:{_id: "$borough",count:
        {$sum: 1 } 
    }}],
    function(err,payload) {
        if(err){
            next(err);
        }else{
            res.send(payload);
        }
    }
    );
} );

module.exports = router;