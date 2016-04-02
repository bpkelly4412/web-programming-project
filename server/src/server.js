
var express = require('express');
var app = express();

var validate = require('express-jsonschema').validate;
var bodyParser = require('body-parser');
var database = require('./database');
var readDocument = database.readDocument;
var writeDocument = database.writeDocument;
var addDocument = database.addDocument;
var deleteDocument = database.deleteDocument;

app.use(express.static('../client/build'));
app.use(bodyParser.text());
app.use(bodyParser.json());


/**
 * Starts the server on localhost:3000
 */
app.listen(3000, function() {
  console.log('Example app listening on port 3000.');
});