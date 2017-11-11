'use strict';

oiaApplication.factory('MasterNetworkMOUTypeService',
	function MasterNetworkMOUTypeService($rootScope, $state, $q, $http) {
		return {
			getInstitutionType: function(callback){
				var cb = callback || angular.noop;
        var deferred = $q.defer();
				$http.get(ENDPOINT + "master/getNetworkMouType").then(
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
