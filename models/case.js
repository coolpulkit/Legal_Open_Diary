const mongoose = require('mongoose');

const caseSchema = new mongoose.Schema({
    casetype: String,
    caseno: String,
    caseyear: Number,
    casetitlerespodent: String,
    casetitlepetitioner: String,
    nextday: Number,
    nextmonth: Number,
    nextyear: Number,
});

var CaseList = mongoose.model("CaseList", caseSchema);

module.exports = CaseList;
