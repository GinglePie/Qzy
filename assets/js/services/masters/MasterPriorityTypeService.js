'use strict';

oiaApplication.factory('MasterPriorityTypeService',
	function MasterPriorityTypeService($rootScope, $state, $q, $http) {
		return {
			getPriorityType: function(callback){
				var cb = callback || angular.noop;
        var deferred = $q.defer();
				$http.get(ENDPOINT + "master/getPriority").then(
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
