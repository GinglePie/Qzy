'use strict';

oiaApplication.controller('TopBarController',function($scope,$state,localStorageService){

  //----- For active menu
  var userSession = localStorageService.get("userSession");
  console.log(userSession);
	$scope.userFullName = userSession.fullName;
});
