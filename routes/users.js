const router = require('express').Router();
const auth = require('../auth/auth.service');
const firebase = require("firebase-admin");
const serviceAccount = require('../firbaseServiceAccount');
const schema = require('./schema');
const Validator = require('jsonschema').Validator;
const validateSchema = new Validator();
firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://usersdb-20b89.firebaseio.com"
});
//const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIyMzMzIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTcwMzU5NTkxLCJleHAiOjE1NzAzNzc1OTF9.LHsoM6yAafwPGwKZKcz9EzfIT3GzAaljaVeIMF5Qk9c';
const fireBaseDB = firebase.database().ref('/Users');

router.post('/', function (req, res) {
    const user = req.body.user;
    console.log(validateSchema.validate(user, schema).valid);
    const validSchema = validateSchema.validate(user, schema);
    if (validSchema.valid) {
        fireBaseDB.push(user).then((data) => {
            res.status(200).send(`New user ${user.firstname} Created successfully`);
        }).catch((e) => {
            res.status(500).send('Something went wrong' + e);
        });
    }else{
        res.status(500).send(validSchema.errors[0].message);
    }

});

router.get('/', auth.isAuthenticated(), function (req, res) {
    fireBaseDB.on("value", function (snapshot) {
        console.log(snapshot.val());
        res.status(200).send(JSON.stringify(snapshot.val(), null, 2));
    }, function (errorObject) {
        res.status(500).send(errorObject);
    });
});

module.exports = router;

