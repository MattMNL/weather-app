(function() {
  'use strict';

  angular.module('bbWeatherApp')
    .controller('IndexController', IndexController);

  IndexController.$inject = ['LocationService', 'WeatherFactory'];

  function IndexController(LocationService, WeatherFactory) {
    var vm = this;

    // Get list of available locations from service
    vm.locations = LocationService.getLocations();

    // Get the currently selected location
    vm.selectedLocation = LocationService.getSelectedLocation();

    // Functions on our view model
    vm.loadWeatherDataForLocations = loadWeatherDataForLocations;

    // Function that loads initial weather data for all locations
    function loadWeatherDataForLocations() {
      var locationIds = '';

      // Construct comma seperated string of IDs to query
      angular.forEach(vm.locations, function(location) {
        locationIds += location.id + ',';
      });

      // Remove trailing comma
      locationIds = locationIds.substring(0, locationIds.length - 1);

      // Get grouped weather info from weather API
      return WeatherFactory.getWeatherByGroup(locationIds).$promise
        .then(function(res) {
          // Apply weather data back to locations by id
          angular.forEach(res.list, function(weather) {
            vm.locations.find(function(location) {
              if (location.id === weather.id) {
                location.weather = weather;
              }
            });
          });

          // Indicate the app has finished loading
          vm.appHasLoaded = true;
        });
    }

    // Register callback for selected location update
    LocationService.registerLocationUpdate(function(location) {
      vm.selectedLocation = location;
    });

    loadWeatherDataForLocations();
  }
})();
