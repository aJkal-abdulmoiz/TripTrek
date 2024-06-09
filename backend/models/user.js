const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userid:{ type: String, required: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    IpAddress:{type:String,required:true},
    Location:{type:Object,required:true}
});

const User = mongoose.model('User', userSchema);

module.exports = User;
