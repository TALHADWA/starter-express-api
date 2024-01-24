const mongo=require("mongoose");
const bcrypt = require('bcrypt');
const ids=require("uuid");
const sch=mongo.Schema({
    id:{
        type:String, unique:true
    },
 email:{type:String ,
    required:true,
    unique:true,
    match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
     },
 password:{type:String, required:true, min:7 },
 confirmpassword:{type:String, required:true, min:7 }
});
 

sch.pre("save", function(next){
    // if()
if(this.password != this.confirmpassword ){
    next("password and confirm password are not same");
}
else if(this.password.length <7){
    next("TOO short Password");
}
else if(!this.email.includes('@') ){
    next("Not valid email");
}
else{
    this.id=ids.v1();
    const bcrypts=bcrypt.genSaltSync(10);
    const hash=bcrypt.hashSync(this.password, bcrypts) ;
    this.password=hash;

    next();
}
});
sch.pre(["update"," findOneAndUpdate","updateOne"], function(next){
   try{
    const update=this.getUpdate();
    delete update._id;
    delete update.id;
    next();
   }
   catch(error){
    next(error);
   }

});
module.exports=mongo.model("Userss",sch);
