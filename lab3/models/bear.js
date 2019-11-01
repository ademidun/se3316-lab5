var mongoose     = require('mongoose');
mongoose.Promise = global.Promise;
var Schema       = mongoose.Schema; 

var BearSchema   = new Schema({
    name: String
});
console.log('Inside bear.js.');
module.exports = mongoose.model('Bear', BearSchema);

//module.exports = mongoose.model('Bear', { name: String });