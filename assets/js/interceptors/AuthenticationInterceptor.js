'use strict';

oiaApplication.factory('AuthenticationInterceptor',function($cookies, $rootScope,localStorageService, $injector){
	var interceptor = {

      request: function(config) {
        // console.log(config);
        var authorize = localStorageService.get('authorization');
        // console.log("Authorize header: "+authorize);
        // console.log(config.url.indexOf("login"));
        if(angular.isDefined(authorize) && authorize != null){
          // console.log("Authorize header: "+authorize);
          config.headers['Authorization'] = authorize;
        }else{
          var path = config.url.split("?");
          if(path[0].indexOf('login') == -1 && path[0].indexOf('logout') != 38){
            var $state = $injector.get('$state');
            $state.go('login');
          }
        }
        return config;
      }
    };
    return interceptor;
});

// gunguanApplication.config(['$httpProvider', function($httpProvider) {
// 	//fancy random token
// 	function generateToken(a){
// 		return a?(a^Math.random()*16>>a/4).toString(16):([1e16]+1e16).replace(/[01]/g,generateToken);
// 	};

// 	$httpProvider.interceptors.push(function() {
// 		return {
// 			'request': function(config) {
// 				var token = generateToken();
// 				console.log("token: "+token);
// 				// put a new random secret into our CSRF-TOKEN Cookie after each response
// 				document.cookie = 'CSRF-TOKEN=' + token;
// 				return config;
// 			}
// 		};
// 	});
// }]);
