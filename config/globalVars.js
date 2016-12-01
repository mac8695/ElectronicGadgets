/**
 * Created by MaC on 2016-11-16.
 */

//global variable
module.exports = {
    db: 'mongodb://mac861995:mac861995@ds155087.mlab.com:55087/assignment-2',
    secret: 'random value for salting password',
    ids: {
        facebook: {
            clientID: '1185634651530516',
            clientSecret: '0e39a4ef5292207b41abcefeb1f6bda4',
            //callbackURL: 'http://localhost:3000/facebook/callback',
            callbackURL: 'http://assignment-two.herokuapp.com/facebook/callback'
            //callbackURL: 'https://assignment-two.herokuapp.com/facebook/callback'
        }
    }
};