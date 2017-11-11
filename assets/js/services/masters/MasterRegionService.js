'use strict';

oiaApplication.factory('MasterRegionService',
	function MasterRegionService($rootScope, $state, $q, $http) {

		return {
      doSearch: function(param, callback){
				var cb = callback || angular.noop;
        var deferred = $q.defer();
				if(angular.isUndefined(param) || param == ""){
					param = "ALL";
				}
				var url = ENDPOINT + "master/region/search/"+param;
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
				var url = ENDPOINT + "master/region/initEdit/"+param;
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
				if(null != param && !angular.isUndefined(param.regionId) && param.regionId != ""){
					param.regionId = param.regionId.toString();
				}
				var url = ENDPOINT+"master/region/save/"+param.userSession.userLoginName;
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
				var url = ENDPOINT+"master/region/delete/"+param.regionId+"/"+param.userSession;
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
