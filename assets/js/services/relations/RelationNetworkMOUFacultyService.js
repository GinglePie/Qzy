'use strict';

oiaApplication.factory('RelationNetworkMOUFacultyService',
	function RelationNetworkMOUFacultyService($rootScope, $state, $q, $http,localStorageService) {
		return {
			doSearch: function(param, callback){
				var cb = callback || angular.noop;
        var deferred = $q.defer();
				var url = ENDPOINT + "networkMou/doSearchNetworkMouFaculty/"+param;
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
			doSave: function(parameter,callback){
				var cb = callback || angular.noop;
        var deferred = $q.defer();
        // console.log(param);
				var userSession = localStorageService.get("userSession");
				var param = {};
				param.networkMouId = parameter.networkMouId;
				var networkMouInstitutions = [];
				angular.forEach(parameter.networkMouInstitutions, function(ins){
					console.log(ins.networkMouFaculties);
					var networkMouFaculties = [];
					angular.forEach(ins.networkMouFaculties, function(fac){
						networkMouFaculties.push({
							facultyName : fac.facultyName,
							quota : fac.quota
						});
					});
					networkMouInstitutions.push({
						institutionId : ins.institutionId,
						networkMouFaculties : networkMouFaculties
					});
				});
				var networkMouChula = [];
				angular.forEach(parameter.networkMouChula,function(chula){
					var networkMouFaculties = [];
					angular.forEach(chula, function(fac){
						networkMouFaculties.push({
							facultyId : fac.facultyId,
							quota : fac.quota
						});
					});
					networkMouChula.push({
						networkMouFaculties : networkMouFaculties
					});
				});

				param.networkMouChula = networkMouChula;
				param.networkMouInstitutions = networkMouInstitutions;
				console.log(param);
        var url = ENDPOINT + "networkMou/doSaveFaculty/"+userSession.userLoginName;
        $http.post(url,param).then(
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
			}
		}
	}
);
