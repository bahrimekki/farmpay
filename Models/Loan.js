const mongoos = require("mongoose");
const schema = mongoos.Schema;
const loanSchema = new schema({
    idUser: { type: String },
    option: { type: String },
    dateTime: { type: String },
    currency: { type: String },
    confirmToken: { type: String },
    isConfirmed: { type: Boolean },
    amount: { type: Number },
    period: { type: Number },
});
module.exports = mongoos.model("Loan", loanSchema);
