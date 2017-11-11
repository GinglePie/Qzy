'use strict';

oiaApplication.factory('AuthenticationService',
	function LoginService($rootScope, $state, $q, $http) {

		// $http.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';

		// $http.defaults.xsrfHeaderName = 'X-CSRF-TOKEN';
		// $http.defaults.xsrfCookieName = 'CSRF-TOKEN';

		return {
			login: function(credential, callback){
				var cb = callback || angular.noop;
        var deferred = $q.defer();

				var username = credential.username;
        var password = credential.password;
        var param = {
        	username: username,
        	password: password
        };

				var header = {"authorization":apiKey};
				var url = ENDPOINT+"doLogin";
				// console.log(header);
    		$http.post(url,param,{headers:header})
    		 	 	 .then(function(successResponse){
							 	var result = successResponse.data;
	              // console.log(result);
								deferred.resolve(result);
	              return cb(result);
	        	},function(errorResponse){
								// console.log(errorResponse);
		        		var error = errorResponse.data;
								//  console.log(error);
								deferred.reject(error);
	             	return cb(error);
	         	});

		    return deferred.promise;
			},
			logout: function(callback){
				var cb = callback || angular.noop;
				var deferred = $q.defer();
				// Reset state memory
        $rootScope.previousStateName = undefined;
        $rootScope.previousStateNameParams = undefined;
        return deferred.promise;
			}
		};
	}
);
