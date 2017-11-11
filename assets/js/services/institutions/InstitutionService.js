'use strict';

oiaApplication.factory('InstitutionService',
	function InstitutionService($rootScope, $state, $q, $http,localStorageService) {

		return {
			doSave: function(param, callback){
				var cb = callback || angular.noop;
        var deferred = $q.defer();
				console.log(param);
        var userSession = localStorageService.get("userSession");
				var url = ENDPOINT+"institution/doSaveInstitution/"+userSession.userLoginName;
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
      initEdit: function(param, callback){
        var cb = callback || angular.noop;
        var deferred = $q.defer();
				var url = ENDPOINT+"institution/initEditInstitution/"+param;
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
			doSaveContactPerson: function(param, callback){
				var cb = callback || angular.noop;
        var deferred = $q.defer();
				console.log(param);
        var userSession = localStorageService.get("userSession");
				var url = ENDPOINT+"institution/doSaveInstitutionContactPerson/"+userSession.userLoginName;
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
			doSearchContactPerson: function(param, callback){
				var cb = callback || angular.noop;
        var deferred = $q.defer();
				var url = ENDPOINT+"institution/doSearchContactPersonByParam/"+param.contactPersonType+"/"+param.institutionId;
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
			initEditContactPerson: function(param, callback){
				var cb = callback || angular.noop;
        var deferred = $q.defer();
				var url = ENDPOINT+"institution/initEditInstitutionContactPerson/"+param;
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
			doDeleteContactPerson: function(param, callback){
				var cb = callback || angular.noop;
				var deferred = $q.defer();
				var userSession = localStorageService.get("userSession");
				var url = ENDPOINT+"institution/doDeleteContactPerson/"+param.contactPersonId+"/"+userSession.userLoginName;
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
