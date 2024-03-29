/**
 * Created by MaC on 2016-11-16.
 */

var express = require('express');
var router = express.Router();

//linking to gadget model
var Gadget = require('../models/gadget');
//auth check
function  isLoggedIn(req,res,next) {
if(req.isAuthenticated())
{
    next();
}
else
{
    res.redirect('/login');
}
}
//GET main gadgets page
router.get ('/',isLoggedIn,function (req, res, next) {
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
                gadgets: gadgets,
                user: req.user
            });
        }
    });
});

/*GET request handler for form \** /gadgets/add**/
router.get('/add',isLoggedIn,function (req, res, next) {
    res.render('addGadget',{
        title:'add gadget',
        user: req.user

    });
});

/*POST request handler for form \** /gadgets/add**/
router.post('/add',isLoggedIn,function (req, res, next) {
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
                        {message: 'Could not add gadget'});
                }
                else
                    {
                        res.redirect('/gadgets');
                    }

            });
    });
// GET /gadgets/delete._id - to get delete id
router.get('/delete/:_id', isLoggedIn,function(req, res, next)
    {
        // get the id from the url
        var _id = req.params._id;

        //delete the data with that id
        Gadget.remove( {_id: _id }, function (err)
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

// GET /gadgets/_id - Display the edit page with pre-filled values
router.get('/:_id', isLoggedIn, function(req, res, next) {
    //get id of selected gadget from url
    var _id = req.params._id;

    //using mongoose schema to find gadget
    Gadget.findById( { _id: _id }, function(err,  gadget)
    {
        if (err)
        {
            console.log(err);
            res.render('error', {
                message: 'Could not load gadget',
                error : err
        });
        }
        else
        {
            res.render('editGadget',
                {
                    title: 'Edit a Gadget',
                    gadget: gadget,
                    user: req.user
                });
        }
        
    });
});
//POST /gadgets/_id - process changes made in form and save it

router.post('/:_id', isLoggedIn, function(req, res, next) {
    // get id of edited from the url
    var _id = req.params._id;

    //save the edited values in schema
    var gadget = new Gadget({
        _id: _id,
        gadget: req.body.gadget,
        typeOfGadget : req.body.typeOfGadget,
        price: req.body.price,
        condition: req.body.condition
    });
    //updated view
    Gadget.update({ _id: _id }, gadget, function(err) {
        if(err)
        {
            console.log(err);
            res.render('error',{
                message: 'Could not update Gadget',
                error: err
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