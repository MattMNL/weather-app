(function() {
  'use strict';

  // wa-current-weather component structure
  var waCurrentWeather = {
    transclude: true,
    bindings: {},
    template: `<div class="Weather__current">
        <p class="Weather__current__temp">
            <wa-weather-icon icon-id="$ctrl.selectedLocation.weather.weather[0].icon"></wa-weather-icon>
            {{$ctrl.selectedLocation.weather.main.temp | number: 0}}
            <span class="Weather__current__temp__celsius icon icon-Celsius"></span>
        </p>

        <p class="Weather__current__windspeed">
            <span>{{$ctrl.selectedLocation.weather.wind.speed}}</span> km/h
        </p>
    </div>`,
    controller: function(LocationService) {
      var vm = this;

      // Get the currently selected location
      vm.selectedLocation = LocationService.getSelectedLocation();

      // Register callback for selected location update
      LocationService.registerLocationUpdate(function(location) {
        vm.selectedLocation = location;
      });
    }
  };

  // Bind this component
  angular.module('bbWeatherApp')
    .component('waCurrentWeather', waCurrentWeather);
})();
