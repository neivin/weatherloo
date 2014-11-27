# Weatherloo
Weatherloo is a simple Chrome extension that displays weather information for Waterloo, ON.

The current weather data is pulled from the [weather station](http://weather.uwaterloo.ca) at the University of Waterloo.

The forecast data is pulled from the [OpenWeatherMap](http://openweathermap.org/) API.

The icons used are called WeatherCons(TWO) and can be found on the [xda-developers forum](http://forum.xda-developers.com/showthread.php?t=1922149).

The interface of this extension was inspired by [The Weather Network](http://www.theweathernetwork.com/weather/canada/ontario/waterloo) and the [AccuWeather](http://www.accuweather.com/) mobile app.

### Installation Instructions:
1. Go to the Weatherloo [releases page](https://github.com/neivin/weatherloo/releases).
2. Download the **weatherloo.crx** file.
3. Open Google Chrome:
  * From the Options menu, open your extensions page (chrome://extensions).
  * Drag the **weatherloo.crx** file into Chrome.
4. Congratulations! You've successfully installed Weatherloo!

![Screenshot](/img/screenshots/third.png)

### Future Changes:
- ~~Improve UI/UX.~~
- ~~Add forecast functionality.~~
- ~~Fetch weather information from an alternative API.~~
- Desktop notifications in times of inclement weather.
- Improve icon for better visibility (maybe?).

### Version History:

#### v1.0 Weatherloo (current)
- Improved UI/UX. Cleaned up layout, removed redundant information.
- Now shows weather forecast for 7 days.
- Now fetches current/forecast weather data from OpenWeatherMap as well.

#### v0.2.2 Weatherloo - packaged
- Fixed all known bugs (time updated, humidex, and windchill).
- Changed name of extension to "Weatherloo".
- Fixed minor name change errors.
- Added credits to Github and UW Weather Station.
- Added a .crx file for easier Chrome installation.

![Screenshot](/img/screenshots/second.png)


#### v0.1 UWeather - pre-release
- Basic functionality implemented.
- Existing bugs - time updated, humidex, and windchill API errors to be fixed.

![Screenshot](/img/screenshots/first.png)