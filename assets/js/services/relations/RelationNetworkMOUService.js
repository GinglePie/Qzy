'use strict';

oiaApplication.factory('RelationNetworkMOUService',
	function RelationNetworkMOUService($rootScope, $state, $q, $http,localStorageService) {
		return {
			doSearch: function(param, callback){
				var cb = callback || angular.noop;
        var deferred = $q.defer();
				var url = ENDPOINT + "networkMou/doSearchNetworkMouByParam";
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
      },
			doDelete: function(param, callback){
				var cb = callback || angular.noop;
        var deferred = $q.defer();
				var userSession = localStorageService.get("userSession");
				var url = ENDPOINT + "networkMou/doDeleteNetworkMou/"+param+"/"+userSession.userLoginName;
				$http.delete(url,param).then(
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
