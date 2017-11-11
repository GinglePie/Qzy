'use strict';

oiaApplication.factory('MasterLinkageService',
	function MasterLinkageService($rootScope, $state, $q, $http) {
		return {
			getLinkage: function(param,callback){
				var cb = callback || angular.noop;
        var deferred = $q.defer();
        const url = ENDPOINT + "institution/getAllRelationship/"+param;
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
		}
	}
);
