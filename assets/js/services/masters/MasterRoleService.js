'use strict';

oiaApplication.factory('MasterRoleService',
	function MasterRoleService($rootScope, $state, $q, $http,localStorageService) {
		return {
			getAllRole: function(callback){
				var cb = callback || angular.noop;
        var deferred = $q.defer();
				$http.get(ENDPOINT + "admin/doSearchAllRole").then(
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
      doSearchPost: function (param, callback) {
				var cb = callback || angular.noop;
				var deferred = $q.defer();
				var url = ENDPOINT + "admin/doSearchRoleByParam";
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
			},
			doSave: function (param, callback) {
				var cb = callback || angular.noop;
				var deferred = $q.defer();
				var userSession = localStorageService.get("userSession");
				var url = ENDPOINT + "admin/doSaveRole/" + userSession.userLoginName;
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
			},
			initEdit: function (param, callback) {
				var cb = callback || angular.noop;
				var deferred = $q.defer();
				var url = ENDPOINT + "admin/initEditRole/" + param;
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
			}
		}
	}
);
