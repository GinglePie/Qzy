'use strict';

oiaApplication.factory('WebPageMapRoleManagementService',
	function WebPageMapRoleManagementService($rootScope, $state, $q, $http, localStorageService) {

		return {
			getAllWebPage: function(callback){
				var cb = callback || angular.noop;
				var deferred = $q.defer();
				var url = ENDPOINT + "admin/searchAllWebPage";
				$http.get(url).then(
					function (success) {
						var result = success.data;
						deferred.resolve(result);
						return cb(result);
					}, function (error) {
						deferred.reject(error);
						return cb(error);
					}
				);
				return deferred.promise;
			},
			doSearch: function (param, callback) {
				var cb = callback || angular.noop;
				var deferred = $q.defer();
				var url = ENDPOINT + "admin/doSearchWebPageMapRoleByRoleId/"+param;
				$http.get(url).then(
					function (success) {
						var result = success.data;
						deferred.resolve(result);
						return cb(result);
					}, function (error) {
						deferred.reject(error);
						return cb(error);
					}
				);
				return deferred.promise;
			},
			doSave: function (param, callback) {
				var cb = callback || angular.noop;
				var deferred = $q.defer();
				var userSession = localStorageService.get("userSession");
				var url = ENDPOINT + "admin/doSaveWebPageMapRole/" + userSession.userLoginName;
				$http.post(url, param).then(
					function (success) {
						var result = success.data;
						deferred.resolve(result);
						return cb(result);
					}, function (error) {
						deferred.reject(error);
						return cb(error);
					}
				);
				return deferred.promise;
			}
		};
	}
);
