//File: controllers/stays.js
var mongoose = require('mongoose');  
var Stay  = mongoose.model('Stay');

//GET - Return all stays in the DB
exports.findAllStays = function(req, res) {  
    Stay.find(function(err, stays) {
    if(err) res.send(500, err.message);

    console.log('GET /stays')
        res.status(200).jsonp(stays);
    });
};

//POST - Insert a new Stay in the DB
exports.addStay = function(req, res) {  
    console.log('POST /stays');
    console.log(req.body);

    var stay = new Stay({
        name:    req.body.name,
        maxNumber:    req.body.maxNumber,
    });

    stay.save(function(err, stay) {
        if(err) return res.send(500, err.message);
    res.status(200).jsonp(stay);
    });
};

//PUT - Update a register already exists
exports.updateStay = function(req, res) {  
    Stay.findById(req.params.id, function(err, stay) {
        stay.name	=    req.body.name,
        stay.maxNumber  =    req.body.maxNumber,

        stay.save(function(err) {
            if(err) return res.send(500, err.message);
      	res.status(200).jsonp(stay);
        });
    });
};

//DELETE - Delete a Stay with specified ID
exports.deleteStay = function(req, res) {  
    Stay.findById(req.params.id, function(err, stay) {
    	if (stay!=null){
            stay.remove(function(err) {
                if(err) return res.send(500, err.message);
            res.status(200).send("Stay deleted.");
            })
        }else{
            res.status(404);
            res.send("Stay doesn't exist.");
        }
    });
};