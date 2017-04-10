(function() {
  'use strict';

  // wa-app-header component structure
  var waAppHeader = {
    transclude: true,
    bindings: {
      selectedLocation: '<'
    },
    template: `<header class="Weather__head">
        <h2 class="Weather__head__city">
          <div class="row">
            <div class="col-xs-5 text-right">
              <span class="icon icon-location2"></span>
            </div>
            <div class="col-xs-7 text-left">
              {{$ctrl.selectedLocation.weather.name}}
            </div>
          </div>
        </h2>

        <h3 class="Weather__head__date">
          {{$ctrl.today | date: 'EEEE, MMMM d y'}}
        </h3>
    </header>`,
    controller: function() {
      var vm = this;

      // Get the current date
      vm.today = new Date();
    }
  };

  // Bind this component
  angular.module('bbWeatherApp')
    .component('waAppHeader', waAppHeader);
})();
