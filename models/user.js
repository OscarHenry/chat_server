const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type : String,
        required: true,
    },
    email: {
        type : String,
        unique: true,
        required: true,
    },
    password: {
        type : String,
        required: true,
    },
    online: {
        type : Boolean,
        default: false,
        required: false,
    },
  });

  // override toJSON method to hide password
  UserSchema.method('toJSON', function(){
    const { __v, _id, password, ...object } = this.toObject();
    // rename _id to uid
    object.uid = _id;
    return object;
  });

  module.exports = mongoose.model('User',UserSchema);