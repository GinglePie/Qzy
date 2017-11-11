'use strict';

oiaApplication.factory('RptService',
	function Rpt001Service($rootScope, $state, $q, $http) {

		return {
			doPostSearch: function(rptName, param, callback){
				var cb = callback || angular.noop;
        var deferred = $q.defer();
				var url = ENDPOINT + "report/"+rptName;
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
      },
			doGetSearch: function(rptName, param, callback){
				var cb = callback || angular.noop;
        var deferred = $q.defer();
				var url = ENDPOINT + "report/"+rptName+"/"+param;
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
			doPrintReport:function(callRptName,printRptName,applicationType, param, callback){
				var cb = callback || angular.noop;
        var deferred = $q.defer();
				var url = ENDPOINT + "report/"+callRptName+"/print";
				$http.post(url,param,{responseType: 'arraybuffer'}).then(
					function(success){
						var result = success.data;
						deferred.resolve(result);
						var file = new Blob([result], {type: applicationType});
		    	  var fileURL = URL.createObjectURL(file);

						var a = document.createElement("a");
		        document.body.appendChild(a);
		        a.style = "display:none";
		        a.href = fileURL;
		        a.download = printRptName;
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
			}
		};
	}
);
