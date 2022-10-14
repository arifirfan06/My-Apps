const express = require("express");
const bodyParser = require("body-parser");
const { urlencoded } = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");
// const date = require(__dirname+"/date.js"); removed for mongodb
const app = express();



// const items = ["coding", "buy foods"];
// const workItems =[];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect('mongodb+srv://zeraris:arifirfan06@cluster0.mekfdof.mongodb.net/todolistDB');

const itemsSchema = {
    name: String
};

const Item = mongoose.model("Item", itemsSchema)

const coding = new Item({ name: "Coding" });
const learning = new Item({ name: "Study for 7 hours" });
const buy = new Item({ name: "Buy foods" });

const defaultItems = [coding, learning, buy];

const listSchema = {
    name: String,
    items: [itemsSchema]
};

const List = mongoose.model("List", listSchema)

app.get("/", function (req, res) {

    Item.find({}, function (err, foundItems) {
        if (foundItems.length === 0) {
            Item.insertMany(defaultItems, function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("All done!");
                }
            });
            res.redirect("/");
        } else {
            res.render("list", { listTitle: "Today", newListItems: foundItems });
        }
    });
});
app.get("/:customListName", function (req, res) {
    const customListName = _.capitalize(req.params.customListName);
    List.findOne({ name: customListName }, function (err, foundList) {
        if (!err) {
            if (!foundList) {
                const list = new List({
                    name: customListName,
                    items: defaultItems
                });

                list.save();
                res.redirect("/" + customListName);
            }
            else {
                res.render("list", { listTitle: foundList.name, newListItems: foundList.items });
            }
        }
    });
    const list = new List({
        name: customListName,
        items: defaultItems
    });

    list.save();
});

app.post("/delete", function (req, res) {
    const checkItemId = req.body.checkbox;
    const listName = req.body.listName;
    if (listName === "Today") {
        Item.findByIdAndRemove(checkItemId, function (err) {
            if (!err) {
                console.log("All done!");
            }
        });
        res.redirect("/")
    }
    else {
        List.findOneAndUpdate({ name: listName }, { $pull: { items: { _id: checkItemId } } }, function (err, foundItem) {
            if (!err) {
                res.redirect("/" + listName);
            }
        })
    }
});


app.post("/", function (req, res) {
    const itemName = req.body.newItem;
    const listName = req.body.list;

    const newItem = new Item({ name: itemName });

    if (listName === "Today") {
        newItem.save();
        res.redirect("/")
    }
    else {
        List.findOne({ name: listName }, function (err, foundList) {
            foundList.items.push(newItem);
            foundList.save();
            res.redirect("/" + listName);
        });
    }
});


// app.get("/work", function(req,res){
//     res.render("list", {kindOfDay : "Work List", newListItems : workItems});
// });

// app.post("/work", function(req,res){
//     let item = req.body.newItem;
//     workItems.push(item);
//     res.redirect("/work");
// })

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function () {
    console.log("Server started");
});

// app.listen(process.env.PORT || 3000, function () {
//     console.log("running at localhost:3000");
// });