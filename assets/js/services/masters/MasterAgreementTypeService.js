'use strict';

oiaApplication.factory('MasterAgreementTypeService',
	function MasterAgreementTypeService($rootScope, $state, $q, $http) {

		return {
			doSearch: function(param, callback){
				var cb = callback || angular.noop;
        		var deferred = $q.defer();
				if(angular.isUndefined(param.agreementTypeName) || param.agreementTypeName == ""){
					param.agreementTypeName = "ALL";
				}
				var url = ENDPOINT + "master/agreementType/search/"+param.agreementTypeName;
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
				var url = ENDPOINT + "master/agreementType/initEdit/"+param;
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
				var url = ENDPOINT+"master/agreementType/save/"+param.userSession;
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
				var url = ENDPOINT+"master/agreementType/delete/"+param.agreementTypeId+"/"+param.userSession;
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
