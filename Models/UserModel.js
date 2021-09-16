const mongoos = require("mongoose");
const schema = mongoos.Schema;
const userSchema = new schema({
    fullName: { type: String },
    email: { type: String },
    emailToken: { type: String },
    isVerified: { type: Boolean },
    password: { type: String },
});
module.exports = mongoos.model("UserModel", userSchema);
