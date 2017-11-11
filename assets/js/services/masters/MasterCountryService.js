'use strict';

oiaApplication.factory('MasterCountryService',
	function MasterCountryService($rootScope, $state, $q, $http) {

		// $http.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';

		// $http.defaults.xsrfHeaderName = 'X-CSRF-TOKEN';
		// $http.defaults.xsrfCookieName = 'CSRF-TOKEN';

		return {
      doSearch: function(param, callback){
        var cb = callback || angular.noop;
        var deferred = $q.defer();
        // console.log(param);
        var url = ENDPOINT + "master/country/search/"+param.regionId+"/"+param.countryName;
        $http.get(url).then(
          function(success){
            var result = success.data;
            deferred.resolve(result);
            return cb(result);
          },function(error){
            deferred.reject(error);
            return cb(error);
          }
        );
        return deferred.promise;
      },
      initEdit: function(param, callback){
        var cb = callback || angular.noop;
        var deferred = $q.defer();
        var url = ENDPOINT + "master/country/initEdit/"+param;
        $http.get(url).then(
          function(success){
            var result = success.data;
            deferred.resolve(result);
            return cb(result);
          },function(error){
            deferred.reject(error);
            return cb(error);
          }
        );
        return deferred.promise;
      },
      doSave: function(param, callback){
        var cb = callback || angular.noop;
        var deferred = $q.defer();
        console.log(param);
        var url = ENDPOINT+"master/country/save/"+param.userSession;
        $http.post(url,param).then(
          function(success){
            deferred.resolve(success);
            return cb(success);
          },function(error){
            deferred.reject(error);
            return cb(error);
          }
        );
        return deferred.promise;
      },
      doDelete: function(param, callback){
        var cb = callback || angular.noop;
        var deferred = $q.defer();
        console.log(param);
        var url = ENDPOINT+"master/country/delete/"+param.countryId+"/"+param.userSession;
        $http.delete(url,param).then(
          function(success){
            deferred.resolve(success);
            return cb(success);
          },function(error){
            deferred.reject(error);
            return cb(error);
          }
        );
        return deferred.promise;
      }
    };
  }
);
