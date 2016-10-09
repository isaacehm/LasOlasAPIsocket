var express = require("express");
var app = express();
var http = require('http').Server(app);
var bodyParser  = require("body-parser");
var methodOverride = require("method-override");
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var io = require('socket.io')(http);

var cors = require('express-cors');
var orig =  cors({
              origin: 'http://localhost:8100'
            });

var port = process.env.PORT || 3000;


io.on('connection', function(socket){
  socket.on('new order', function(order){
  	io.emit('new order', order);
  });
});


// set the view engine to ejs
app.set('view engine', 'ejs');

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(methodOverride());
app.use(cors({allowedOrigins: [
        'localhost:8100', 'localhost:8000'
    ]}));

// Import Models and controllers
var models     = require('./models/user')(app, mongoose);
var UserCtrl = require('./controllers/users');

var models     = require('./models/category')(app, mongoose);
var CategoryCtrl = require('./controllers/categories');

var models     = require('./models/subcategory')(app, mongoose);
var SubcategoryCtrl = require('./controllers/subcategories');

var models     = require('./models/product')(app, mongoose);
var ProductCtrl = require('./controllers/products');

var models     = require('./models/stay')(app, mongoose);
var StayCtrl = require('./controllers/stays');

var models     = require('./models/order')(app, mongoose);
var OrderCtrl = require('./controllers/orders');

var router = express.Router();
router.get('/balneario/api', function(req, res) {  
   res.render('index');
});
app.use(router);

/******************** API routes ********************/

//Users
var users = express.Router();
users.route('/users')
  .get(UserCtrl.findAllUsers)
  .post(UserCtrl.addUser);

 users.route('/user/:id')
  .get(UserCtrl.findUserById)
  .put(UserCtrl.updateUser)
  .delete(UserCtrl.deleteUser);

users.route('/user')
  .post(UserCtrl.loginUser);

//Category
var categories = express.Router();
categories.route('/categories')
  .get(CategoryCtrl.findAllCategories)
  .post(CategoryCtrl.addCategory);

categories.route('/category/:id')
  .get(CategoryCtrl.findCategoryById)
  .put(CategoryCtrl.updateCategory)
  .delete(CategoryCtrl.deleteCategory);

//Subcategory
var subcategories = express.Router();
subcategories.route('/subcategories')
  .get(SubcategoryCtrl.findAllSubcategories)
  .post(SubcategoryCtrl.addSubcategory);

subcategories.route('/subcategory/:id')
  .get(SubcategoryCtrl.findSubcategoryById)
  .put(SubcategoryCtrl.updateSubcategory)
  .delete(SubcategoryCtrl.deleteSubcategory);

//Products
var products = express.Router();
products.route('/products')
  .get(ProductCtrl.findAllProducts)
  .post(ProductCtrl.addProduct);

products.route('/product/:id')
  .get(ProductCtrl.findProductById)
  .put(ProductCtrl.updateProduct)
  .delete(ProductCtrl.deleteProduct);

//Stays
var stays = express.Router();
stays.route('/stays')
  .get(StayCtrl.findAllStays)
  .post(StayCtrl.addStay);

stays.route('/stay/:id')
  .put(StayCtrl.updateStay)
  .delete(StayCtrl.deleteStay);

//Orders
var orders = express.Router();
orders.route('/orders')
  .get(OrderCtrl.findAllOrders)
  .post(OrderCtrl.addOrder);

orders.route('/order/:id')
  .get(OrderCtrl.findOrderById)
  .put(OrderCtrl.updateOrder)
  .delete(OrderCtrl.deleteOrder);

orders.route('/orders/:employee/:date')
  .get(OrderCtrl.findOrders);

app.use('/balneario/api', users);
app.use('/balneario/api', categories);
app.use('/balneario/api', subcategories);
app.use('/balneario/api', products);
app.use('/balneario/api', stays);
app.use('/balneario/api', orders);

/******************** API routes ********************/

// Connection to DB
mongoose.connect('mongodb://localhost/lasOlas', function(err, res) {
  if(err) {
    console.log('ERROR: connecting to Database. ' + err);
  }else{
  	console.log('Connected to Database. ');
  }
  
  http.listen(port, function() {
    console.log('Node server running on http://localhost:' + port);
  });

});
