'use strict';

oiaApplication.controller('LoginController',function($rootScope,$state,$scope,$location, $cookies, localStorageService,AuthenticationService){


	$scope.authenticationError = false;

	$scope.credential = {};

	$scope.reset = function(){
		$scope.credential.username = "";
		$scope.credential.password = "";
	}

	$scope.reset();

	$scope.doLogin = function(){
		var authorizationSession =  true
		console.log("Login success");


		$scope.authenticationError = false;
		// console.log(result);
		localStorageService.set('authorization',apiKey);
		localStorageService.set('userSession',true);
		$state.go("site.main-search");

		// window.location.href="main.html";
		// $location.url('/template.html');

		/* ---- Use this -----
		var authorizationSession = localStorageService.get('authorization');
		if(authorizationSession != null && angular.isDefined(authorizationSession)){
			localStorageService.remove('authorization');
			localStorageService.remove('userSession');
		}
    	// console.log($scope.credential);
    	AuthenticationService.login($scope.credential).then(
			function(result){
				console.log("Login success");
				$scope.authenticationError = false;
				// console.log(result);
				localStorageService.set('authorization',apiKey);
				localStorageService.set('userSession',result);
				$state.go("site.main-search");
			}
		).catch(
			function(err){
				$scope.authenticationError = true;
				localStorageService.remove('authorization');
				localStorageService.remove('userSession');
				AuthenticationService.logout();
				$scope.reset();
		}); 
		*/

	}

	$scope.doLogout = function(){
		localStorageService.remove('authorization');
		localStorageService.remove('userSession');
		$state.go('login');
	}

	$scope.goRegister = function(){
		$state.go("register");
	}
	
	$scope.goLogin = function(){
		$state.go("login");
	}


});
