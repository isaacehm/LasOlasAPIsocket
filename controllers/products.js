//File: controllers/products.js
var mongoose = require('mongoose'); 
var Product  = mongoose.model('Product');
var Category  = mongoose.model('Category');
var Subcategory  = mongoose.model('Subcategory');

//GET - Return all products in the DB
exports.findAllProducts = function(req, res) { 
    Product.find(function(err, products) {
    if(err) res.send(500, err.message);

    console.log('GET /products')
        res.status(200).jsonp(products);
    });
};

//GET - Return a Product with specified ID
exports.findProductById = function(req, res) {  
    Product.findById(req.params.id, function(err, product) {
    	if(err) return res.send(500, err.message);

    console.log('GET /product/' + req.params.id);
        res.status(200).jsonp(product);
    });
};

//POST - Insert a new Product in the DB
exports.addProduct = function(req, res) {  
    console.log('POST');
    console.log(req.body);
    var categoryId = null;

    Category.findOne({ name: req.body.category}, function (err, category){
        if(err) return res.status(500).send("Error localizando la categoria.");
        if(category != null)
            categoryId = category._id;        

        Subcategory.findOne({ name: req.body.subcategory}, function (err, subcategory){
            if(err || (subcategory == null && categoryId == null)) return res.status(500).send("Error localizando la subcategoria.");
            if(subcategory == null){
                subcategoryId = '';
            }else{
                subcategoryId = subcategory._id;
            }
            var product = new Product({
                name:    req.body.name,
                stock:     req.body.stock,
                price:  req.body.price,
                categoryId:   categoryId,
                subcategoryId:   subcategoryId,
                icon: req.body.icon,
            });

            product.save(function(err, product) {
                if(err) return res.send(500, err.message);
                res.status(200).jsonp(product);
            });
        });
    });

};

//PUT - Update a register already exists
exports.updateProduct = function(req, res) {  

    var categoryId = null;

    Category.findOne({ name: req.body.category}, function (err, category){
        if(err) return res.status(500).send("Error localizando la categoria.");
        if(category != null)
            categoryId = category._id;  

        Subcategory.findOne({ name: req.body.subcategory}, function (err, subcategory){
            if(err || (subcategory == null && categoryId == null)) return res.status(500).send("Error localizando la subcategoria.");
            if(subcategory == null){
                subcategoryId = '';
            }else{
                subcategoryId = subcategory._id;
            }

            Product.findById(req.params.id, function(err, product) {
                product.name    =    req.body.name,
                product.stock   =     req.body.stock,
                product.price   =  req.body.price,
                product.categoryId    =   categoryId,
                product.subcategoryId =   subcategoryId,
                product.icon    =   req.body.icon,
                product.size    =   req.body.size

                product.save(function(err) {
                    if(err) return res.send(500, err.message);
                res.status(200).jsonp(product);
                });
            });

        });
    });


    
};

//DELETE - Delete a Product with specified ID
exports.deleteProduct = function(req, res) {  
    Product.findById(req.params.id, function(err, product) {

        if (product!=null){
            product.remove(function(err) {
                if(err) return res.send(500, err.message);
            res.status(200).send("Product deleted.");
            })
        }else{
            res.status(404);
            res.send("Product doesn't exist.");
        }
        
    });
};