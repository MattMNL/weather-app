(function() {
  'use strict';

  // wa-current-weather component structure
  var waCurrentWeather = {
    transclude: true,
    bindings: {
      selectedLocation: '<'
    },
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
    controller: function() {
      var vm = this;
    }
  };

  // Bind this component
  angular.module('bbWeatherApp')
    .component('waCurrentWeather', waCurrentWeather);
})();
