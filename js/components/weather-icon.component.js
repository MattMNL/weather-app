(function() {
  'use strict';

  // wa-weather-icon component structure
  var waWeatherIcon = {
    transclude: true,
    bindings: {
      iconId: '<'
    },
    template: `<span class="Weather__current__temp__icon icon icon-{{$ctrl.currentIcon}}"></span>`,
    controller: function() {
      // Define mapping for icon code supplied by weather API
      this.iconMapping = {
        '01d': 'sun',
        '01n': 'moon',
        '02d': 'cloudy',
        '02n': 'cloud',
        '03d': 'cloud2',
        '03n': 'cloud2',
        '04d': 'cloudy2',
        '04n': 'cloudy2',
        '09d': 'rainy2',
        '09n': 'rainy2',
        '10d': 'rainy',
        '10n': 'rainy',
        '11d': 'lightning2',
        '11n': 'lightning2',
        '13d': 'snowy3',
        '13n': 'snowy3',
        '50d': 'weather',
        '50n': 'weather2',
      };

      // Wait for binding changes, since some async data needs to be loaded
      this.$onChanges = function(changesObj) {
        if (changesObj.iconId) {
          // Get current icon from map based on icon id
          this.currentIcon = this.iconMapping[this.iconId];
        }
      };
    }
  };

  // Bind this component
  angular.module('bbWeatherApp')
    .component('waWeatherIcon', waWeatherIcon);
})();
