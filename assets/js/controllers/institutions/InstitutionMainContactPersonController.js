'use strict';

oiaApplication.controller('InstitutionMainContactPersonController',function($rootScope,$state,$stateParams,$scope,$location, $cookies,ngTableParams, localStorageService,$filter,
                                                                                    MasterFacultyService,InstitutionService,InstitutionContactPersonService){

    $scope.contactPersonFormBean = {};
    $scope.masterFaculties = {};
    let action = $stateParams.action;
    let institutionId = $stateParams.institutionId;
    console.log($scope.pageCode);
    // console.log("institutionId: "+institutionId+" action: "+action);
    if(institutionId !== null && institutionId !== '' && angular.isDefined(institutionId)){
      localStorageService.set('institutionId',institutionId);
    }else{
      let localInstitutionId = localStorageService.get('institutionId');
      if(localInstitutionId !== null && localInstitutionId !== '' && angular.isDefined(localInstitutionId)){
        institutionId = localInstitutionId;

      }
    }
    
    $scope.resetModal = function(){
      $scope.contactPersonFormBean = {};
    }

    $scope.doSearchContactPersonByType = function(type){
      const contactPersonType = type;
      if(institutionId !== "" && angular.isDefined(institutionId) && null !== institutionId){
        let params = {};
        params.contactPersonType = contactPersonType;
        params.institutionId = institutionId;
        console.log(params);
        InstitutionService.doSearchContactPerson(params).then(
          function(success){
            let result = success;
            console.log(result);
            if(contactPersonType === 'I'){
              $scope.InternalContactPersonTable = new ngTableParams({
                page: 1,            // show first page
                count: 10,           // count per page
              }, {
                  total:result.length,
                  getData: function ($defer, params) {
                      var orderedData = params.sorting() ? $filter('orderBy')(result, params.orderBy()) : result;
                      $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                  }
              });
            }else if(contactPersonType === 'E'){
              $scope.ExternalContactPersonTable = new ngTableParams({
                  page: 1,            // show first page
                  count: 10,           // count per page
              }, {
                  total:result.length,
                  getData: function ($defer, params) {
                      var orderedData = params.sorting() ? $filter('orderBy')(result, params.orderBy()) : result;
                      $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                  }
              });
            }
          }
        );
      }
    }
     

    $scope.initAddContactPerson = function(type){
      console.log(type);
      let contactPersonFormBean = {};
      contactPersonFormBean.contactPersonType = type;
      contactPersonFormBean.parentId = institutionId;
      InstitutionContactPersonService.addBean(contactPersonFormBean);
      $('#modal-contact-person').modal('toggle');
    }
  
    $scope.initEditContactPerson = function(id){
      InstitutionService.initEditContactPerson(id).then(
        function(success){
          console.log(success);
          let contactPersonFormBean = {};
          contactPersonFormBean.contactPersonId = success.institutionContactPersonId;
          contactPersonFormBean.contactPersonType = success.contactType;
          contactPersonFormBean.parentId = success.chulaTrInstitution.institutionId;
          contactPersonFormBean.contactPersonFullName = success.fullName;
          contactPersonFormBean.contactPersonEmail = success.email;
          contactPersonFormBean.contactPersonNumber = success.contactPhoneNumber;
          if(null !== success.chulaMsFaculty && angular.isDefined(success.chulaMsFaculty.facultyId)){
            contactPersonFormBean.facultyId = success.chulaMsFaculty.facultyId;
          }
          contactPersonFormBean.position = success.position;
          contactPersonFormBean.projectName = success.contactProject;
          contactPersonFormBean.contactPersonFunction = success.contactFunction;
          contactPersonFormBean.prospect = success.prospect;
          contactPersonFormBean.research = success.research;
          contactPersonFormBean.alumnus = success.alumnus;
          contactPersonFormBean.tbc = success.tbc;
          InstitutionContactPersonService.addBean(contactPersonFormBean);
          $('#modal-contact-person').modal('toggle');
        }
      );
    }
    
    $scope.doSearchInternalContactPerson = function(){
      $scope.doSearchContactPersonByType("I");
    }

    $scope.doSearchExternalContactPerson = function(){
      $scope.doSearchContactPersonByType("E");
    }

    $scope.initContactPersonType = function(type){
      $scope.contactPersonFormBean.contactPersonType = type;
      $scope.contactPersonFormBean.parentId = institutionId;
      console.log($scope.contactPersonFormBean);
    }

    $scope.initPage = function(){
      let param = {};
      param.facultyName = "ALL";
      MasterFacultyService.doSearchChulaFaculty(param).then(
        function(success){
          $scope.masterFaculties = success;
        }
      );
    }                                                                                      

    $scope.initPage();
    $scope.doSearchInternalContactPerson();
    $scope.doSearchExternalContactPerson();
});
