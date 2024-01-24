
const monogos=require("mongoose");
const dta=monogos.Schema({
    images:{
 type:Array,
    },
    whocontains:{
        type:monogos.Schema.Types.ObjectId, ref:"Userss" ,  required:true
    },
    title: { type: String, default: 'hahaha' },
     subtitle: { type:String, },
    // bio: { type: String, match: /[a-z]/ },
    // date: { type: Date, default: Date.now },
    // buff: Buffer
});

// dta.pre("save", function(next){
//    this.name="Fuck"
//     console.log(this.name);

// });
module.exports=monogos.model("Fuck",dta);
