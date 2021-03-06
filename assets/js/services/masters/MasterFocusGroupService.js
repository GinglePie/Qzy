'use strict';

oiaApplication.factory('MasterFocusGroupService',
	function MasterFocusGroupService($rootScope, $state, $q, $http) {

		return {
			doSearch: function(param, callback){
				var cb = callback || angular.noop;
        		var deferred = $q.defer();
				if(angular.isUndefined(param.focusGroup) || param.focusGroup == ""){
					param.focusGroup = "ALL";
				}
				var url = ENDPOINT + "master/focusGroup/"+param.focusTypeId+"/"+param.focusGroup;
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
				var url = ENDPOINT + "master/prefix/initEdit/"+param;
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
				var url = ENDPOINT+"master/prefix/save/"+param.userSession;
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
				var url = ENDPOINT+"master/prefix/delete/"+param.prefixId+"/"+param.userSession;
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
