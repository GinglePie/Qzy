'use strict';

oiaApplication.controller('InstitutionOpportunityController',function($rootScope,$state,$scope,$location, $cookies, localStorageService,$filter,InstitutionOpportunityService){

  $scope.institutionOpportunityDatas = {};

  $scope.doAddInstitutionOpportunity = function(){
    $state.go('site.institution-opportunity-add-edit',{institutionOpportunityId:null, action:"A"});
  }

  $scope.initEditInstitutionOpportunity = function(id){
    $state.go('site.institution-opportunity-add-edit',{institutionOpportunityId:id, action:"E"});
  }

  $scope.doSearchOpportunity = function(){
    if(null != localStorageService.get('institutionId')){
      const institutionId = localStorageService.get('institutionId');
      InstitutionOpportunityService.doSearch(institutionId).then(
        function(success){
          console.log(success);
          $scope.institutionOpportunityDatas = success;
        }
      ); 
    }
  }

  $scope.doSearchOpportunity();

});
