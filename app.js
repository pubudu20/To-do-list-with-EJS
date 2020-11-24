const express = require ("express");
const bodyParser = require ("body-parser");

const app = express();

var items = ["Buy food","Cook food", "Eat food"];
var workItems = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req,res){

  var today = new  Date();
  var options = {
    weekday: "long",
    day : "numeric",
    month: "long"
  };
  var day = today.toLocaleDateString("en-US",options);

  res.render("list", {listTitle:day, newListItems: items});
});

app.post("/", function(req,res){
  let item = req.body.newItem;
  console.log(req.body);
  if(req.body.list === "work"){
    workItems.push(item);
    res.redirect("/work");
  }
  else{
  items.push(item);
  res.redirect("/");
  }
// }

});

app.get("/work", function(req,res){
  res.render("list",{listTitle: "work List", newListItems:workItems});
});

app.get("/about", function(req,res){
  res.render("about");
})


app.listen(3000,function(){
  console.log("server started on port 3000")
});
