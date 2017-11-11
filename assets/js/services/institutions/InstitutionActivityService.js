'use strict';

oiaApplication.factory('InstitutionActivityService',
	function InstitutionActivityService($rootScope, $state, $q, $http,localStorageService) {

		return {
			initEdit: function(param, callback){
				var cb = callback || angular.noop;
        var deferred = $q.defer();
				var url = ENDPOINT+"institution/initEditInstitutionActivity/"+param;
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
			doSave: function(param, callback){
				var cb = callback || angular.noop;
        var deferred = $q.defer();
				console.log(param);
        var userSession = localStorageService.get("userSession");
				var url = ENDPOINT+"institution/doSaveInstitutionActivity/"+userSession.userLoginName;
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
			doSearch: function(param,callback){
				var cb = callback || angular.noop;
        var deferred = $q.defer();
				var url = ENDPOINT+"institution/doSearchInstitutionActivityByInstitutionId/"+param;
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
				var url = ENDPOINT+"institution/doSaveInstitutionActivityContactPerson/"+userSession.userLoginName;
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
				var url = ENDPOINT+"institution/doSearchActivityContactPersonByParam/"+param.contactPersonType+"/"+param.institutionActivityId;
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
				var url = ENDPOINT+"institution/initEditInstitutionActivityContactPerson/"+param;
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
			downloadFile: function(param,callback){
				var cb = callback || angular.noop;
        var deferred = $q.defer();
				var url = ENDPOINT+"institution/institutionActivity/downloadFile/"+param.institutionActivityId;
				$http.get(url,{responseType: 'arraybuffer'}).then(
					function(success){
						var result = success.data;
						deferred.resolve(result);
						var file = new Blob([result], {type: "application/octet-stream"});
		    	  var fileURL = URL.createObjectURL(file);

						var a = document.createElement("a");
		        document.body.appendChild(a);
		        a.style = "display:none";
		        a.href = fileURL;
		        a.download = param.printRptName;
		        a.click();
		        window.URL.revokeObjectURL(fileURL);
		    	  // window.open(fileURL);
						return cb(result);
					},function(error){
						deferred.reject(error);
						return cb(error);
					}
				);
				return deferred.promise;
			},
			doDeleteActivity: function(param, callback){
				var cb = callback || angular.noop;
				var deferred = $q.defer();
				var userSession = localStorageService.get("userSession");
				var url = ENDPOINT+"institution/doDeleteActivity/"+param+"/"+userSession.userLoginName;
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
			},
			doDeleteActivityContactPerson: function(param, callback){
				var cb = callback || angular.noop;
				var deferred = $q.defer();
				var userSession = localStorageService.get("userSession");
				var url = ENDPOINT+"institution/doDeleteActivityContactPerson/"+param.contactPersonId+"/"+userSession.userLoginName;
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
