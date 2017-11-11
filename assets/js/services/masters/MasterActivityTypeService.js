'use strict';

oiaApplication.factory('MasterActivityTypeService',
	function MasterActivityTypeService($rootScope, $state, $q, $http) {
		return {
			getActivityType: function(callback){
				var cb = callback || angular.noop;
        var deferred = $q.defer();
				$http.get(ENDPOINT + "master/getActivityType").then(
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
