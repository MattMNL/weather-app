(function() {
  'use strict';

  angular.module('bbWeatherApp')
    .service('LocationService', LocationService);

  LocationService.$inject = [];

  function LocationService() {
    // List of available locations we want to query
    var locations = [{
      id: 2643743,
      city: 'London',
      country: 'United Kingdom',
      countryCode: 'gb',
      weather: null
    }, {
      id: 2759794,
      city: 'Amsterdam',
      country: 'Netherlands',
      countryCode: 'nl',
      weather: null
    }, {
      id: 6455259,
      city: 'Paris',
      country: 'France',
      countryCode: 'fr',
      weather: null
    }, {
      id: 2950159,
      city: 'Berlin',
      country: 'Germany',
      countryCode: 'de',
      weather: null
    }, {
      id: 2673730,
      city: 'Stockholm',
      country: 'Sweden',
      countryCode: 'se',
      weather: null
    }];

    // Set the currently selected location
    var selectedLocation = locations[0];

    // Register location update callbacks
    var locationUpdateCallbacks = [];

    // Function that returns all available locations
    function getLocations() {
      return locations;
    }

    // Function that returns the currently selected location
    function getSelectedLocation() {
      return selectedLocation;
    }

    // Function that sets the selected location to provided location
    function setSelectedLocation(location) {
      selectedLocation = location;
      _doCallbacks();
    }

    // Function that registers a newly supplied observer callback
    function registerLocationUpdate(callback) {
      locationUpdateCallbacks.push(callback);
    }

    // Function that triggers all register location update callbacks and provides newly selected location
    function _doCallbacks() {
      angular.forEach(locationUpdateCallbacks, function(callback) {
        callback(selectedLocation);
      });
    }

    // Return available functions for this service
    return {
      getLocations: getLocations,
      getSelectedLocation: getSelectedLocation,
      setSelectedLocation: setSelectedLocation,
      registerLocationUpdate: registerLocationUpdate
    };
  }
})();
