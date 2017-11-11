'use strict';

oiaApplication.factory('InstitutionRelationshipService',
	function InstitutionRelationshipService($rootScope, $state, $q, $http,localStorageService) {

		return {
			doSave: function(param, callback){
				var cb = callback || angular.noop;
        var deferred = $q.defer();
				console.log(param);
        var userSession = localStorageService.get("userSession");
				var url = ENDPOINT+"institution/doSaveInstitutionRelationship/"+userSession.userLoginName;
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
				var url = ENDPOINT+"institution/doSearchInstitutionRelationship/"+param;
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
			initEdit: function(param,callback){
				var cb = callback || angular.noop;
        var deferred = $q.defer();
				var url = ENDPOINT+"institution/initEdit/"+param;
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
				var url = ENDPOINT+"institution/institutionRelationship/downloadFile/"+param.institutionRelationshipId;
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
			doSaveContactPerson: function(param, callback){
				var cb = callback || angular.noop;
        var deferred = $q.defer();
				console.log(param);
        var userSession = localStorageService.get("userSession");
				var url = ENDPOINT+"institution/doSaveInstitutionRelationshipContactPerson/"+userSession.userLoginName;
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
				var url = ENDPOINT+"institution/doSearchRelationshipContactPersonByParam/"+param.contactPersonType+"/"+param.institutionRelationshipId;
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
				var url = ENDPOINT+"institution/initEditInstitutionRelationshipContactPerson/"+param;
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
			doDeleteRelationship: function(param, callback){
				var cb = callback || angular.noop;
				var deferred = $q.defer();
				var userSession = localStorageService.get("userSession");
				var url = ENDPOINT+"institution/doDeleteRelationship/"+param+"/"+userSession.userLoginName;
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
			doDeleteRelationshipContactPerson: function(param, callback){
				var cb = callback || angular.noop;
				var deferred = $q.defer();
				var userSession = localStorageService.get("userSession");
				var url = ENDPOINT+"institution/doDeleteRelationshipContactPerson/"+param.contactPersonId+"/"+userSession.userLoginName;
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
