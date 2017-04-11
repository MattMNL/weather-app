(function() {
  'use strict';

  // wa-weather-forecast component structure
  var waWeatherForecast = {
    transclude: true,
    bindings: {},
    template: `<div class="Weather__forecast">
        <ul class="list-unstyled">
          <li class="Weather__forecast__item" ng-repeat="forecast in $ctrl.selectedLocation.forecast.list | limitTo: $ctrl.limiter track by $index">
            <span class="Weather__forecast__item__label">{{$ctrl.formatToDate(forecast.dt_txt) | date: 'h a'}}</span>

            <wa-weather-icon icon-id="forecast.weather[0].icon"></wa-weather-icon>

            <p class="Weather__forecast__item__temp">
              {{forecast.main.temp | number: 0}}
              <span class="Weather__forecast__item__temp__celsius icon icon-Celsius"></span>
            </p>
          </li>
        </ul>
    </div>`,
    controller: function(LocationService, WeatherFactory) {
      var vm = this;

      // Set a lmimier for the forecast request
      vm.limiter = 5;

      // Get the currently selected location
      vm.selectedLocation = LocationService.getSelectedLocation();

      // Functions on our view model
      vm.getWeatherForecast = getWeatherForecast;
      vm.formatToDate = formatToDate;

      // Function that gets the weather forecast for the selected location
      function getWeatherForecast(location) {
        if (!location.forecast) {
          location.forecast = WeatherFactory.getForecast(location);
        }
      }

      // Function that formats a supplied date to a JS Date
      function formatToDate(date) {
        return new Date(date);
      }

      // Register callback for selected location update
      LocationService.registerLocationUpdate(function(location) {
        vm.selectedLocation = location;
        getWeatherForecast(vm.selectedLocation);
      });

      getWeatherForecast(vm.selectedLocation);
    }
  };

  // Bind this component
  angular.module('bbWeatherApp')
    .component('waWeatherForecast', waWeatherForecast);
})();
