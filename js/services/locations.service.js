(function() {
  'use strict';

  angular.module('bbWeatherApp')
    .service('LocationService', LocationService);

  LocationService.$inject = [];

  function LocationService() {
    // List of available locations we want to query
    var locations = [{
      city: 'London',
      country: 'United Kingdom',
      countryCode: 'uk',
      weather: null
    }, {
      city: 'Amsterdam',
      country: 'Netherlands',
      countryCode: 'nl',
      weather: null
    }, {
      city: 'Paris',
      country: 'France',
      countryCode: 'fr',
      weather: null
    }, {
      city: 'Berlin',
      country: 'Germany',
      countryCode: 'de',
      weather: null
    }, {
      city: 'Stockholm',
      country: 'Sweden',
      countryCode: 'se',
      weather: null
    }];

    // Function that queries the API to get current weather based on location
    function getLocations() {
      return locations;
    }

    // Return available functions for this service
    return {
      getLocations: getLocations
    };
  }
})();
