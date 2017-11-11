'use strict';

oiaApplication.controller('InstitutionOpportunityAddEditController',function($rootScope,$state,$stateParams,$scope,$location, $cookies,ngTableParams, localStorageService,$filter,
                                                                             MasterFacultyService,MasterLevelOfCooperationService,InstitutionOpportunityService,MasterPriorityTypeService,
                                                                             MasterActivityTypeService,InstitutionContactPersonService){

  
  $scope.masterLevelOfCooperations = {};
  $scope.masterFaculties = {};
  $scope.masterActivityTypes = {};
  $scope.masterPriorityTypes = {};

  $scope.opportunityFormBean = {};

  $scope.opportunityActivityFormBean = {};

  let institutionOpportunityId = $stateParams.institutionOpportunityId;

  $scope.goToPage = function(page){
    $state.go(page,{},{reload: true});
  }

  $scope.resetModal = function(){
    $scope.opportunityActivityFormBean.asDate = "";
    $scope.opportunityActivityFormBean.action = "";
    let institutionOpportunityId = $stateParams.institutionOpportunityId;
    if(null != institutionOpportunityId && angular.isDefined(institutionOpportunityId)){
      $scope.opportunityActivityFormBean.institutionOpportunityId = institutionOpportunityId.toString();
    }
  };

  $scope.doSaveOpportunity = function(){
    console.log($scope.opportunityFormBean);
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
          const institutionId = localStorageService.get('institutionId');
          if(null != institutionId && angular.isDefined(institutionId)){
            $scope.opportunityFormBean.institutionId = institutionId.toString();
          }
          
          if(angular.isDefined($scope.opportunityFormBean.institutionOpportunityId)){
            $scope.opportunityFormBean.institutionOpportunityId = $scope.opportunityFormBean.institutionOpportunityId.toString();
          }
          if(angular.isDefined($scope.opportunityFormBean.facultyId) && null !== $scope.opportunityFormBean.facultyId){
            $scope.opportunityFormBean.facultyId = $scope.opportunityFormBean.facultyId.toString();
          }
          InstitutionOpportunityService.doSave($scope.opportunityFormBean).then(
            function(success){
              swal({
									title: "Save success",
									text: "",
									type: "success",
									showCancelButton: false,
									confirmButtonText: "OK",
									closeOnConfirm: true
							},function(isConfirm){
                const institutionOpportunityId = success.institutionOpportunityId.toString();
                $scope.opportunityFormBean.institutionOpportunityId = institutionOpportunityId;
                $scope.opportunityActivityFormBean.institutionOpportunityId = institutionOpportunityId;
                // $rootScope.institutionOpportunityId = institutionOpportunityId;
                $state.go($state.current, {institutionOpportunityId: institutionOpportunityId,action: "E"}, {reload: true});
              });
            }
          ).catch(
            function(error){
              console.log(error);
							swal({
									title: "Found error",
									text: "",
									type: "error",
									showCancelButton: false,
									confirmButtonText: "OK",
									closeOnConfirm: true
							});
            }
          );
        }
    });
  }

  $scope.doSearchOpportunityActivity = function(institutionOpportunityId){
    // const institutionOpportunityId = $scope.opportunityFormBean.institutionOpportunityId;
    if(null != institutionOpportunityId && angular.isDefined(institutionOpportunityId)){
      InstitutionOpportunityService.doSearchOpportunityActivity(institutionOpportunityId).then(
        function(success){
          var result = success;
          console.log(result);
          $scope.OpportunityActivityTable = new ngTableParams({
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
      );
    }
  }

  $scope.doSaveOpportunityActivity = function(){
    console.log($scope.opportunityActivityFormBean);
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
          console.log($scope.opportunityActivityFormBean);
          InstitutionOpportunityService.doSaveOpportunityActivity($scope.opportunityActivityFormBean).then(
            function(success){
              swal({
									title: "Save success",
									text: "",
									type: "success",
									showCancelButton: false,
									confirmButtonText: "OK",
									closeOnConfirm: true
							},function(isConfirm){
                $("#modal-activity").modal('toggle');
                $scope.doSearchOpportunityActivity(success.chulaTrInstitutionOpportunity.institutionOpportunityId);
              });
            }
          ).catch(
            function(error){
              console.log(error);
							swal({
									title: "Found error",
									text: "",
									type: "error",
									showCancelButton: false,
									confirmButtonText: "OK",
									closeOnConfirm: true
							});
            }
          );
        }
    });
  }

  $scope.doDeleteInstitutionOpportunityActivity = function(id){
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
        console.log(id);
        InstitutionOpportunityService.doDeleteInstitutionOpportunityActivity(id).then(
          function(success){
            swal({
                title: "Save success",
                text: "",
                type: "success",
                showCancelButton: false,
                confirmButtonText: "OK",
                closeOnConfirm: true
            },function(isConfirm){
              $scope.doSearchOpportunityActivity(institutionOpportunityId);
            });
          }
        ).catch(
          function(error){
            console.log(error);
            swal({
                title: "Found error",
                text: "",
                type: "error",
                showCancelButton: false,
                confirmButtonText: "OK",
                closeOnConfirm: true
            });
          }
        );
      }
    });
  }

  $scope.initEditInstitutionOpportunity = function(){
    let action = $stateParams.action;
    // let institutionOpportunityId = $stateParams.institutionOpportunityId;
    $rootScope.action = action;
    if(action == 'A'){
      $scope.opportunityFormBean = {};
    }else if(action == 'E'){
      $rootScope.institutionOpportunityId = institutionOpportunityId.toString();
      InstitutionOpportunityService.initEditInstitutionOpportunity(institutionOpportunityId).then(
        function(success){
          console.log(success);
          $scope.opportunityFormBean.institutionOpportunityId = success.institutionOpportunityId;
          $scope.opportunityFormBean.opportunityName = success.opportunityName;
          $scope.opportunityFormBean.activity = success.activity;
          $scope.opportunityFormBean.levelOfCooperation = success.opportunityLevel;
          $scope.opportunityFormBean.facultyId = success.chulaMsFaculty.facultyId;
          $scope.opportunityFormBean.activityType = success.opportunityType;
          $scope.opportunityFormBean.priority = success.opportunityPriority;
        }
      );
    }

    $scope.doSearchOpportunityActivity(institutionOpportunityId);
  }

  $scope.initEditInstitutionOpportunityActivity = function(id){
    InstitutionOpportunityService.initEditInstitutionOpportunityActivity(id).then(
      function(success){
        console.log(success);
        $scope.opportunityActivityFormBean.institutionOpportunityActivityId = success.institutionOpportunityActivityId.toString();
        $scope.opportunityActivityFormBean.institutionOpportunityId = success.chulaTrInstitutionOpportunity.institutionOpportunityId.toString();
        $scope.opportunityActivityFormBean.asDate = success.opportunityActivityDateFormatted;
        $scope.opportunityActivityFormBean.action = success.opportunityActivityAction;
        $scope.opportunityActivityFile = success.opportunityActivityFileName;
        $scope.opportunityActivityFilePath = success.opportunityActivityFile;

        $('#modal-activity').modal('toggle');
        
      }
    );
  }

  $scope.downloadFile = function(fileName,institutionOpportunityActivityId){
    let param = {};
    param.institutionOpportunityActivityId = institutionOpportunityActivityId;
    param.printRptName = fileName;
    console.log(param);
    InstitutionOpportunityService.downloadFile(param);
  }

  $scope.doSearchContactPersonByType = function(type){
    const contactPersonType = type;
    if(institutionOpportunityId !== "" && angular.isDefined(institutionOpportunityId) && null !== institutionOpportunityId){
      let params = {};
      params.contactPersonType = contactPersonType;
      params.institutionOpportunityId = institutionOpportunityId;
      console.log(params);
      InstitutionOpportunityService.doSearchContactPerson(params).then(
        function(success){
          let result = success;
          console.log(contactPersonType);
          if(contactPersonType === 'I'){
            console.log("Internal");
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
            console.log("External");
            // console.log(result);
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
    contactPersonFormBean.parentId = institutionOpportunityId;
    InstitutionContactPersonService.addBean(contactPersonFormBean);
    $('#modal-contact-person').modal('toggle');
  }

  $scope.initEditContactPerson = function(id){
    InstitutionOpportunityService.initEditContactPerson(id).then(
      function(success){
        console.log(success);
        let contactPersonFormBean = {};
        contactPersonFormBean.contactPersonId = success.institutionOpportunityContactPersonId;
        contactPersonFormBean.contactPersonType = success.contactType;
        contactPersonFormBean.parentId = success.chulaTrInstitutionOpportunity.institutionOpportunityId;
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

  $scope.doDeleteOpportunity = function(){
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
        if(angular.isDefined($scope.opportunityFormBean.institutionOpportunityId)){
          InstitutionOpportunityService.doDeleteOpportunity($scope.opportunityFormBean.institutionOpportunityId.toString()).then(
            function(success){
              swal({
                  title: "Save success",
                  text: "",
                  type: "success",
                  showCancelButton: false,
                  confirmButtonText: "OK",
                  closeOnConfirm: true
              },function(isConfirm){
                $scope.goToPage('site.institution.institution-management');
              });
            }
          ).catch(
            function(error){
              console.log(error);
              swal({
                  title: "Found error",
                  text: "",
                  type: "error",
                  showCancelButton: false,
                  confirmButtonText: "OK",
                  closeOnConfirm: true
              });
            }
          );
        }
      }
    });
  }


  $scope.initPage = function(){
    //--- prepare AgreementType
    let param = {};
    param.facultyName = "ALL";
    MasterFacultyService.doSearchChulaFaculty(param).then(
      function(success){
        $scope.masterFaculties = success;
      }
    );
    
    param = {};
    MasterLevelOfCooperationService.getLevelOfCooperation().then(
      function(success){
        $scope.masterLevelOfCooperations = success;
      }
    );

    param = {};
    MasterActivityTypeService.getActivityType().then(
      function(success){
        $scope.masterActivityTypes = success;
      }
    );

    param = {};
    MasterPriorityTypeService.getPriorityType().then(
      function(success){
        $scope.masterPriorityTypes = success;
      }
    );

  }

  $scope.initPage();
  $scope.initEditInstitutionOpportunity();
  $scope.doSearchInternalContactPerson();
  $scope.doSearchExternalContactPerson();

});
