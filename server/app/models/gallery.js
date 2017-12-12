var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var mySchema = new Schema({
    userId: {type:Schema.Types.ObjectId, required: true},
    gallery: {type:String, required: true},
    description: {type:String},
    dateCreated: {type: Date, default: Date.now},
  
}
);

module.exports = 
 Mongoose.model('GalleryModel', mySchema);
