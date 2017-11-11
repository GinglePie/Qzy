'use strict';

oiaApplication.factory('ActivityExchangeService',
	function ActivityExchangeService($rootScope, $state, $q, $http,localStorageService) {
		return {
      doSearch: function(param, callback){
				var cb = callback || angular.noop;
        var deferred = $q.defer();
				var url = ENDPOINT + "activityExchange/doSearchActivityExchange";
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
			doDelete:function(param, callback){
				var cb = callback || angular.noop;
        var deferred = $q.defer();
				var userSession = localStorageService.get("userSession");
				var url = ENDPOINT + "activityExchange/doDeleteActivityExchange/"+param.activityExchangeId+"/"+userSession.userLoginName;
				$http.delete(url).then(
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
