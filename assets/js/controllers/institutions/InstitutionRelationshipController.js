'use strict';

oiaApplication.controller('InstitutionRelationshipController',function($rootScope,$state,$scope,$location, $cookies, localStorageService,$filter,InstitutionRelationshipService){

  $scope.masterAgreementTypes = {};
  $scope.masterLevelOfCooperation = {};
  $scope.masterFaculties = {};

  $scope.institutionRelationshipDatas = {};

  $scope.initEditInstitutionRelationship = function(id){
    $state.go('site.institution-relationship-add-edit',{institutionRelationshipId:id, action:"E"});
  }

  $scope.doSearchRelationship = function(){
    if(null != localStorageService.get('institutionId')){
      const institutionId = localStorageService.get('institutionId');
      InstitutionRelationshipService.doSearch(institutionId).then(
        function(success){
            $scope.institutionRelationshipDatas = success;
        }
      );
    }
  }

  $scope.doSearchRelationship();

});
