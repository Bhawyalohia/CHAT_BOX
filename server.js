const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
var dburl="mongodb+srv://bhawya_20:SW9nlIonolH7jULt@cluster0.gueod.mongodb.net/chat?retryWrites=true&w=majority";
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(__dirname));
app.use(bodyParser.json());
app.get("/",function(req,res)
{
   res.sendFile(__dirname+"/tempfile.html");
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
messages.deleteMany({ },function(err)
{});
app.post('/messages', (req, res) => {
  var message = new messages(req.body);
  message.save((err) =>{
    if(err)
      sendStatus(500);
    res.sendStatus(200);
  });
});
app.get('/messages', (req, res) => {
  messages.find({},(err, messages)=> {
    res.send(messages);
    console.log(messages);
  });
});