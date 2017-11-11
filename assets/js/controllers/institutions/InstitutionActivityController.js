'use strict';

oiaApplication.controller('InstitutionActivityController',function($rootScope,$state,$scope,$location, $cookies, localStorageService,$filter,
                                                                          InstitutionActivityService){

      $scope.institutionActivityDatas = {};
      
      $scope.doAddInstitutionActivity = function(){
        $state.go('site.institution-activity-add-edit',{institutionActivityId:null, action:"A"});
      }
    
      $scope.initEditInstitutionActivity = function(id){
        $state.go('site.institution-activity-add-edit',{institutionActivityId:id, action:"E"});
      }

      $scope.doSearchInstitutionActivity = function(){
        if(null != localStorageService.get('institutionId')){
          const institutionId = localStorageService.get('institutionId');
          InstitutionActivityService.doSearch(institutionId).then(
            function(success){
              console.log(success);
              $scope.institutionActivityDatas = success;
            }
          );
        }    
      }
    
      $scope.doSearchInstitutionActivity();
                                                                          
});
