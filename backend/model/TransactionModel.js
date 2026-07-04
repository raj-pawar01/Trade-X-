const { model } = require("mongoose");
const { TransactionSchema } = require("../schemas/TransactionSchema");

const TransactionModel = new model("transaction", TransactionSchema);

module.exports = { TransactionModel };
