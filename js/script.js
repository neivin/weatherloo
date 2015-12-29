
// Global variables for weather data
CITY = "Guelph";
COUNTRY = "CA";
MODE = "json";
UNITS = "metric";
DAY_COUNT = "7";
KEY = "02a42eaec5b1ddb66d13d38f6085d0de";

function getMetricOrImperial(unit) {
	if (unit == 'c')
		return 'metric';

	return 'imperial';
}

function load_options(){
	chrome.storage.sync.get({
    temp_unit: 'c',
    city: 'Guelph',
    country: 'CA'
  }, function(items) {
    
    console.log("first city:"+ CITY);
    CITY = items.city;
    console.log("new city:"+ CITY);
    console.log(items.country);
    COUNTRY = items.country;
  });
}

function buildCurrentURL(cityName, countryCode, mode, unit){
	var url = "http://api.openweathermap.org/data/2.5/weather"+
	"?q=" + cityName + "," + countryCode +
	"&mode="+ mode +
	"&units=" + unit +
	"&APPID=" + KEY;

	return url;
}

function buildForecastURL(cityName, countryCode, mode, unit, days){
	var url = "http://api.openweathermap.org/data/2.5/forecast/daily"+
	"?q=" + cityName + "," + countryCode +
	"&mode=" + mode +
	"&units=" + unit +
	"&cnt=" + days +
	"&APPID=" + KEY;

	return url;
}

// Building URL for current weather data (Open Weather Map)
var currentURL = "http://api.openweathermap.org/data/2.5/weather"+
"?q=" + CITY + "," + COUNTRY +
"&mode="+ MODE +
"&units=" + UNITS +
"&APPID=" + KEY;


// Building URL for forecast data (Open Weather Map)
var forecastURL = "http://api.openweathermap.org/data/2.5/forecast/daily"+
"?q=" + CITY + 
"&mode=" + MODE +
"&units=" + UNITS +
"&cnt=" + DAY_COUNT +
"&APPID=" + KEY;


$(document).ready(function(){

	$.getJSON(currentURL, function(json) {
		// get sunrise and sunset and convert unix epoch into string
		var sunrise = timeConverter(json.sys.sunrise, "hrmin");
		var sunset = timeConverter(json.sys.sunset, "hrmin");

		// current weather description
		var weatherDesc = json.weather[0].description;

		// current weather icon path
		var weatherIcon = "img/weather_icons/" + json.weather[0].icon + ".png";

		// current date string builder
		var monthArr = ["Jan", "Feb", "Mar", "Apr", "May", "June", 
		"July", "Aug", "Sept", "Oct", "Nov", "Dec"];
		var dayArr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
		var curDate = new Date();
		var da = dayArr[curDate.getDay()];
		var mo = monthArr[curDate.getMonth()];
		var dt = curDate.getDate();
		
		var dtString = da + ", " + mo + " " + dt;


		var windSpeed = json.wind.speed;
		var windDirection = angleToDirection(json.wind.deg);

		var wind = Math.round(windSpeed * 18 / 5) + " kph " + windDirection;
		$('#wind').html(wind);

		// Set humidity
		var hum = json.main.humidity;
		$('#hum').html(Math.round(hum)+" %")

		// Set temperature
		var temp = Math.round(json.main.temp);
		console.log(temp);
		$('#temperature').html(temp+"<span>&deg;C</span>");

		// Set max and min temperature for the day
		var tempMax = json.main.temp_max;
		var tempMin = json.main.temp_min;

		if (json.main.temp_max)
			$('#hi').html("&#9650; "+ Math.round(tempMax) +" &deg;C");
		else
			$('#hi').html("&#9650; "+ Math.round(temp) +" &deg;C");

		if (json.main.temp_min)
			$('#lo').html("&#9660; "+ Math.round(tempMin) +" &deg;C");
		else
			$('#hi').html("&#9650; "+ Math.round(temp) +" &deg;C");
		

		// Pressure
		var pressure = json.main.pressure;
		$('#pres').html(Math.round(pressure) +" hPa");


		// Set humidex and windchill
		$('#feelslike').html("Feels like " + "<strong>" + Math.round(5.6777) + "</strong>");

		// Set the sunrise and suset times
		$('#rise').html(sunrise);
		$('#set').html(sunset);

		$('#cond').html(weatherDesc);

		$('#weather_icon').attr('src',weatherIcon);

		$('#date').html(dtString);
	});

	$.getJSON(forecastURL, function(json){
		// Get forecast information here
		var forecastArr = json.list;
		
		for(var i=1; i<=6;i++){
			var unixDate = forecastArr[i].dt;
			var day = timeConverter(unixDate, "day");
			if (day == "SUN")
				day = "<span id=\"sunday\">" + day + "</span>";

			var dt = timeConverter(unixDate, "md");

			var iconPath = "img/weather_icons/" + forecastArr[i].weather[0].icon + ".png";

			var hi = Math.round(forecastArr[i].temp.max);
			var lo = Math.round(forecastArr[i].temp.min);



			$('#day'+ i).html(day);
			$('#dt'+ i).html(dt);
			$('#ico'+ i).attr('src', iconPath);
			$('#hi'+ i).html(hi);
			$('#lo'+ i).html(lo);
		}

	});

});

function timeConverter(UNIX_timestamp, type){
	var result;
	var dayArr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];  
	
	var d = new Date(UNIX_timestamp*1000);
	
	var hour = d.getHours();
	var min = d.getMinutes();
	var day = dayArr[d.getDay()].toUpperCase();
	var date = d.getDate();
	var month = d.getMonth() + 1;
	
	if (type == "hrmin")
		result = hour + ':' + min;
	else if (type == "day")
		result = day;
	else if (type == "md")
		result = month + "/" + date;

	return result;
}

function angleToDirection(degrees) {
	if (degrees >= 338 && degrees<22)
		return "N"
	else if (degrees >= 22 && degrees<68)
		return "NE"
	else if (degrees >= 68 && degrees<112)
		return "E"
	else if (degrees >= 112 && degrees<158)
		return "SE"
	else if (degrees >= 158 && degrees<202)
		return "S"
	else if (degrees >= 202 && degrees<248)
		return "SW"
	else if (degrees >= 248 && degrees<292)
		return "W"
	else //(degrees >= 292 && degrees<338)
		return "NW"
}

$(function(){
	$("#logo").click(function(){
		var creditURL = "https://github.com/neivin/weatherloo"
		chrome.tabs.create({url: creditURL});
	});
});
