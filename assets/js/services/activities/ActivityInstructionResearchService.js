'use strict';

oiaApplication.factory('ActivityInstructionResearchService',
	function ActivityInstructionResearchService($rootScope, $state, $q, $http,localStorageService) {
		return {
      doSave: function(param, callback){
				var cb = callback || angular.noop;
        var deferred = $q.defer();
				var userSession = localStorageService.get("userSession");
				var url = ENDPOINT + "activityInstructionResearch/doSave/"+userSession.userLoginName;
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
			doSearch: function(param, callback){
				var cb = callback || angular.noop;
        var deferred = $q.defer();
				var url = ENDPOINT + "activityInstructionResearch/doSearch";
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
			initEdit: function(param, callback){
				var cb = callback || angular.noop;
        var deferred = $q.defer();
				var url = ENDPOINT + "activityInstructionResearch/doSearch/"+param;
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
			}
		}
	}
);
