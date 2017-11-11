'use strict';

oiaApplication.controller('InstitutionRelationshipAddEditController',function($rootScope,$state,$stateParams,$scope,$location, $cookies,ngTableParams, localStorageService,$filter,
                                                                              MasterAgreementTypeService, MasterFacultyService,MasterLevelOfCooperationService,
                                                                              InstitutionRelationshipService,InstitutionContactPersonService){

  $scope.masterAgreementTypes = {};
  $scope.masterLevelOfCooperations = {};
  $scope.masterFaculties = {};

  $scope.relationshipFormBean = {};

  $scope.relationshipInternalContactPersonDatas = {};
  $scope.relationshipExternalContactPersonDatas = {};

  $scope.checkedBox = [];


  let institutionRelationshipId = $stateParams.institutionRelationshipId;

  $scope.goToPage = function(page){
    $state.go(page,{},{reload: true});
  }
  

  $scope.backPage = function(){
    const institutionId = localStorageService.get('institutionId');
    if(institutionId !== null || institutionId !== "" || angular.isDefined(institutionId)){
      $state.go('site.institution.institution-management',{institutionId:institutionId, action:"E"});
    }else{
      $state.go('site.institution.institution-management',{institutionId:null, action:"A"});
    }
    
  }

  $scope.doSaveRelationship = function(){
    console.log($scope.institutionBean);
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
          $scope.relationshipFormBean.institutionId = institutionId.toString();
          if($scope.relationshipFormBean.levelOfCooperation === "FAC"){
            if(angular.isUndefined($scope.relationshipFormBean.facultyId) || null === $scope.relationshipFormBean.facultyId || $scope.relationshipFormBean.facultyId === ""){
              swal({
                title: "Found error",
                text: "Please select Faculty",
                type: "error",
                showCancelButton: false,
                confirmButtonText: "OK",
                closeOnConfirm: true
              });
              return false;
            }
          }else{
            if(angular.isDefined($scope.relationshipFormBean.facultyId) && null !== $scope.relationshipFormBean.facultyId){
              $scope.relationshipFormBean.facultyId = $scope.relationshipFormBean.facultyId.toString();
            }
          }
          
          $scope.relationshipFormBean.agreementTypeId = $scope.relationshipFormBean.agreementTypeId.toString();
          if(angular.isDefined($scope.relationshipFormBean.quotaIn)){
            $scope.relationshipFormBean.quotaIn = $scope.relationshipFormBean.quotaIn.toString();
          }
          if(angular.isDefined($scope.relationshipFormBean.quotaOut)){
            $scope.relationshipFormBean.quotaOut = $scope.relationshipFormBean.quotaOut.toString();
          }
          let agreementTypeBeans = [];
          angular.forEach($scope.masterAgreementTypes, function(agreementType){
        		if(agreementType.selected){
        			agreementTypeBeans.push({
        				agreementTypeId : agreementType.agreementTypeId
        			});
        		}
          });
          $scope.relationshipFormBean.agreementTypeBeans = agreementTypeBeans;
          InstitutionRelationshipService.doSave($scope.relationshipFormBean).then(
            function(success){
              swal({
									title: "Save success",
									text: "",
									type: "success",
									showCancelButton: false,
									confirmButtonText: "OK",
									closeOnConfirm: true
							},function(isConfirm){
                institutionRelationshipId = success.institutionRelationshipId.toString();
                $state.go($state.current, {institutionRelationshipId: institutionRelationshipId,action: "E"}, {reload: true});
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

  $scope.initialCheckBox = function(id){
      var result = false;
      angular.forEach($scope.checkedBox,function(checked){
          if(checked === id){
              result = true;
              return;
          }
      });
      return result;
  }

  $scope.initEditInstitutionRelationship = function(){
    let action = $stateParams.action;
    console.log("action: "+action);
    // let institutionRelationshipId = $stateParams.institutionRelationshipId;
    $rootScope.action = action;
    if(action == 'A'){
      $scope.institutionBean = {};
      $rootScope.institutionRelationId = "";
    }else if(action == 'E'){
      $rootScope.institutionRelationshipId = institutionRelationshipId.toString();
      InstitutionRelationshipService.initEdit(institutionRelationshipId).then(
        function(success){
          console.log(success);
          $scope.relationshipFormBean.institutionRelationshipId = success.institutionRelationshipId.toString();
          $scope.relationshipFormBean.shortName = success.shortName;
          $scope.relationshipFormBean.longName = success.longName;
          $scope.relationshipFormBean.agreementTypeId = null!==success.primaryAgreementType?success.primaryAgreementType.agreementTypeId:"";
          $scope.relationshipFormBean.startDate = success.relationshipStartDateFormatted;
          $scope.relationshipFormBean.endDate = success.relationshipEndDateFormatted;
          $scope.relationshipFormBean.levelOfCooperation = success.relationshipLevel;
          if(null !== success.chulaMsFaculty && angular.isDefined(success.chulaMsFaculty.facultyId)){
            $scope.relationshipFormBean.facultyId = success.chulaMsFaculty.facultyId;
          }
          $scope.relationshipFormBean.quotaIn = success.inboundQuota;
          $scope.relationshipFormBean.quotaOut = success.outboundQuota;
          angular.forEach(success.alsoAgreementTypes,function(agreementType){
            $scope.checkedBox.push(agreementType.agreementTypeId);
            angular.forEach($scope.masterAgreementTypes,function(masterAgreementType,id){
              if(agreementType.agreementTypeId === masterAgreementType.agreementTypeId){
                $scope.masterAgreementTypes[id].selected = true;
              }
            });
          });
          $scope.relationshipFile = null==success.relationshipFile?"":success.relationshipFile.split("/")[4];
          $scope.relationshipFilePath = success.relationshipFile;
          $scope.relationshipFormBean.note = success.relationshipNote;
          $scope.relationshipFormBean.autoRenew = success.autoRenew;
          $scope.relationshipFormBean.status = success.status;
        }
      );
    }
  }

  $scope.downloadFile = function(fileName,institutionRelationshipId){
    let param = {};
    param.institutionRelationshipId = institutionRelationshipId;
    param.printRptName = fileName;
    InstitutionRelationshipService.downloadFile(param);
  }

  $scope.doSearchContactPersonByType = function(type){
    const contactPersonType = type;
    if(institutionRelationshipId !== "" && angular.isDefined(institutionRelationshipId) && null !== institutionRelationshipId){
      let params = {};
      params.contactPersonType = contactPersonType;
      params.institutionRelationshipId = institutionRelationshipId;
      console.log(params);
      InstitutionRelationshipService.doSearchContactPerson(params).then(
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
    contactPersonFormBean.parentId = institutionRelationshipId;
    InstitutionContactPersonService.addBean(contactPersonFormBean);
    $('#modal-contact-person').modal('toggle');
  }

  $scope.initEditContactPerson = function(id){
    InstitutionRelationshipService.initEditContactPerson(id).then(
      function(success){
        console.log(success);
        let contactPersonFormBean = {};
        contactPersonFormBean.contactPersonId = success.institutionRelationshipContactPersonId;
        contactPersonFormBean.contactPersonType = success.contactType;
        contactPersonFormBean.parentId = success.chulaTrInstitutionRelationship.institutionRelationshipId;
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

  $scope.doDeleteRelationship = function(){
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
        InstitutionRelationshipService.doDeleteRelationship(institutionRelationshipId.toString()).then(
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
    });
  }

  $scope.initPage = function(){
    //--- prepare AgreementType
    let param = {};
    param.agreementTypeName = "ALL";
    MasterAgreementTypeService.doSearch(param).then(
      function(success){
        $scope.masterAgreementTypes = success;
      }
    );

    param = {};
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

    
  }

  $scope.initPage();
  $scope.initEditInstitutionRelationship();
  $scope.doSearchInternalContactPerson();
  $scope.doSearchExternalContactPerson();

});
