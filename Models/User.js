const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name: {type: String, required: true},
    mail: {type: String, required: true},
    password: {type: String, required: true},
})

/*Export Schema to use in controller*/
module.exports = mongoose.model('user', userSchema);