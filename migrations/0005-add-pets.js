
var mongodb = require('mongodb');

exports.up = function(db, next){
var pets = mongodb.Collection(db, 'pets');
    pets.insert({name: 'tobi'}, next);
    next();
};

exports.down = function(db, next){
    next();
};
