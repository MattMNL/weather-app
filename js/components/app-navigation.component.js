(function() {
  'use strict';

  // wa-app-navigation component structure
  var waAppNavigation = {
    transclude: true,
    bindings: {
      selectedLocation: '<',
      onClick: '<'
    },
    template: `<nav class="Weather__navigation">
        <ul class="list-unstyled">
            <li class="Weather__navigation__item"
                ng-repeat="location in $ctrl.locations track by $index"
                ng-click="$ctrl.onClick(location)"
                ng-class="{ 'is-selected': location.city === $ctrl.selectedLocation.city}">
                <h4 class="Weather__navigation__item__city">
                  <wa-weather-icon icon-id="location.weather.weather[0].icon"></wa-weather-icon>
                  {{location.city}}
                </h4>

                <p class="Weather__navigation__item__temp">
                  {{location.weather.main.temp | number: 0}}
                  <span class="Weather__navigation__item__temp__celsius icon icon-Celsius"></span>
                </p>

                <p class="text-right">{{location.weather.wind.speed}} km/h</p>
            </li>
        </ul>
    </nav>`,
    controller: function(LocationService) {
      var vm = this;

      // Get list of available locations from service
      vm.locations = LocationService.getLocations();
    }
  };

  // Bind this component
  angular.module('bbWeatherApp')
    .component('waAppNavigation', waAppNavigation);
})();
