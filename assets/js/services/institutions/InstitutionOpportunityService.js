'use strict';

oiaApplication.factory('InstitutionOpportunityService',
	function InstitutionOpportunityService($rootScope, $state, $q, $http,localStorageService) {

		return {
			initEditInstitutionOpportunity: function(param, callback){
				var cb = callback || angular.noop;
        var deferred = $q.defer();
				console.log(param);
				var url = ENDPOINT+"institution/initEditInstitutionOpportunity/"+param;
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
			initEditInstitutionOpportunityActivity: function(param,callback){
				var cb = callback || angular.noop;
        var deferred = $q.defer();
				console.log(param);
				var url = ENDPOINT+"institution/initEditInstitutionOpportunityActivity/"+param;
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
				var url = ENDPOINT+"institution/doSaveInstitutionOpportunity/"+userSession.userLoginName;
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
			doSaveOpportunityActivity: function(param, callback){
				var cb = callback || angular.noop;
        var deferred = $q.defer();
				console.log(param);
        var userSession = localStorageService.get("userSession");
				var url = ENDPOINT+"institution/doSaveInstitutionOpportunityActivity/"+userSession.userLoginName;
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
				var url = ENDPOINT+"institution/doSearchInstitutionOpportunityByInstitutionId/"+param;
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
			doSearchOpportunityActivity: function(param,callback){
				var cb = callback || angular.noop;
        var deferred = $q.defer();
				var url = ENDPOINT+"institution/doSearchInstitutionOpportunityActivity/"+param;
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
				var url = ENDPOINT+"institution/institutionOpportunityActivity/downloadFile/"+param.institutionOpportunityActivityId;
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
				var url = ENDPOINT+"institution/doSaveInstitutionOpportunityContactPerson/"+userSession.userLoginName;
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
				var url = ENDPOINT+"institution/doSearchOpportunityContactPersonByParam/"+param.contactPersonType+"/"+param.institutionOpportunityId;
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
				var url = ENDPOINT+"institution/initEditInstitutionOpportunityContactPerson/"+param;
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
			doDeleteOpportunity: function(param, callback){
				var cb = callback || angular.noop;
				var deferred = $q.defer();
				var userSession = localStorageService.get("userSession");
				var url = ENDPOINT+"institution/doDeleteOpportunity/"+param+"/"+userSession.userLoginName;
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
			doDeleteOpportunityContactPerson: function(param, callback){
				var cb = callback || angular.noop;
				var deferred = $q.defer();
				var userSession = localStorageService.get("userSession");
				var url = ENDPOINT+"institution/doDeleteOpportunityContactPerson/"+param.contactPersonId+"/"+userSession.userLoginName;
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
			doDeleteInstitutionOpportunityActivity: function(param, callback){
				var cb = callback || angular.noop;
				var deferred = $q.defer();
				var userSession = localStorageService.get("userSession");
				var url = ENDPOINT+"institution/doDeleteInstitutionOpportunicyActivity/"+param+"/"+userSession.userLoginName;
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
