const express= require("express");

const app = express();
// app.use(express.json())
const bodyParser=require("body-parser");
const https=require("https");

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
 res.sendFile(__dirname+"/index.html")
});

app.post("/",function(req,res){
  
  const query=req.body.cityName;
const apiKey = "a1c1ffb9a5dffb73e8546ed8cc9b821a";
const unit="metric";
const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;

https.get(url,function(response){
     console.log(response.statusCode);
     
     response.on('data',function(data){
      const weatherData=JSON.parse(data);
     
      
       const temp=weatherData.main.temp;
      //  console.log(temp)
       const icon=weatherData.weather[0].icon;
      // console.log(icon)
    
     const imageURL="https://openweathermap.org/img/wn/"+icon+"@2x.png"
    
     
       const weatherdes=weatherData.weather[0].description;
       res.write("<p>The weather is currently "+weatherdes+"</p>")
       res.write('<h1>The Temperature in '+query+' is '+ temp + ' degree celcius</h1>')
      
       res.write("<img src="+ imageURL+" >")
       res.send()
     //   console.log(weatherdes)
     //     console.log(weatherdata)
     })
 })

// res.send("server is up and running")
});




app.listen(8000, function()  {
    console.log("Example app listening on 8000");
})