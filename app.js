const express = require("express");
const https=require("https");
const bodyParser=require("body-parser");

const app=express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){

res.sendFile(__dirname+"/index.html");
})



    app.post("/", function(req, res){

        const city=req.body.city_;
        const units=req.body.units;
        const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=aca5dbb5b681377b586a7e967139ccc0&units="+units;
        https.get(url, function(response){
        //    console.log(response);
        response.on("data", function(data){
            const weather=JSON.parse(data);
            const temp=weather.main.temp;
            const descp=weather.weather[0].description;
            // console.log(temp);
            // console.log(descp);
            const icon=weather.weather[0].icon;
            const url="http://openweathermap.org/img/wn/"+ icon +"@2x.png";
            res.write("<p>The weather is currently " + descp+"</p>");
            res.write("<h1>The temperature in "+ city +" is " + temp+"</h1>");
            res.write("<img src="+url+">"); 
            res.send();
        })
        });

    })

app.listen(3000, function(){
console.log("i am in");

})