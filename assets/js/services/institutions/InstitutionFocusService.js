'use strict';

oiaApplication.factory('InstitutionFocusService',
	function InstitutionFocusService($rootScope, $state, $q, $http,localStorageService) {

		return {
			doSave: function(param, callback){
				var cb = callback || angular.noop;
        var deferred = $q.defer();
				console.log(param);
        var userSession = localStorageService.get("userSession");
				var url = ENDPOINT+"focus/doSaveFocus/"+userSession.userLoginName;
    		$http.post(url,param).then(
          function(success){
            const result = success.data;
            deferred.resolve(result);
            return cb(result);
          }
        ).catch(
					function(error){
						deferred.reject(error);
            return cb(error);
          }
				);
	    	return deferred.promise;
			},
			doSearch: function(param,callback){
				var cb = callback || angular.noop;
        var deferred = $q.defer();
				var url = ENDPOINT+"focus/doSearchInstitutionFocus/"+param;
				$http.get(url).then(
					function(success){
						const result = success.data;
						deferred.resolve(result);
						return cb(result);
					},function(error){
						deferred.reject(error);
            return cb(error);
					}
				);
				return deferred.promise;
			},
			initEdit: function(param,callback){
				var cb = callback || angular.noop;
        var deferred = $q.defer();
				var url = ENDPOINT+"focus/initEditInstitutionFocus/"+param;
				$http.get(url).then(
					function(success){
						const result = success.data;
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
				var url = ENDPOINT+"focus/doDeleteInstitutionFocus/"+userSession.userLoginName;
				$http.patch(url,param).then(
					function(success){
						const result = success.data;
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
