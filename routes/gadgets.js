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

/*GET request handler for form \** /gadgets/add**/
router.get('/add',function (req, res, next) {
    res.render('addGadget',{
        title:'add gadget'
    });
});

/*POST request handler for form \** /gadgets/add**/
router.post('/add',function (req, res, next) {
        //insert data in database
        Gadget.create(
            {
                gadget: req.body.gadget,
                typeOfGadget: req.body.typeOfGadget,
                price: req.body.price,
                condition: req.body.condition
            }, function (err, Gadget) {
                if (err) {
                    console.log(err);
                    res.render('error',
                        {message: 'Could not add gadget'})
                }
                else
                    {
                        res.redirect('/gadgets');
                    }

            });
    });
// GET /gaddgets/delete._id - to get delete id
router.get('/delete/:_id', function(req, res, next)
    {
        // get the id from the url
        var _id = req.param._id;

        //delete the data with that id
        Gadget.remove(
            {
                _id:_id
            },
            function (err)
            {
                if(err)
                {
                    console.log(err);
                    res.render('error',
                    {
                        message:'Could not Delete Gadget',
                        error:err
                    });
            }
            else
            {
                res.redirect('/gadgets');
            }
    });
    });

//making it public
module.exports = router;