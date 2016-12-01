/**
 * Created by MaC on 2016-11-28.
 */

//link to mongoose
var mongoose = require('mongoose');
var plm = require('passport-local-mongoose');

var accountSchema = new mongoose.Schema({
//empty schema

    //social media id
    oauthID: String,
    created: Date
});
accountSchema.plugin(plm);

//make public
module.exports =  mongoose.model('Account', accountSchema);