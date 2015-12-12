//File: controllers/categories.js
var mongoose = require('mongoose');  
var Category  = mongoose.model('Category');

//GET - Return all categories in the DB
exports.findAllCategories = function(req, res) {  
    Category.find(function(err, categories) {
    if(err) res.send(500, err.message);

    console.log('GET /categories')
        res.status(200).jsonp(categories);
    });
};

//GET - Return an Category with specified ID
exports.findCategoryById = function(req, res) {  
    Category.findById(req.params.id, function(err, category) {
    	if(err) return res.send(500, err.message);

    console.log('GET /category/' + req.params.id);
        res.status(200).jsonp(category);
    });
};

//POST - Insert a new Category in the DB
exports.addCategory = function(req, res) {  
    console.log('POST');
    console.log(req.body);

    var category = new Category({
        name:    req.body.name,
        icon:     req.body.icon
    });

    category.save(function(err, category) {
        if(err) return res.send(500, err.message);
    res.status(200).jsonp(category);
    });
};

//PUT - Update a register already exists
exports.updateCategory = function(req, res) {  
    Category.findById(req.params.id, function(err, category) {
        category.name	=    req.body.name,
        category.icon	=     req.body.icon

        category.save(function(err) {
            if(err) return res.send(500, err.message);
      	res.status(200).jsonp(category);
        });
    });
};

//DELETE - Delete a Category with specified ID
exports.deleteCategory = function(req, res) {  
    Category.findById(req.params.id, function(err, category) {
        if (category!=null){
            category.remove(function(err) {
                if(err) return res.send(500, err.message);
            res.status(200).send("Category deleted.");
            })
        }else{
            res.status(404);
            res.send("Category doesn't exist.");
        }
        
    });
};