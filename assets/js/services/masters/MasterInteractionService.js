'use strict';

oiaApplication.factory('MasterInteractionService',
	function MasterInteractionService($rootScope, $state, $q, $http) {
		return {
			getInteraction: function(callback){
				var cb = callback || angular.noop;
        var deferred = $q.defer();
				$http.get(ENDPOINT + "/master/getInteraction").then(
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
