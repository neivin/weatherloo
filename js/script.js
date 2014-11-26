// Global variables for weather data
var CITY = "Waterloo";
var MODE = "json";
var UNITS = "metric";
var DAY_COUNT = "7"

// Building URL for current weather data (Open Weather Map)
var currentURL = "http://api.openweathermap.org/data/2.5/weather"+
"?q=" + CITY +
"&mode="+ MODE +
"&units=" + UNITS;


// Building URL for forecast data (Open Weather Map)
var forecastURL = "http://api.openweathermap.org/data/2.5/forecast/daily"+
"?q=" + CITY + 
"&mode=" + MODE +
"&units=" + UNITS +
"&cnt=" + DAY_COUNT;

// XML feed of The University of Waterloo Weather Station
var weatherDataURL = "http://weather.uwaterloo.ca/waterloo_weather_station_data.xml";


$(document).ready(function(){

	// Open XML file
	$.get(weatherDataURL,{}, function(xml){

		$data = $('current_observation', xml);

		// Collect date and time of observation
		year = $data.find('observation_year').text();
		month = $data.find('observation_month_number').text();
		day = $data.find('observation_day').text();
		
		// This time is wrong from the XML data (always 45 mins into the hour)	
		// time = $data.find('observation_time').text();

		// Fixing observation time based on current time and the knowledge that
		// the weather station records data every 15 mins.
		var curTime = new Date();
		var hrs = curTime.getHours();
		var mins = curTime.getMinutes();
		var ampm = " AM";

		// Getting the correct hours value
		if (parseInt(hrs) > 12) {
			hrs = String(parseInt(hrs) - 12);
			ampm = " PM"
		}
		else if (parseInt(hrs) == 0)
			hrs = "12";

		// Getting the correct minutes value
		if (parseInt(mins) >= 5 && parseInt(mins) < 16)
			mins = ":00";
		if (parseInt(mins) >= 16 && parseInt(mins) < 31)
			mins = ":15";
		if (parseInt(mins) >= 31 && parseInt(mins) < 46)
			mins = ":30";
		if (parseInt(mins) >= 46 || parseInt(mins) < 5)
			mins = ":45";

		time = hrs + mins + ampm;

		var dateAndTime;
		dateAndTime = 'Updated '+ month.trim() + '/' + day.trim() + '/'+ year.trim() +', ' + time;
		$('#update').html(dateAndTime);
		

		var temp = $data.find('temperature_current_C').text();
		$('#temperature').html(Math.round(temp)+"<span>&deg;C</span>");

		var humidex = $data.find('humidex_C').text();
		var windchill = $data.find('windchill_C').text();
		var feelsLike = temp;

		if (humidex != "N_A ")
			feelsLike = humidex;
		
		if (windchill != "N_A  ")
			feelsLike = windchill;
		
		$('#feelslike').html("Feels like " + "<strong>" + Math.round(feelsLike) + "</strong>");

		var tempMax = $data.find('temperature_24hrmax_C').text();
		var tempMin = $data.find('temperature_24hrmin_C').text();

		$('#hi').html("&#9650; "+ Math.round(tempMax) +" &deg;C");
		$('#lo').html("&#9660; "+ Math.round(tempMin) +" &deg;C");

		var windSpeed = $data.find('wind_speed_kph').text();
		var windDirection = $data.find('wind_direction').text();

		var wind = Math.round(windSpeed) + " kph " + windDirection;
		$('#wind').html(wind);

		var humidity = $data.find('relative_humidity_percent').text();
		$('#hum').html(Math.round(humidity)+" %")

		var pressure = $data.find('pressure_kpa').text();
		var pressureTrend = $data.find('pressure_trend').text();
		var presArr = "&uarr;"
		if (pressureTrend == "   Falling")
			presArr = "&darr;"
		$('#pres').html(presArr + Math.round(pressure) +" kPa");

		var radiation = $data.find('incoming_shortwave_radiation_WM2').text();
		$('#rad').html(Math.round(radiation) + " W/m<span id=\"radunit\">2</span>");

	});

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

			console.log(day);
			console.log(dt);
			console.log(iconPath);
			console.log(hi);
			console.log(lo);


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


$(function(){
	$("#logo").click(function(){
		var creditURL = "https://github.com/neivin/weatherloo"
		chrome.tabs.create({url: creditURL});
	});
});
