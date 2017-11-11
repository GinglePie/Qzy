'use strict';

oiaApplication.controller('RegisterController',function($rootScope,$state,$scope,$location, $cookies, localStorageService,AuthenticationService){


	$scope.authenticationError = false;

	$scope.credential = {};

	$scope.reset = function(){
		$scope.credential.fullname = "";
		$scope.credential.shop = "";
		$scope.credential.username = "";
		$scope.credential.password = "";
		$scope.credential.confirmPassword = "";
		$scope.credential.gender = "";
		$scope.credential.birthday = "";
		$scope.credential.phone = "";
		$scope.credential.confirmTermsOfUser = "";
	}

	$scope.reset();

	$scope.doRegister = function(){
		

	}

	$scope.goRegister = function(){
		$state.go("register");
	}
	
	$scope.goLogin = function(){
		$state.go("login");
	}


});
