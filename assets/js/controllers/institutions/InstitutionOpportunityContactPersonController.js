'use strict';

oiaApplication.controller('InstitutionOpportunityContactPersonController',function($rootScope,$state,$stateParams,$scope,$location, $cookies,ngTableParams, localStorageService,$filter,
                                                                                    MasterFacultyService,InstitutionOpportunityService,InstitutionContactPersonService){

    $scope.contactPersonFormBean = {};
    $scope.masterFaculties = {};
    let institutionOpportunityId = "";
    
    
    $scope.resetModal = function(){
      $scope.contactPersonFormBean = {};
    }

    // $scope.doSearchContactPersonByType = function(type){
    //   const contactPersonType = type;
    //   if(institutionOpportunityId !== "" && angular.isDefined(institutionOpportunityId)){
    //     let params = {};
    //     params.contactPersonType = contactPersonType;
    //     params.institutionOpportunityId = institutionOpportunityId;
    //     console.log(params);
    //     InstitutionOpportunityService.doSearchContactPerson(params).then(
    //       function(success){
    //         let result = success;
    //         console.log(result);
    //         if(contactPersonType === 'I'){
    //           $scope.InternalContactPersonTable = new ngTableParams({
    //             page: 1,            // show first page
    //             count: 10,           // count per page
    //           }, {
    //               total:result.length,
    //               getData: function ($defer, params) {
    //                   var orderedData = params.sorting() ? $filter('orderBy')(result, params.orderBy()) : result;
    //                   $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
    //               }
    //           });
    //         }else if(contactPersonType === 'E'){
    //           $scope.ExternalContactPersonTable = new ngTableParams({
    //               page: 1,            // show first page
    //               count: 10,           // count per page
    //           }, {
    //               total:result.length,
    //               getData: function ($defer, params) {
    //                   var orderedData = params.sorting() ? $filter('orderBy')(result, params.orderBy()) : result;
    //                   $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
    //               }
    //           });
    //         }
    //       }
    //     );
    //   }
    // }
                                                                                          
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
              $scope.contactPersonFormBean.institutionOpportunityContactPersonId = $scope.contactPersonFormBean.contactPersonId.toString();
            }
            $scope.contactPersonFormBean.institutionOpportunityId = $scope.contactPersonFormBean.parentId.toString();
            if(angular.isDefined($scope.contactPersonFormBean.facultyId) && null !== $scope.contactPersonFormBean.facultyId){
              $scope.contactPersonFormBean.facultyId = $scope.contactPersonFormBean.facultyId.toString();
            }
            InstitutionOpportunityService.doSaveContactPerson($scope.contactPersonFormBean).then(
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
                  institutionOpportunityId = success.chulaTrInstitutionOpportunity.institutionOpportunityId.toString();
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
            InstitutionOpportunityService.doDeleteOpportunityContactPerson($scope.contactPersonFormBean).then(
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
    //   InstitutionOpportunityService.initEditContactPerson(id).then(
    //     function(success){
    //       console.log(success);
    //       $scope.contactPersonFormBean.contactPersonId = success.institutionOpportunityContactPersonId;
    //       $scope.contactPersonFormBean.contactPersonType = success.contactType;
    //       $scope.contactPersonFormBean.institutionOpportunityId = success.chulaTrInstitutionOpportunity.institutionOpportunityId;
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

    $scope.initContactPersonType = function(type){
      // $scope.contactPersonFormBean.contactPersonType = type;
      // $scope.contactPersonFormBean.institutionOpportunityId = $rootScope.institutionOpportunityId;
      // console.log($scope.contactPersonFormBean);
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
    // $scope.doSearchInternalContactPerson();
    // $scope.doSearchExternalContactPerson();
});
