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
			
		time = $data.find('observation_time').text();

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

		if (humidex === 'N_A')
			console.log("no humidex");
		else 
			weatherHTML += '<div>Humidex (feels like): ' + humidex + ' \xB0C</div>';

		if (windchill != 'N_A')
			weatherHTML += '<div>Windchill (feels like): ' + windchill + ' \xB0C</div>';

		weatherHTML += '<div>Wind: ' + windSpeed + ' km/h, ' + windDirection + '</div>';

		weatherHTML += '<div>Humidity: ' + humidity + '%</div>';
		weatherHTML += '<div>Dew point: ' + dewPoint + ' \xB0C</div>';

		weatherHTML += '<div>Pressure: ' + pressure + ' kPa, ' + pressureTrend + '</div>';

		weatherHTML += '<div>Radiation: ' + radiation + ' W/m' + '2'.sup() + '</div>';




		$('#dat').append(dateAndTimeHTML);
		$('#info').append(weatherHTML);

	});
});