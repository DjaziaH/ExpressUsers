var express =require("express");
var app = express();
var router = require("./routers/router");


app.use("/utilisateurs",router);
app.listen(5000);