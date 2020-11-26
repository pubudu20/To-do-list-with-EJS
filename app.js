const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const items = ["Buy Food", "Cook Food", "Eat Food"];

mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb://localhost:27017/todolistDB', { useNewUrlParser: true });

const itemsSchema = new mongoose.Schema ({
  name: {
    type: String,
    required: [true, "Please specify a name"]
  }
});

const Item = mongoose.model("Item", itemsSchema);

const eat = new Item({
  name: "Eat"
});

// eat.save();

const sleep = new Item({
  name: "Sleep"
});

const code = new Item({
  name: "Code"
});

Item.insertMany([eat,sleep, code], function(err){
  if(err){
    console.log("error");
  }else{
    console.log("Succcess");
  }
});

app.get("/", function(req, res) {


  const day = date.getDate();
  res.render("list", {listTitle: day,newListItems: items});
});

app.post("/", function(req, res) {
  const item = req.body.newItem;
  if (req.body.list === "work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function(req, res) {
  res.render("list", {
    listTitle: "work List",
    newListItems: workItems
  });
});

app.get("/about", function(req, res) {
  res.render("about");
})


app.listen(3000, function() {
  console.log("server started on port 3000")
});
