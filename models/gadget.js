/**
 * Created by MaC on 2016-11-16.
 */
var mongoose = require('mongoose');

//Defining schema for drink model
//and inheriting mongoose schema

var gadgetSchema = new mongoose.Schema({
    gadget: {
        type: String,
        required: 'Please enter the gadget name'
    },

    typeOfGadget: {
        type: String,
        required: 'Please enter type of the gadget'
    },

    price: {
        type: Number,
        required: 'Plase enter the amount of the project'
    },

    condition:
    {
        type: String,
        required: 'Please enter details of gadget'
    }
});

//Making it public
module.exports = mongoose.model('Gadget', gadgetSchema);