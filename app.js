import express from "express";
import bodyParser from "body-parser";
import axios, { HttpStatusCode } from "axios";
const PORT = 3000;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const token = "ad00c86ca03cbacc45ed118994eac16628e576be";
var fileName ="green.ejs";

app.get("/", async (req, res) => {
  const url = `http://api.waqi.info/feed/London/?token=${token}`;
  try{
    const response = await axios.get(url);
    const aqi = response.data.data.aqi;
    console.log(response.status);
    if(aqi < 50){
      fileName = "green.ejs";
    }
    else if(aqi < 100){
      fileName = "yellow.ejs";
    }
    else if(aqi < 150){
      fileName = "orange.ejs";
    }
    else if(aqi < 200){
      fileName = "red.ejs";
    }
    else if(aqi < 300){
      fileName = "purple.ejs";
    }
    else{
      fileName = "maroon.ejs";
    }
    res.render(fileName, {
        loc: response.data.data.city.name,
        aqi: response.data.data.aqi,
        updateTime: response.data.data.time.s,

    });
  } catch (error) {
    console.error(error);
    alert("Please enter a valid location");
  }
});

app.post("/", async (req, res)=>{
  const city = req.body.city;
  const url = `http://api.waqi.info/feed/${city}/?token=${token}`;
  try{
    const response = await axios.get(url);
    const aqi = response.data.data.aqi;
    console.log(response.status);
    if(aqi < 50){
      fileName = "green.ejs";
    }
    else if(aqi < 100){
      fileName = "yellow.ejs";
    }
    else if(aqi < 150){
      fileName = "orange.ejs";
    }
    else if(aqi < 200){
      fileName = "red.ejs";
    }
    else if(aqi < 300){
      fileName = "purple.ejs";
    }
    else if(aqi > 300){
      fileName = "maroon.ejs";
    }
    res.render(`${fileName}`, {
        loc: response.data.data.city.name,
        aqi: response.data.data.aqi,
        updateTime: response.data.data.time.s,

    });
    console.log(city, aqi, fileName);
  } catch (error) {
    console.error(error);
    res.render("notfound.ejs", {loc:"Location not found"});
  }
});
app.listen(PORT, () => {
  console.log(`Server has been started at port ${PORT} `);
});
