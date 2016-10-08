//File: controllers/orders.js
var mongoose = require('mongoose');  
var Order  = mongoose.model('Order');
var Product  = mongoose.model('Product');
var io = require('socket.io');

//GET - Return all orders in the DB
exports.findAllOrders = function(req, res) {  
    var socket = io();
    socket.emit('new order', 'order');
    Order.find(function(err, orders) {
    if(err) res.send(500, err.message);

    console.log('GET /orders')
        res.status(200).jsonp(orders);
    });
};

//GET - Return orders from an employee and actual date in the DB
exports.findOrders = function(req, res) {  
    Order.find({'employee':req.params.employee},function(err, orders) {
        if(err) res.send(500, err.message);
        console.log('GET /orders/'+req.params.employee+'/'+req.params.date)

        var myOrders = [];
        var date = "";
        for( var i=0; i<orders.length; i++){
            date = orders[i].date.getDate()+'-'+(orders[i].date.getMonth()+1)+'-'+orders[i].date.getYear();
            if( date == req.params.date )
                myOrders.push(orders[i]);
        }        

        res.status(200).jsonp(myOrders);
    });
};

//GET - Return an Order with specified ID
exports.findOrderById = function(req, res) {  
    Order.findById(req.params.id, function(err, order) {
    	if(err) return res.send(500, err.message);

    console.log('GET /order/' + req.params.id);
        res.status(200).jsonp(order);       
    });
};

//POST - Insert a new Order in the DB
exports.addOrder = function(req, res) {
    console.log('POST /orders');

    var products = [];
    var productsRequest = req.body.products.split(";");

    for( var i=0; i<(productsRequest.length-1); i++ )
        products.push(JSON.parse(productsRequest[i]));    

    for( var i=0; i<(products.length); i++ )
        delete products[i]['$$hashKey'];

    var order = new Order({
        employee:    req.body.employee,
        stay:    req.body.stay,
        stayNumber:    req.body.stayNumber,
        total: req.body.total,
        products:   products,
        date: new Date()
    });

    order.save(function(err, order) {
        if(err) return res.status(500).send(err.message);

        products.forEach(function(product){
            var newStock = product.stock - product.order;
            Product.update({name: product.name}, {stock: newStock}, function(err, updated){
                if(err) console.log('Error while updating stock.');
                console.log('Stock updated');
            });
        });

        res.status(200).jsonp(order);
    });

};

//PUT - Update a register already exists
exports.updateOrder = function(req, res) {  

    Order.findById(req.params.id, function(err, order) {
        order.employee	=    req.body.employee,
        order.stay	=   req.body.stay,
        order.stayNumber    =    req.body.stayNumber,
        order.status = req.body.status

        order.save(function(err) {
            if(err) return res.send(500, err.message);
      	res.status(200).jsonp(order);
        });
    });
};

//DELETE - Delete a Order with specified ID
exports.deleteOrder = function(req, res) {
    Order.findById(req.params.id, function(err, order) {
    	if (order!=null){
            order.remove(function(err) {
                if(err) return res.send(500, err.message);
                res.status(200).send("Order deleted.");
            })
        }else{
            res.status(404);
            res.send("Order doesn't exist.");
        }
    });
};