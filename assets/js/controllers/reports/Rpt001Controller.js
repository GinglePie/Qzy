'use strict';

oiaApplication.controller('Rpt001Controller',function($rootScope,$state,$scope,$location, $cookies, localStorageService, RptService){

  $scope.form = {};

  $scope.doSearch = function(){
    var param = {};
    param.asOfDate = searchAsOfDate;
    RptService.doPostSearch('rpt001',param).then(
      function(success){
        console.log(success);
        $scope.asOfDate = success.asOfDdateFormatted;
        $scope.form = success;
      }
    );
  }

});
