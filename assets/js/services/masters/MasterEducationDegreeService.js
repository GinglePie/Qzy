'use strict';

oiaApplication.factory('MasterEducationDegreeService',
	function MasterEducationDegreeService($rootScope, $state, $q, $http) {
		return {
			getEducationDegree: function(callback){
				var cb = callback || angular.noop;
        var deferred = $q.defer();
				$http.get(ENDPOINT + "master/getEducationDegree").then(
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
		}
	}
);
