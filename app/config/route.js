var express = require('express'),
    Bear = require('../../app/models/bear'),
    User = require('../../app/models/user'),
    jwt = require('jsonwebtoken'),
    auth = require('../../app/config/auth'),
    authService = require('../../app/service/authenticate'),
    router = express.Router();

router.use(function(req, res, next){
    console.log('Something is trying to reach at ', req.url);
    authService.isLoggedin(req, res, next);
});

router.post('/authenticate', function (req, res) {
    authService.checkLogin(req.body.name, req.body.password, res);
});

router.get('/', function(req, res){
    res.json({message : 'hooray! welcome  to our api'});
});

router.get('/bears', function(req, res) {
    Bear.find(function(err, bears){
        if (err) res.send(err);
        res.json(bears);
    });
});
router.get('/bears/:bear_id', function (req, res) {
    Bear.findById(req.params.bear_id, function(err, bear){
        if (err) res.send(err);
        res.json(bear);
    })
});
router.put('/bears/:bear_id', function(req, res) {
    Bear.findById(req.params.bear_id, function(err, bear) {
        if (err) res.send(err);
        bear.name = req.body.name;
        bear.save(function(err) {
            if (err) res.send(err);
            res.json({message : 'Successfully updated with: ' + req.body.name });
        });
    });
});
router.post('/bears', function (req, res){
    var bear = new Bear();

    bear.name = req.body.name;
    bear.save(function (err){
        if (err) res.send(err);
        res.json({message: 'Successfully created'});
    });
});
router.delete('/bears/:bear_id', function(req, res) {
    Bear.remove({_id:req.params.bear_id}, function(err, bear) {
        if (err) res.send(err);
        res.json({message : 'Successfully deleted'});
    });
});

router.get('/setup', function (req, res) {
    var data = new User({
        name : 'Masud Hasan', 
        password : 'password',
        admin: true
    });

    data.save(function(err){
        if (err) res.send(err);
        res.json({message: 'User created successfully '});
    });
});

router.get('/users', function(req, res){
    User.find(function(err, users){
        if (err) res.send(err);
        res.json(users);
    })
});

module.exports = router;