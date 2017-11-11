'use strict';

oiaApplication.factory('MasterFacultyService',
	function MasterFacultyService($rootScope, $state, $q, $http) {

		return {
			doSearchChulaFaculty: function(param, callback){
				var cb = callback || angular.noop;
        var deferred = $q.defer();
				if(angular.isUndefined(param.facultyName) || param.facultyName == ""){
					param.facultyName = "ALL";
				}
				var url = ENDPOINT + "master/faculty/search/CHULA/"+param.facultyName;
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
				if(angular.isUndefined(param.facultyName) || param.facultyName == ""){
					param.facultyName = "ALL";
				}
				var url = ENDPOINT + "master/faculty/search/"+param.institutionId+"/"+param.facultyName;
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
				var url = ENDPOINT + "master/faculty/initEdit/"+param;
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
				var url = ENDPOINT+"master/faculty/save/"+param.userSession;
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
				var url = ENDPOINT+"master/faculty/delete/"+param.facultyId+"/"+param.userSession;
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
