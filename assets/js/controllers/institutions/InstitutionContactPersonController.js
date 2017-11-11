'use strict';

oiaApplication.controller('InstitutionContactPersonController',function($rootScope,$state,$stateParams,$scope,$location, $cookies,ngTableParams, localStorageService,$filter,
                                                                                    MasterFacultyService,InstitutionService,InstitutionContactPersonService){

    $scope.contactPersonFormBean = {};
    $scope.masterFaculties = {};
    let action = $stateParams.action;
    let institutionId = $stateParams.institutionId;
    
    $scope.resetModal = function(){
      $scope.contactPersonFormBean = {};
    }

                                                                                          
    $scope.doSaveContactPerson = function(){
      console.log($scope.contactPersonFormBean);
      swal({
          title: "Confirm?",
          text: "",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#641E20",
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          closeOnConfirm: false
      }, function(isConfirm){
          if(isConfirm){
            if(angular.isDefined($scope.contactPersonFormBean.contactPersonId) && null !== $scope.contactPersonFormBean.contactPersonId){
              $scope.contactPersonFormBean.institutionContactPersonId = $scope.contactPersonFormBean.contactPersonId.toString();
            }
            $scope.contactPersonFormBean.institutionId = $scope.contactPersonFormBean.parentId.toString();
            if(angular.isDefined($scope.contactPersonFormBean.facultyId) && null !== $scope.contactPersonFormBean.facultyId){
              $scope.contactPersonFormBean.facultyId = $scope.contactPersonFormBean.facultyId.toString();
            }
            InstitutionService.doSaveContactPerson($scope.contactPersonFormBean).then(
              function(success){
                console.log(success);
                swal({
									title: "Save success",
									text: "",
									type: "success",
									showCancelButton: false,
									confirmButtonText: "OK",
									closeOnConfirm: true
                },function(isConfirm){
                  $('#modal-contact-person').modal('toggle');
                  $scope.contactPersonFormBean.contactPersonType = success.contactType;
                  institutionId = success.chulaTrInstitution.institutionId.toString();
                  // $scope.doSearchContactPersonByType($scope.contactPersonFormBean.contactPersonType);
                  $state.reload();
                });
              }
            );
          }
      });
    }

    $scope.doDeleteContactPerson = function(){
      swal({
        title: "Confirm?",
        text: "",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#641E20",
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        closeOnConfirm: false
    }, function(isConfirm){
        if(isConfirm){
          if(angular.isDefined($scope.contactPersonFormBean.contactPersonId) && null !== $scope.contactPersonFormBean.contactPersonId){
            $scope.contactPersonFormBean.institutionRelationshipContactPersonId = $scope.contactPersonFormBean.contactPersonId.toString();
            InstitutionService.doDeleteContactPerson($scope.contactPersonFormBean).then(
              function(success){
                console.log(success);
                swal({
                  title: "Save success",
                  text: "",
                  type: "success",
                  showCancelButton: false,
                  confirmButtonText: "OK",
                  closeOnConfirm: true
                },function(isConfirm){
                  $('#modal-contact-person').modal('toggle');
                  $state.reload();
                });
              }
            );
          }else{
            swal({
              title: "Found error",
              text: "Not found contact person",
              type: "error",
              showCancelButton: false,
              confirmButtonText: "OK",
              closeOnConfirm: true
          });
          }
        }
      });
    }


    $scope.initContactPersonType = function(type){
      $scope.contactPersonFormBean = InstitutionContactPersonService.getBean();
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
    $scope.initContactPersonType();
});
