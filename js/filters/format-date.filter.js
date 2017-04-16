(function() {
  'use strict';

  angular.module('bbWeatherApp')
    .filter('formatDate', formatDate);

  formatDate.$inject = [];

  function formatDate() {
    // Format supplied date to proper JS Date
    return function(date) {
      // Replace whitespace with 'T' as required
      date = date.replace(' ', 'T');

      // Return a new JS Date
      return new Date(date);
    };
  }
})();
