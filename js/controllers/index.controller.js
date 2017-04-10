(function() {
  'use strict';

  angular.module('bbWeatherApp')
    .controller('IndexController', IndexController);

  IndexController.$inject = ['WeatherFactory'];

  function IndexController(WeatherFactory) {
    var vm = this;

    // Indicate the app has finished loading
    vm.appHasLoaded = true;

    // List of available locations we want to query
    vm.locations = [{
      city: 'London',
      country: 'United Kingdom',
      countryCode: 'uk',
      weather: null
    }, {
      city: 'Amsterdam',
      country: 'Netherlands',
      countryCode: 'nl',
      weather: null
    }, {
      city: 'Paris',
      country: 'France',
      countryCode: 'fr',
      weather: null
    }, {
      city: 'Berlin',
      country: 'Germany',
      countryCode: 'de',
      weather: null
    }, {
      city: 'Stockholm',
      country: 'Sweden',
      countryCode: 'se',
      weather: null
    }];

    // Get the current date
    vm.today = new Date();

    // Functions on our view model
    vm.displayWeather = displayWeather;

    // Function that loads weather based on provided location
    function displayWeather(loc) {
      // Set newly selected location on view model
      vm.selectedLocation = loc;

      // GET weather from API, if not already bound to our object
      if (!loc.weather) {
        loc.weather = WeatherFactory.getByLocation(loc);
      }
    }

    // On init, load the weather of our first location in the list of locations
    displayWeather(vm.locations[0]);
  }
})();
