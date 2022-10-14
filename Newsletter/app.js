const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
// https = Native Node.js Module (tidak perlu install)
const https = require("https");
const { post } = require("request");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
// statements diatas sering digunakan 
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
    var firstName = req.body.fName;
    var lastName = req.body.lName;
    var email = req.body.email;

    // console.log(firstName, lastName, email);

    var data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
        }]
    };
    // ubah object menjadi string untuk dikirim ke web server
    const jsonData = JSON.stringify(data);
    const url = "https://us13.api.mailchimp.com/3.0/lists/a3ec53c1a6";
    const option = {
        method: "POST",
        auth: "zeraris:26f114f5a54298474f273c21c0ebd4de-us13"
    }

    const request = https.request(url, option, function(response) {
        
        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        }
        else {
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data", function (data) {
            console.log(JSON.parse(data));
        });
    });
    request.write(jsonData);
    request.end();
});
//dibawah ini digunakan untuk mengerjakan action dari button file failure.html ke home route lalu ke halaman utama
app.post("/failure", function(res){
    res.redirect("/");
});

app.listen(process.env.PORT || 3000, function () {
    console.log("running in localhost:3000");
});

// 26f114f5a54298474f273c21c0ebd4de-us13

// list id = a3ec53c1a6