'use strict';

oiaApplication.factory('MasterInstitutionService',
	function MasterInstitutionService($rootScope, $state, $q, $http) {

		return {
			getInstitutionType: function(callback){
				var cb = callback || angular.noop;
        var deferred = $q.defer();
				const url = ENDPOINT + "master/getInstitutionType";
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
			doSearch: function(param, callback){
				var cb = callback || angular.noop;
        var deferred = $q.defer();
				if(angular.isUndefined(param.institutionName) || param.institutionName == ""){
					param.institutionName = "ALL";
				}
				var url = ENDPOINT + "master/institution/search/"+param.countryId+"/"+param.institutionName;
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
			initEdit: function(param, callback){
				var cb = callback || angular.noop;
        var deferred = $q.defer();
				var url = ENDPOINT + "master/institution/initEdit/"+param;
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
				console.log(param);
				var url = ENDPOINT+"master/institution/save/"+param.userSession;
    		$http.post(url,param).then(
          function(success){
            deferred.resolve(success);
            return cb(success);
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
				console.log(param);
				var url = ENDPOINT+"master/institution/delete/"+param.institutionId+"/"+param.userSession;
    		$http.delete(url,param).then(
          function(success){
            deferred.resolve(success);
            return cb(success);
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
