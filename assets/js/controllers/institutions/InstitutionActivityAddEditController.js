'use strict';

oiaApplication.controller('InstitutionActivityAddEditController',function($rootScope,$state,$stateParams,$scope,$location,ngTableParams, $cookies, localStorageService,$filter,
                                                                          MasterFacultyService,MasterLevelOfCooperationService,InstitutionActivityService,
                                                                          MasterActivityTypeService,InstitutionContactPersonService){

  $scope.masterLevelOfCooperations = {};
  $scope.masterFaculties = {};
  $scope.masterActivityTypes = {};

  $scope.institutionActivityFormBean = {};

  let institutionActivityId = $stateParams.institutionActivityId;

  $scope.goToPage = function(page){
    $state.go(page,{},{reload: true});
  }

  $scope.doSaveInstitutionActivity = function(){
    console.log($scope.institutionActivityFormBean);
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
          $scope.institutionActivityFormBean.institutionId = institutionId.toString();
          if(null !== $scope.institutionActivityFormBean.facultyId && angular.isDefined($scope.institutionActivityFormBean.facultyId)){
            $scope.institutionActivityFormBean.facultyId = $scope.institutionActivityFormBean.facultyId.toString();
          }
          InstitutionActivityService.doSave($scope.institutionActivityFormBean).then(
            function(success){
              swal({
									title: "Save success",
									text: "",
									type: "success",
									showCancelButton: false,
									confirmButtonText: "OK",
									closeOnConfirm: true
							},function(isConfirm){
                console.log(success);
                // $rootScope.institutionActivityId = success.institutionActivityId.toString();
                institutionActivityId = success.institutionActivityId.toString();
                $state.go($state.current, {institutionActivityId: institutionActivityId,action: "E"}, {reload: true});
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

  $scope.initEditInstitutionActivity = function(){
    let action = $stateParams.action;
    
    $rootScope.action = action;
    if(action == 'A'){
      $scope.institutionActivityFormBean = {};
    }else if(action == 'E'){
      $rootScope.institutionActivityId = institutionActivityId.toString();
      InstitutionActivityService.initEdit(institutionActivityId).then(
        function(success){
          console.log(success);
          $scope.institutionActivityFormBean.institutionActivityId = success.institutionActivityId.toString();
          $scope.institutionActivityFormBean.topic = success.topic;
          $scope.institutionActivityFormBean.activity = success.activity;
          $scope.institutionActivityFormBean.startDate = success.activityStartDateFormatted;
          $scope.institutionActivityFormBean.endDate = success.activityEndDateFormatted;
          $scope.institutionActivityFormBean.levelOfCooperation = success.activityLevel;
          if(null !== success.chulaMsFaculty && angular.isDefined(success.chulaMsFaculty.facultyId)){
            $scope.institutionActivityFormBean.facultyId = success.chulaMsFaculty.facultyId;
          }
          $scope.institutionActivityFormBean.activityType = success.activityType;
          $scope.activityFileName = success.activityFileName;
          $scope.activityFilePath = success.activityFile; 
        }
      );
    }
  }

  $scope.doSearchContactPersonByType = function(type){
    const contactPersonType = type;
    if(institutionActivityId !== "" && angular.isDefined(institutionActivityId) && null !== institutionActivityId){
      let params = {};
      params.contactPersonType = contactPersonType;
      params.institutionActivityId = institutionActivityId;
      console.log(params);
      InstitutionActivityService.doSearchContactPerson(params).then(
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

  $scope.downloadFile = function(fileName,institutionActivityId){
    let param = {};
    param.institutionActivityId = institutionActivityId;
    param.printRptName = fileName;
    console.log(param);
    InstitutionActivityService.downloadFile(param);
  }

  $scope.initAddContactPerson = function(type){
    console.log(type);
    let contactPersonFormBean = {};
    contactPersonFormBean.contactPersonType = type;
    contactPersonFormBean.parentId = institutionActivityId;
    InstitutionContactPersonService.addBean(contactPersonFormBean);
    $('#modal-contact-person').modal('toggle');
  }

  $scope.initEditContactPerson = function(id){
    InstitutionActivityService.initEditContactPerson(id).then(
      function(success){
        console.log(success);
        let contactPersonFormBean = {};
        contactPersonFormBean.contactPersonId = success.institutionActivityContactPersonId;
        contactPersonFormBean.contactPersonType = success.contactType;
        contactPersonFormBean.parentId = success.chulaTrInstitutionActivity.institutionActivityId;
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

  $scope.doDeleteActivity = function(){
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
        if(angular.isDefined($scope.institutionActivityFormBean.institutionActivityId)){
          InstitutionActivityService.doDeleteActivity(institutionActivityId.toString()).then(
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

  }

  $scope.initPage();
  $scope.initEditInstitutionActivity();
  $scope.doSearchInternalContactPerson();
  $scope.doSearchExternalContactPerson();

});
