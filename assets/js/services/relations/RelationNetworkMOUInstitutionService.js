'use strict';

oiaApplication.factory('RelationNetworkMOUInstitutionService',
	function RelationNetworkMOUInstitutionService($rootScope, $state, $q, $http,localStorageService) {
		return {
			doSearch: function(param, callback){
				var cb = callback || angular.noop;
        var deferred = $q.defer();
				var url = ENDPOINT + "networkMou/doSearchNetworkMouInstitution/"+param;
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
			doSave: function(param,callback){
				var cb = callback || angular.noop;
        var deferred = $q.defer();
        // console.log(param);
				var userSession = localStorageService.get("userSession");
        var url = ENDPOINT + "networkMou/doSaveInstitution/"+userSession.userLoginName;
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
        // console.log(param);
				var userSession = localStorageService.get("userSession");
        var url = ENDPOINT + "networkMou/doDeleteNetworkMouInstitution/"+param.networkMouId+"/"+param.institutionId+"/"+userSession.userLoginName;
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
