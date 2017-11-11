'use strict';

oiaApplication.factory('UserManagementService',
	function UserManagementService($rootScope, $state, $q, $http,localStorageService) {

		return {
			doSearchPost: function(param, callback){
				var cb = callback || angular.noop;
        var deferred = $q.defer();
				var url = ENDPOINT + "admin/doSearchUserByParam";
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
			doSave: function(param, callback){
				var cb = callback || angular.noop;
				var deferred = $q.defer();
				var userSession = localStorageService.get("userSession");
				var url = ENDPOINT + "admin/doSaveUser/"+userSession.userLoginName;
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
				var url = ENDPOINT + "admin/initEditUser/"+param;
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
		};
	}
);
