'use strict';

oiaApplication.factory('InstitutionExchangeService',
	function InstitutionExchangeService($rootScope, $state, $q, $http,localStorageService) {

		return {
			initEdit: function(param, callback){
				var cb = callback || angular.noop;
        var deferred = $q.defer();
				console.log(param);
				var url = ENDPOINT+"institution/initEditInstitutionExchange/"+param;
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
			doSave: function(param, callback){
				var cb = callback || angular.noop;
        var deferred = $q.defer();
				console.log(param);
        var userSession = localStorageService.get("userSession");
				var url = ENDPOINT+"institution/doSaveInstitutionExchange/"+userSession.userLoginName;
    		$http.post(url,param).then(
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
			doSearch: function(param,callback){
				var cb = callback || angular.noop;
        var deferred = $q.defer();
				var url = ENDPOINT+"institution/doSearchInstitutionExchange/"+param;
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
				var url = ENDPOINT+"institution/doDeleteExchange/"+param+"/"+userSession.userLoginName;
				$http.delete(url).then(
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
