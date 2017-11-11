'use strict';

oiaApplication.factory('HttpInterceptor',function($cookies, $log){
	var XSRFInterceptor = {

      request: function(config) {

        var token = $cookies.get('XSRF-TOKEN');
        // console.log("XSRF-TOKEN: " + token);
        if (token) {
          config.headers['X-CSRF-TOKEN'] = token;

        }

        return config;
      }
    };
    return XSRFInterceptor;
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
