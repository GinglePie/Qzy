'use strict';

oiaApplication.factory('MainService',
	function MainService($rootScope, $state, $q, $http,localStorageService) {
		return {
      		doSearch:function(param, callback){
				var cb = callback || angular.noop;
        		var deferred = $q.defer();
				var url = ENDPOINT + "main/doSearchMain";
				$http.post(url,param).then(
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
