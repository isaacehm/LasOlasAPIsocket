//File: controllers/users.js
var mongoose = require('mongoose');  
var User  = mongoose.model('User');
var bcrypt = require('bcrypt');

//POST - Login an user in the DB
exports.loginUser = function(req, res) {  
    console.log('POST /user');
    console.log(req.body);
    if(req.body.username != null && req.body.password != null){
        User.findOne({ username: req.body.username}, function (err, user){
            if(err || user == null) return res.status(500).send("El usuario no existe.");

            bcrypt.compare(req.body.password, user.password, function(err, res) {
                // res == true 
                if(res){
                    res.status(200).jsonp(user);
                }else{
                    res.status(403).send(false);
                }
            });

            /*if(user.password == req.body.password){
                res.status(200).jsonp(user);
                console.log("¡Inicio de sesión exitoso!");
                //return user.name;
            }else{
                res.status(403).send(false);
                //return false;
            }*/
        });
    }else{
        res.status(403).send(false);
    }
};

//GET - Return all users in the DB
exports.findAllUsers = function(req, res) {  
    User.find(function(err, users) {
    if(err) res.send(500, err.message);

    console.log('GET /users')
        res.status(200).jsonp(users);
    });
};

//GET - Return an User with specified ID
exports.findUserById = function(req, res) {  
    User.findById(req.params.id, function(err, user) {
    	if(err) return res.send(500, err.message);

    console.log('GET /user/' + req.params.id);
        res.status(200).jsonp(user);
    });
};

//POST - Insert a new User in the DB
exports.addUser = function(req, res) {  
    console.log('POST');

    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(req.body.password, salt, function(err, hash) {
            // Store hash in your password DB. 
            var user = new User({
                name:    req.body.name,
                username:     req.body.username,
                password:  hash,
                type:   req.body.type
            });

            user.save(function(err, user) {
                if(err) return res.send(500, err.message);
                res.status(200).jsonp(user);
            });
        });
    });    
};

//PUT - Update a register already exists
exports.updateUser = function(req, res) {  
    User.findById(req.params.id, function(err, user) {
        user.name	=    req.body.name,
        user.username	=     req.body.username,
        user.password	=  req.body.password,
        user.type	=   req.body.type

        user.save(function(err) {
            if(err) return res.send(500, err.message);
      	res.status(200).jsonp(user);
        });
    });
};

//DELETE - Delete a User with specified ID
exports.deleteUser = function(req, res) {  
    User.findById(req.params.id, function(err, user) {
    	if (user!=null){
            user.remove(function(err) {
                if(err) return res.send(500, err.message);
            res.status(200).send("User deleted.");
            })
        }else{
            res.status(404);
            res.send("User doesn't exist.");
        }
    });
};