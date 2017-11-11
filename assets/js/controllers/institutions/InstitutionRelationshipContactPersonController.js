'use strict';

oiaApplication.controller('InstitutionRelationshipContactPersonController',function($rootScope,$state,$stateParams,$scope,$location, $cookies,ngTableParams, localStorageService,$filter,
                                                                                    MasterFacultyService,InstitutionRelationshipService,InstitutionContactPersonService){

    $scope.contactPersonFormBean = {};
    $scope.masterFaculties = {};
    let institutionRelationshipId = "";
    
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
              $scope.contactPersonFormBean.institutionRelationshipContactPersonId = $scope.contactPersonFormBean.contactPersonId.toString();
            }
            $scope.contactPersonFormBean.institutionRelationshipId = $scope.contactPersonFormBean.parentId.toString();
            if(angular.isDefined($scope.contactPersonFormBean.facultyId) && null !== $scope.contactPersonFormBean.facultyId){
              $scope.contactPersonFormBean.facultyId = $scope.contactPersonFormBean.facultyId.toString();
            }
            console.log($scope.contactPersonFormBean);
            InstitutionRelationshipService.doSaveContactPerson($scope.contactPersonFormBean).then(
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
                  institutionRelationshipId = success.chulaTrInstitutionRelationship.institutionRelationshipId.toString();
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
            InstitutionRelationshipService.doDeleteRelationshipContactPerson($scope.contactPersonFormBean).then(
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

    // $scope.initEditContactPerson = function(id){
    //   InstitutionRelationshipService.initEditContactPerson(id).then(
    //     function(success){
    //       console.log(success);
    //       $scope.contactPersonFormBean.contactPersonId = success.institutionRelationshipContactPersonId;
    //       $scope.contactPersonFormBean.contactPersonType = success.contactType;
    //       $scope.contactPersonFormBean.institutionRelationshipId = success.chulaTrInstitutionRelationship.institutionRelationshipId;
    //       $scope.contactPersonFormBean.contactPersonFullName = success.fullName;
    //       $scope.contactPersonFormBean.contactPersonEmail = success.email;
    //       $scope.contactPersonFormBean.contactPersonNumber = success.contactPhoneNumber;
    //       if(null !== success.chulaMsFaculty && angular.isDefined(success.chulaMsFaculty.facultyId)){
    //         $scope.contactPersonFormBean.facultyId = success.chulaMsFaculty.facultyId;
    //       }
    //       $scope.contactPersonFormBean.position = success.position;
    //       $scope.contactPersonFormBean.projectName = success.contactProject;
    //       $scope.contactPersonFormBean.contactPersonFunction = success.contactFunction;
    //       $scope.contactPersonFormBean.prospect = success.prospect;
    //       $scope.contactPersonFormBean.research = success.research;
    //       $scope.contactPersonFormBean.alumnus = success.alumnus;
    //       $scope.contactPersonFormBean.tbc = success.tbc;

    //       $('#modal-contact-person').modal('toggle');
    //     }
    //   );
    // }
    
    // $scope.doSearchInternalContactPerson = function(){
    //   $scope.doSearchContactPersonByType("I");
    // }

    // $scope.doSearchExternalContactPerson = function(){
    //   $scope.doSearchContactPersonByType("E");
    // }

    $scope.initContactPersonType = function(){
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
