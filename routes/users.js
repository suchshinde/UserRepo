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
//const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIxMjMiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE1NzA1MTgwOTAsImV4cCI6MTU3MDUzNjA5MH0.68DGx8Ca5jf7k-jHwVJVVy1VeL3wuhvOUSo9ZcmAJZE';
const fireBaseDB = firebase.database().ref('/Users');

router.post('/', function (req, res) {
    const user = req.body.user;
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
        res.status(200).send(JSON.stringify(snapshot.val(), null, 2));
    }, function (errorObject) {
        res.status(500).send(errorObject);
    });
});

module.exports = router;

