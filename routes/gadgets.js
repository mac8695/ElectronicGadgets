/**
 * Created by MaC on 2016-11-16.
 */

var express = require('express');
var router = express.Router();

//linking to gadget model
var Gadget = require('../models/gadget');

//GET main gadgets page
router.get ('/',function (req, res, next) {
    Gadget.find(function (err, gadgets) {
        if(err)
        {
            console.log(err);
            res.render('error');
        }
        else
        {
            //loading gadget page and passing view
            res.render('gadgets', {
                title: 'All the gadgets ',
                gadgets: gadgets
            })
        }
    })
});

//making it public
module.exports = router;