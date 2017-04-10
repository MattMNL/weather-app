(function() {
  'use strict';

  // wa-weather-forecast component structure
  var waWeatherForecast = {
    transclude: true,
    bindings: {
      selectedLocation: '<'
    },
    template: `<div class="Weather__forecast">
        <ul>
          <li ng-repeat="forecast in $ctrl.selectedLocation.forecast.list | limitTo: $ctrl.limiter track by $index">
            {{forecast.main.temp}}
          </li>
        </ul>
    </div>`,
    controller: function() {
      var vm = this;

      this.limiter = 5;
    }
  };

  // Bind this component
  angular.module('bbWeatherApp')
    .component('waWeatherForecast', waWeatherForecast);
})();
