const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
var dburl="mongodb+srv://bhawya_20:SW9nlIonolH7jULt@cluster0.gueod.mongodb.net/chat?retryWrites=true&w=majority";
app.use(bodyParser.urlencoded({extended:false}));
//app.use(express.static(__dirname));
app.use(bodyParser.json());
app.get("/",function(req,res)
{
   res.sendFile(__dirname+"/homepage.html");
});
app.listen(3000,function()
{
 console.log("server is running");
});
mongoose.connect(dburl,function(err)
{
  console.log("mongodb connected",err);
});
var messageschema=new mongoose.Schema({
    name:String,
    message:String
});
var messages=mongoose.model("message",messageschema);

app.post("/messagess",function(req,res)
{
  //  console.log(req.body);
    var temp=req.body;
    console.log({name: temp.name,
        message:temp.message});

   var messa=new messages({name: temp.name,
    message:temp.message});

   messages.insertMany(messa,function(err)
   {
      console.log(err);
   });
  res.sendFile(__dirname+"/homepage.html");
});
app.get("/messagess",function(req,res)
{
    messages.find({},function(err,message)
    {
        res.send(message);
        console.log(message);
    });
});