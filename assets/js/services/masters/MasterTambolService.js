'use strict';

oiaApplication.factory('MasterTambolService',
	function MasterTambolService($rootScope, $state, $q, $http) {

		return {
			doSearch: function(param, callback){
				var cb = callback || angular.noop;
        		var deferred = $q.defer();
				if(angular.isUndefined(param.tambolName) || param.tambolName == ""){
					param.tambolName = "ALL";
				}
				var url = ENDPOINT + "master/tambol/search/"+param.provinceId+"/"+param.amphurId+"/"+param.tambolName;
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
				var url = ENDPOINT + "master/tambol/initEdit/"+param;
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
				var url = ENDPOINT+"master/tambol/save/"+param.userSession;
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
				var url = ENDPOINT+"master/tambol/delete/"+param.tambolId+"/"+param.userSession;
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
