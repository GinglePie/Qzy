'use strict';

oiaApplication.factory('RelationNetworkMOUInformationService',
	function RelationNetworkMOUInformationService($rootScope, $state, $q, $http,localStorageService) {
		return {
			doSave: function(param,callback){
				var cb = callback || angular.noop;
        var deferred = $q.defer();
        // console.log(param);
				var userSession = localStorageService.get("userSession");
        var url = ENDPOINT + "networkMou/doSaveInformation/"+userSession.userLoginName;
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
			doSearch: function(param,callback){
				var cb = callback || angular.noop;
        var deferred = $q.defer();
        // console.log(param);
        var url = ENDPOINT + "networkMou/doSearchNetworkMouInformation/"+param;
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
