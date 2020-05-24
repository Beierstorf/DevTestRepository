//jshint esversion:6

const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendfile(__dirname + "/index.html");
  //res.send("Server running");
});

app.post("/", function(req, res) {
  const city = req.body.cityName;
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=eef283f96d08a840a421247023e97790&units=metric";

  //console.log(response.statusCode);
  https.get(url, function(responseAPICall) {
    responseAPICall.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const iconImageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

      //console.log(watherData);
      res.write("<p>HTTP-Status: " + responseAPICall.statusCode + "<p>");
      res.write("<br>Temperature of " + city + ":" + temp);
      res.write("<br>Description: " + description);
      res.write("<br><img src=" + iconImageURL + ">");
      res.send();
    });
  });
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server running on port 3000");
});
