'use strict';

oiaApplication.controller('InstitutionFocusController',function($rootScope,$state,$scope,$stateParams,$location, $cookies, localStorageService,$filter,ngTableParams,
                                                                MasterFocusTypeService, MasterFocusGroupService, MasterFocusSpecificService, InstitutionFocusService){

  $scope.masterFocusTypes = {};
  $scope.masterFocusGroups = {};
  $scope.masterFocusSpecifics = {};

  $scope.institutionFocusDatas = {};

  $scope.institutionFocusBean = {};

  
  $scope.doSearchFocusGroup = function(){
    const focusTypeId = $scope.institutionFocusBean.focusTypeId;
    if(angular.isDefined(focusTypeId) && focusTypeId > 0){
      let param = {};
      param.focusTypeId = focusTypeId;
      param.focusGroup = "ALL";
      MasterFocusGroupService.doSearch(param).then(
        function(success){
          $scope.masterFocusGroups = success;
        }
      );
    }else{
      $scope.masterFocusGroups = {};
    }
  }

  $scope.doSearchFocusSpecific = function(){
    const focusGroupId = $scope.institutionFocusBean.focusGroupId;
    if(angular.isDefined(focusGroupId) && focusGroupId > 0){
      let param = {};
      param.focusGroupId = focusGroupId;
      param.focusSpecific= "ALL";
      MasterFocusSpecificService.doSearch(param).then(
        function(success){
          $scope.masterFocusSpecifics = success;
        }
      );
    }else{
      $scope.masterFocusSpecifics = {};
    }
  }

  $scope.resetModal = function(){
    $scope.institutionFocusBean = {};
  }

  $scope.doSearchFocusTable = function(){
    if(null != localStorageService.get('institutionId')){
      const institutionId = localStorageService.get('institutionId').toString();
      InstitutionFocusService.doSearch(institutionId).then(
        function(success){
            $scope.institutionFocusDatas = success;
        }
      );
    }
    
  }

  $scope.doSaveFocus = function(){
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
          $scope.institutionFocusBean.institutionId = institutionId.toString();
          InstitutionFocusService.doSave($scope.institutionFocusBean).then(
            function(success){
              swal({
									title: "Save success",
									text: "",
									type: "success",
									showCancelButton: false,
									confirmButtonText: "OK",
									closeOnConfirm: true
							},function(isConfirm){
                $scope.doSearchFocusTable();
                $('#modal-focus').modal('toggle');
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

  $scope.initEditInstitutionFocus = function(chulaTrInstitutionFocusPk, focusSpecific, note){
    $scope.resetModal();
    console.log(chulaTrInstitutionFocusPk);
    $scope.institutionFocusBean.focusTypeId = chulaTrInstitutionFocusPk.focusTypeId;
    $scope.doSearchFocusGroup();
    $scope.institutionFocusBean.focusGroupId = chulaTrInstitutionFocusPk.focusGroupId;
    $scope.doSearchFocusSpecific();
    if(null !== focusSpecific && angular.isDefined(focusSpecific) && focusSpecific !== ''){
      $scope.institutionFocusBean.focusSpecificId = focusSpecific.focusSpecificId;
    }
    $scope.institutionFocusBean.note = note;
    $('#modal-focus').modal('toggle');
  }

  $scope.loadDataTable = function(){
    
     let action = $stateParams.action;
     let institutionId = $stateParams.institutionId;
     let localInstitutionId = localStorageService.get('institutionId');
     if(localInstitutionId !== null || localInstitutionId !== '' && angular.isDefined(localInstitutionId)){
       institutionId = localInstitutionId;
       action = 'E';
     }
     if(action == 'A'){
       $scope.institutionFocusDatas = {};
     }else if(action == 'E'){
      $scope.doSearchFocusTable();
     }
   }

   $scope.doDelete = function(){
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
        $scope.institutionFocusBean.institutionId = institutionId.toString();
        console.log($scope.institutionFocusBean);
        InstitutionFocusService.doDelete($scope.institutionFocusBean).then(
          function(success){
            swal({
                title: "Save success",
                text: "",
                type: "success",
                showCancelButton: false,
                confirmButtonText: "OK",
                closeOnConfirm: true
            },function(isConfirm){
              $scope.doSearchFocusTable();
              $('#modal-focus').modal('toggle');
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
    //--- prepare Focus type
    let param = {};
    param.focusType = "ALL";
    MasterFocusTypeService.doSearch(param).then(
      function(result){
        $scope.masterFocusTypes = result;
      }
    );


  }

  $scope.initPage();
  $scope.loadDataTable();

});
