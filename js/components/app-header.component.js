(function() {
  'use strict';

  // wa-app-header component structure
  var waAppHeader = {
    transclude: true,
    bindings: {},
    template: `<header class="Weather__head">
        <h2 class="Weather__head__city">
          <div class="row">
            <div class="col-xs-2 col-sm-5 text-right">
              <span class="icon icon-location2"></span>
            </div>
            <div class="col-xs-10 col-sm-7 text-left">
              {{$ctrl.selectedLocation.weather.name}}
            </div>
          </div>
        </h2>

        <h3 class="Weather__head__date">
          <wa-clock></wa-clock>
        </h3>
    </header>`,
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
    .component('waAppHeader', waAppHeader);
})();
