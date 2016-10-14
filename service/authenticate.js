
var User = require('../../app/models/user'),
    jwt = require('jsonwebtoken'),
    auth = require('../../app/config/auth');

var authenticate = (function (){
    /**
     * @method checkLogin
     * @description check login with user name and password 
     */
    var checkLogin = function (username, password, response) {
        User.findOne({name : username}, function (err, user) {
            if (!user) {
                response.json({
                    success: false, 
                    message : 'Authentication failed. User not found'
                });
            } else if (user) {
                if (user.password != password) {
                    response.json({
                        success: false, 
                        message : 'Authentication failed. User/Password not found'
                    });
                } else {
                    var token = jwt.sign(user, auth.secret, {
                        expiresIn : 1440 // expires in 24 hours
                    });

                    response.json({
                        success: true,
                        message: 'Authentication Success! Enjoy your token',
                        token : token
                    });
                }
            }
        });
    };

    /**
     * @method isLoggedin
     * @description check login with user name and password 
     */
    var isLoggedin = function (request, response, next) {
        var token = request.body.token || request.query.token || request.headers['x-access-token'];

        if (request.url === '/authenticate') { //if try to login, avoid token check
            next();
            return false;
        }
        
        if (token) {
            jwt.verify(token, auth.secret, function (err, decoded) {
                if (err) {
                    response.json({
                        success: false,
                        message : 'Failed to authenticate token'
                    });
                } else {
                    request.decoded = decoded;
                    next();
                }
            });
        } else {
            response.json({
                success: false,
                message : 'No toekn has provided'
            });
        }
    };

    return {
        checkLogin : checkLogin,
        isLoggedin : isLoggedin
    };

}());

module.exports = authenticate;
