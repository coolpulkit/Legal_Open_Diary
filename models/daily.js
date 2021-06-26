var mongoose=require('mongoose');
// create an schema
var userSchema = new mongoose.Schema({
    casetype: String,
    caseno: String,
    caseyear: Number,
    casetitlerespodent: String,
    casetitlepetitioner: String,
    nextday: Number,
    nextmonth: Number,
    nextyear: Number,
});
userTable=mongoose.model('users',userSchema);
        
module.exports={
     
     fetchData:function(callback){
        var userData=userTable.find({});
        userData.exec(function(err, data){
            if(err) throw err;
            return callback(data);
        })
        
     }
}