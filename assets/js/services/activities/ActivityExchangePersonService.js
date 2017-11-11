'use strict';

oiaApplication.factory('ActivityExchangePersonService',
	function ActivityExchangePersonService($rootScope, $state, $q, $http,localStorageService) {
		return {
      getPersonType: function(callback){
        var cb = callback || angular.noop;
        var deferred = $q.defer();
				var url = ENDPOINT + "master/getPersonType";
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
			doSearchAllPerson: function(param, callback){
				var cb = callback || angular.noop;
        var deferred = $q.defer();
				var url = ENDPOINT + "activityExchange/doSearchAllPerson/"+param;
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
			doSearchPerson: function(param, callback){
				var cb = callback || angular.noop;
        var deferred = $q.defer();
				var url = ENDPOINT + "activityExchange/doSearchPerson/"+param;
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
			doSave: function(param, callback){
				var cb = callback || angular.noop;
        var deferred = $q.defer();
				var userSession = localStorageService.get("userSession");
				var url = ENDPOINT + "activityExchange/doSavePerson/"+userSession.userLoginName;
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
