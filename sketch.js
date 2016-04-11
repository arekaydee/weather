var cities;
var city;
var tempColor = "grey";
var today = new Date();
var sunset;
var sunrise;
var windMove = 0;
var t = 100;
var sunX, sunY;
var sunFill = "rgba (255,255,255,1)";


var clouds = [];
cloudColor = "rgba(240,240,240,.5)";



function setup() {

  cities = createSelect();
  cities.option('Plovdiv, BG');
  cities.option('Surprise, AZ');
  cities.option('Boston, MA');

  //Change these cities and/or add your own

  cities.changed(loadCity);
  loadCity();

  createCanvas(500,1000);


  for(var i = 0; i < 10; i = i+1){
    clouds.push( new cloud(i*(50+random(10)),100+30+random(30)) );
  }

}

function draw() {
  if(city){
    background(232,230,230);
    noStroke();
    fill("white");
    textSize(100);
    textAlign(CENTER);
    text(city.weather[0].main,250,180);
    fill(floor(city.main.temp*2),floor(city.main.temp*2),200);
    ellipse(250,50,175,175);
    rect(0,190,500,60);
    strokeWeight(5);
    stroke("white");
    ellipse(310,75,15,15);

    noStroke();
    fill(sunFill);
    var sunX = 250 + Math.cos(t)*400/2;
    var sunY = 300 + Math.sin(t)*125/2;
    ellipse(sunX,sunY,20,20);
    t = t + .02;





    noStroke();
    fill("black");
    rect(0,0,500,50);
    rect(0,300,200,40);
    rect(300,300,200,40);
    rect(0,340,500,40);

    textAlign(LEFT);

    textSize(32);
    fill("white");
    text(city.name,15,38);


    textSize(60);
    textAlign(CENTER);
    text(floor(city.main.temp),260,108);

    textAlign(RIGHT);
    textSize(18);
    textLeading(28);
    text(floor(city.main.temp_max)+"\n"+floor(city.main.temp_min),219,80);
    text(today.toLocaleDateString(),485,38);
    text("wind speed: "+city.wind.speed,490,239);


    fill(sunX*.4);
    var sunset = new Date(city.sys.sunset*1000);
    text("Sunset: "+sunset.toLocaleTimeString(),490,328);
    textAlign(LEFT);
    var sunrise = new Date(city.sys.sunrise*1000);
    text("Sunrise: "+sunrise.toLocaleTimeString(),10,328);




    stroke("white");
    strokeWeight(3);
    for(var i = 0; i < 30; i = i+1){
      line(windMove+i*30,205,windMove+10+i*30,205);
    }
    if(windMove < 0){
    			windMove = windowWidth;
    		} else if(windMove > 30){
    			windMove = 0;
        }
    windMove+=city.wind.speed/2;

    for(var i = 0; i < clouds.length; i++){
  		clouds[i].drawCloud();
  	}














  }
}

//These functions below load the weather data and save it to the city variable.
//There is no need to edit these functions.
function loadCity(){
  var url = 'http://api.openweathermap.org/data/2.5/weather?q='+cities.value()+
   '&APPID=f02124924447c73bc1d1626b1bee5f45&units=imperial';//set units=metric if you prefer Celcius
  loadJSON(url,setCity);
}
function setCity(data){
  city = data;
}

function cloud(x,y){
  this.x = x;
  this.y = y;
  this.drawCloud = function(){
      noStroke();
      fill(cloudColor);
      ellipse(this.x,this.y,city.clouds.all*.75,city.clouds.all*.75);
      ellipse(this.x+city.clouds.all*.3,this.y+city.clouds.all*.2,city.clouds.all*.5,city.clouds.all*.5);
      ellipse(this.x-city.clouds.all*.2,this.y-city.clouds.all*.2,city.clouds.all*.2,city.clouds.all*.2);
      ellipse(this.x-city.clouds.all*.3,this.y+city.clouds.all*.1,city.clouds.all*.4,city.clouds.all*.4);
      ellipse(this.x+city.clouds.all*.4,this.y-city.clouds.all*.2,city.clouds.all*.3,city.clouds.all*.3);



  }
}
