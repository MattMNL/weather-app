(function() {
  'use strict';

  angular.module('bbWeatherApp')
    .factory('WeatherFactory', WeatherFactory);

  WeatherFactory.$inject = ['$resource'];

  function WeatherFactory($resource) {
    // Setup base Resource URL for Open Weather API
    var api = 'http://api.openweathermap.org/data/2.5/';
    var Weather = $resource(api + 'weather');
    var WeatherGroup = $resource(api + 'group');
    var WeatherForecast = $resource(api + 'forecast');

    // Define our base options for API calls
    var params = {
      units: 'metric',
      appid: '3d8b309701a13f65b660fa2c64cdc517'
    };

    // Function that queries the API to get current weather based on location
    function getWeather(location) {
      params.id = location.id;
      return Weather.get(params);
    }

    // Function that queries the API to get current weather based on location
    function getWeatherByGroup(group) {
      params.id = group;
      return WeatherGroup.get(params);
    }

    // Function that queries the API to get the weather forecast based on location
    function getForecast(location) {
      params.id = location.id;
      return WeatherForecast.get(params);
    }

    // Return available functions for this factory
    return {
      getWeather: getWeather,
      getWeatherByGroup: getWeatherByGroup,
      getForecast: getForecast
    };
  }
})();
