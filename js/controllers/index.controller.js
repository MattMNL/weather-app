(function() {
  'use strict';

  angular.module('bbWeatherApp')
    .controller('IndexController', IndexController);

  IndexController.$inject = ['LocationService', 'WeatherFactory'];

  function IndexController(LocationService, WeatherFactory) {
    var vm = this;

    // Indicate the app has finished loading
    vm.appHasLoaded = true;

    // Get list of available locations from service
    vm.locations = LocationService.getLocations();

    // Functions on our view model
    vm.displayWeather = displayWeather;

    // Function that loads weather based on provided location
    function displayWeather(loc) {
      // Set newly selected location on view model
      vm.selectedLocation = loc;

      // GET weather from API, if not already bound to our object
      if (!loc.weather) {
        loc.weather = WeatherFactory.getWeather(loc);
      }
      if (!loc.forecast) {
        loc.forecast = WeatherFactory.getForecast(loc);
        console.log(loc.forecast);
      }
    }

    // On init, load the weather of our first location in the list of locations
    displayWeather(vm.locations[0]);
  }
})();
