(function() {
  'use strict';

  // wa-clock component structure
  var waClock = {
    transclude: true,
    bindings: {},
    template: `<span>{{$ctrl.now | date: 'medium'}}</span>`,
    controller: function($interval) {
      var vm = this;

      // Get the current date
      vm.now = new Date();

      // Create a clock, sets a new Date every 1000ms
      $interval(function() {
        vm.now = new Date();
      }, 1000);
    }
  };

  // Bind this component
  angular.module('bbWeatherApp')
    .component('waClock', waClock);
})();
