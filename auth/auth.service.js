
const expressJwt =require('express-jwt');
const compose =require('composable-middleware')
const jwt =require('jsonwebtoken');

var validateJwt = expressJwt({
    secret: 'secret-key'
});

function isAuthenticated() {
console.log(' Inside ')
    return compose()
        // Validate jwt
        .use(function(req, res, next) {
            // allow access_token to be passed through query parameter as well
            if(req.query && req.query.hasOwnProperty('access_token')) {
                req.headers.authorization = `Bearer ${req.query.access_token}`;
            }
            // IE11 forgets to set Authorization header sometimes. Pull from cookie instead.
            if(req.query && typeof req.headers.authorization === 'undefined') {
                req.headers.authorization = `Bearer ${req.cookies.token}`;
            }
            console.log('req.headers.authorization =', req.headers.authorization);
            validateJwt(req, res, next);
        })
}

const signToken = (id, role) => {
    return jwt.sign({_id: id, role}, 'secret-key', {
        expiresIn: 60 * 60 * 5
    });
}


module.exports = {isAuthenticated: isAuthenticated, signToken: signToken};
