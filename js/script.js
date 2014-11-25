// Global variables for weather data
var CITY = "Waterloo";
var MODE = "xml";
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

		// Build HTML output
		weatherHTML = "";
		dateAndTimeHTML = "";

		$data = $('current_observation', xml);

		// Collect date and time of observation
		year = $data.find('observation_year').text();
		month = $data.find('observation_month_text').text();
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

		dateAndTimeHTML += '<span>Updated on '+ month + ' ' + day +', '+ year + ' ';
		dateAndTimeHTML += time +'</span>';
		
		temp = $data.find('temperature_current_C').text();
		humidex = $data.find('humidex_C').text();
		windchill = $data.find('windchill_C').text();
		tempMax = $data.find('temperature_24hrmax_C').text();
		tempMin = $data.find('temperature_24hrmin_C').text();
		humidity = $data.find('relative_humidity_percent').text();
		dewPoint = $data.find('dew_point_C').text();
		windSpeed = $data.find('wind_speed_kph').text();
		windDirection = $data.find('wind_direction').text();
		windDirectionDegrees = $data.find('wind_direction_degrees').text();
		pressure = $data.find('pressure_kpa').text();
		pressureTrend = $data.find('pressure_trend').text();
		radiation = $data.find('incoming_shortwave_radiation_WM2').text();

		weatherHTML += '<div>Temperature: ' + temp + ' \xB0C</div>';

		weatherHTML += '<div>High/Low (24 hrs): ' + tempMax + ' \xB0C / ' + tempMin + ' \xB0C</div>';

		if (humidex != "N_A ")
			weatherHTML += '<div>Humidex (feels like): ' + humidex + ' \xB0C</div>';

		if (windchill != "N_A  ")
			weatherHTML += '<div>Windchill (feels like): ' + windchill + ' \xB0C</div>';

		weatherHTML += '<div>Wind: ' + windSpeed + ' km/h, ' + windDirection + '</div>';

		weatherHTML += '<div>Humidity: ' + humidity + '%</div>';
		weatherHTML += '<div>Dew point: ' + dewPoint + ' \xB0C</div>';

		weatherHTML += '<div>Pressure: ' + pressure + ' kPa, ' + pressureTrend + '</div>';

		weatherHTML += '<div>Radiation: ' + radiation + ' W/m' + '2'.sup() + '</div>';




		$('#dat').append(dateAndTimeHTML);
		$('#info').append(weatherHTML);

	});
	
	$.get(currentURL, {}, function(xml) {});
	
});

$(function(){
	$("#credit").click(function(){
		var creditURL = "http://weather.uwaterloo.ca"
		chrome.tabs.create({url: creditURL});
	});
});

$(function(){
	$("#logo").click(function(){
		chrome.tabs.create({url: "https://github.com/neivin/Weatherloo"});
	});
});