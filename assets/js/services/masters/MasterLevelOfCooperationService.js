'use strict';

oiaApplication.factory('MasterLevelOfCooperationService',
	function MasterLevelOfCooperationService($rootScope, $state, $q, $http) {
		return {
			getLevelOfCooperation: function(callback){
				var cb = callback || angular.noop;
        var deferred = $q.defer();
				$http.get(ENDPOINT + "master/getLevelOfCooperation").then(
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
			}
		}
	}
);
