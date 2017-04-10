(function() {
  'use strict';

  angular.module('bbWeatherApp')
    .factory('WeatherFactory', WeatherFactory);

  WeatherFactory.$inject = ['$resource'];

  function WeatherFactory($resource) {
    // Setup base Resource URL for Open Weather API
    var api = 'http://api.openweathermap.org/data/2.5/';
    var Weather = $resource(api + 'weather');
    var WeatherForecast = $resource(api + 'forecast');

    // Define our base options for API calls
    var params = {
      units: 'metric',
      appid: '3d8b309701a13f65b660fa2c64cdc517'
    };

    // Function that queries the API to get current weather based on location
    function getWeather(loc) {
      return Weather.get(_constructQueryParams(loc));
    }

    // Function that queries the API to get the weather forecast based on location
    function getForecast(loc) {
      return WeatherForecast.get(_constructQueryParams(loc));
    }

    function _constructQueryParams(loc) {
      // Set our query location from provided location object
      params.q = loc.city + ',' + loc.countryCode;
      return params;
    };

    // Return available functions for this factory
    return {
      getWeather: getWeather,
      getForecast: getForecast
    };
  }
})();
