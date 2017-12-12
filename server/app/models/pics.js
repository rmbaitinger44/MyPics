var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var mySchema = new Schema({
    
    gallery: {type:Schema.Types.ObjectId, required: true},
    dateCreated: {type: Date, default: Date.now},
    file: {
        filename: { type: String},
        originalName: { type: String },
        dateUploaded: { type: Date, default: Date.now}
}
}
);

module.exports = 
 Mongoose.model('PicsModel', mySchema);
