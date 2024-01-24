const xpress = require("express");
const monogo = require("mongoose");

const bcryptsa=require("bcrypt");
const signup=require("./signup");
const models = require("./model");
const parser = require("body-parser");
const cors = require('cors');
const bodyParser = require("body-parser");
const port=process.env.port || 8090;
const app = xpress();

// Enable CORS at the beginning
const corsOptions = {
    origin: '*', // or specify a specific origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: false , limit:"10mb"}));
app.use(bodyParser.json({
  limit:"10mb"
}));

monogo.connect("mongodb+srv://talhaali21cv:jrT8pRzeFAhvGF4o@cluster0.jsmg5yb.mongodb.net/?retryWrites=true&w=majority").then(function () {

app.get("/fucking",function(req,res){
    res.send("fuck");
}
app.post("/signup",async function(req,res){
  try{
    const data=req.body;
   const alls= await signup.findOne({email:data.email});
   if(!alls){
    const all=signup(data);
    await all.save();
    res.json(all);
   }
   else{
    res.json("enter other email");
   }
  }
  catch(error){
    res.json(error);
  }

});
app.post("/login",async function(req,res){

    const {email,password}=req.body;

    const asdd= await signup.findOne({email: email});

   if(!asdd){
   return res.json("Not user found");
   }
   else{
    const check= await bcryptsa.compare(password,asdd.password);
  if(!check){
    return res.json("not match");
  }
  else
{
  res.json(asdd);
}
   }

});

app.post("/savenote" , async function(req,res){
  
  try {
    const { whocontains, title, images, subtitle } = req.body;
  
    // Ensure 'images' is a non-empty string
   
    // Convert the Base64-encoded image string to a Buffer
    const imageBuffer = Buffer.from(images, 'base64');
  
    const data = new models({
      whocontains: whocontains,
      title: title,
      images: imageBuffer, // Assuming images is an array of Buffers
      subtitle: subtitle,
    });
  
    // Save the data to the database
    const result = await data.save();
  
    // Respond with the saved data
    res.json(result);
  } catch (error) {
    // Handle errors appropriately
    console.error(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }  
});

app.get("/loginuserdata/:whocontains" , async function(req,res){
  
  try{

   const data= await models.find({  whocontains:req.params.whocontains });
   res.json(data);

  }
  catch(error){
   res.json(error)
  }
 });
 
 




















// app.get("/All", async function (req, res) {
//         const data = await signup.find();
//         res.json({'data':data});
//     });
//     app.post("/delete/:name", async function (req, res) {
//         const data = await models.deleteOne({name:req.params.name});
//         res.json(data);
//     });
//     app.get("/search/:name", async function (req, res) {
//         const data = await models.find({ name: req.params.name});
//         res.json(data);
//     });

//     app.post("/add", async function (req, res) {
     
//       const data= new models(req.body);
       

//   try{
//     const sx = await data.save();
//     res.json(sx);
//   }
//   catch(error){
//     res.send(error);
//   }
//     });
});

app.listen(port);
 
