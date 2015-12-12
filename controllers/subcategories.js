//File: controllers/subcategories.js
var mongoose = require('mongoose');  
var Subcategory  = mongoose.model('Subcategory');
var Category  = mongoose.model('Category');

//GET - Return all subcategories in the DB
exports.findAllSubcategories = function(req, res) { 

    Subcategory.find({}).sort('name').exec(function(err, subcategories){
        if(err) res.send(500, err.message);

        console.log('GET /subcategories')
        res.status(200).jsonp(subcategories);
    });

};

//GET - Return a Subcategory with specified ID
exports.findSubcategoryById = function(req, res) {  
    Subcategory.findById(req.params.id, function(err, subcategory) {
    	if(err) return res.send(500, err.message);

    //console.log('GET /subcategory/' + req.params.id);
    console.log(subcategory.categoryId);
        res.status(200).jsonp(subcategory);
    });
};

//POST - Insert a new Subcategory in the DB
exports.addSubcategory = function(req, res) {  
    console.log('POST');
    console.log(req.body);

    Category.findOne({ name: req.body.category}, function (err, category){
        if(err || category == null) return res.status(500).send("Error localizando la categoria.");

        var subcategory = new Subcategory({
            name:    req.body.name,
            categoryId:   category._id,
            icon: req.body.icon,
        });

        subcategory.save(function(err, subcategory) {
            if(err) return res.send(500, err.message);
        res.status(200).jsonp(subcategory);
        });
    });
    
};

//PUT - Update a register already exists
exports.updateSubcategory = function(req, res) {  

    Category.findOne({ name: req.body.category}, function (err, category){
        if(err || category == null) return res.status(500).send("Error localizando la categoria.");

        Subcategory.findById(req.params.id, function(err, subcategory) {
            subcategory.name    =    req.body.name,
            subcategory.categoryId    =   category._id,
            subcategory.icon    =   req.body.icon,

            subcategory.save(function(err) {
                if(err) return res.send(500, err.message);
            res.status(200).jsonp(subcategory);
            });
        });
    });    
};

//DELETE - Delete a Subcategory with specified ID
exports.deleteSubcategory = function(req, res) {  
    Subcategory.findById(req.params.id, function(err, subcategory) {

        if (subcategory!=null){
            subcategory.remove(function(err) {
                if(err) return res.send(500, err.message);
            res.status(200).send("Subcategory deleted.");
            })
        }else{
            res.status(404);
            res.send("Subcategory doesn't exist.");
        }
        
    });
};