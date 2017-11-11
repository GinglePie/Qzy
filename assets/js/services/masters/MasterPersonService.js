'use strict';

oiaApplication.factory('MasterPersonService',
	function MasterPersonService($rootScope, $state, $q, $http) {

		return {
			getPersonType:function(callback){
				return $http.get(ENDPOINT+"master/getPersonType");
			},doSearch: function(param, callback){
				var cb = callback || angular.noop;
        		var deferred = $q.defer();
				if(angular.isUndefined(param.personName) || param.personName == ""){
					param.personName = "ALL";
				}
				var url = ENDPOINT + "master/person/search/"+param.personName;
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
      		},initEdit: function(param, callback){
				var cb = callback || angular.noop;
        		var deferred = $q.defer();
				var url = ENDPOINT + "master/person/initEdit/"+param;
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
			},doSave: function(param, callback){
				var cb = callback || angular.noop;
        		var deferred = $q.defer();
				console.log(param);
				var url = ENDPOINT+"master/person/save/"+param.userSession;
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
			},doDelete: function(param, callback){
				var cb = callback || angular.noop;
        		var deferred = $q.defer();
				console.log(param);
				var url = ENDPOINT+"master/person/delete/"+param.personId+"/"+param.userSession;
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
