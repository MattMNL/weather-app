(function() {
  'use strict';

  angular.module('bbWeatherApp')
    .factory('WeatherFactory', WeatherFactory);

  WeatherFactory.$inject = ['$resource'];

  function WeatherFactory($resource) {
    // Setup base Resource URL for Open Weather API
    var Weather = $resource('http://api.openweathermap.org/data/2.5/weather');

    // Define our base options for API calls
    var params = {
      'appid': '3d8b309701a13f65b660fa2c64cdc517'
    };

    // Function that queries the API based on location
    function getByLocation(loc) {
      // Set our query location from provided location object
      params.q = loc;

      // Return our Resource GET object
      return Weather.get(params);
    }

    // Return availbe factory functions for this factory
    return {
      getByLocation: getByLocation
    };
  }
})();
