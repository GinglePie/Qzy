'use strict';

oiaApplication.controller('InstitutionAddEditController',function($rootScope,$state,$scope,$stateParams,$location, $cookies, localStorageService,$filter,ngTableParams,
                                                                  MasterInstitutionService, MasterCountryService,InstitutionService){

  $scope.masterCountries = {};
  $scope.masterInstitutionTypes = {};

  $scope.institutionBean = {};

  let institutionId = $stateParams.institutionId;

  $scope.goToPage = function(page){
    $state.go(page,{},{reload: true});
  }

  $scope.doSaveInstitution = function(){
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
          // $scope.institutionBean.institutionId = $('#institutionId').val();
          if(institutionId !== null && institutionId !== '' && angular.isDefined(institutionId)){
            $scope.institutionBean.institutionId = $scope.institutionBean.institutionId.toString();
          }
          InstitutionService.doSave($scope.institutionBean).then(
            function(success){
              swal({
									title: "Save success",
									text: "",
									type: "success",
									showCancelButton: false,
									confirmButtonText: "OK",
									closeOnConfirm: true
							},function(isConfirm){
                let localInstitutionId = localStorageService.get('institutionId');
                if(localInstitutionId === null || localInstitutionId === '' || angular.isUndefined(localInstitutionId)){
                  localStorageService.set('institutionId',success.institutionId.toString());
                }
                $('#focusType-institution-name').text(success.fullName);
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

  $scope.initEdit = function(){
   
    let action = $stateParams.action;
    
    console.log("institutionId: "+institutionId+" action: "+action);
    if(institutionId !== null && institutionId !== '' && angular.isDefined(institutionId)){
      localStorageService.set('institutionId',institutionId);
      action = 'E';
    }else{
      let localInstitutionId = localStorageService.get('institutionId');
      if(localInstitutionId !== null && localInstitutionId !== '' && angular.isDefined(localInstitutionId)){
        institutionId = localInstitutionId;
        action = 'E';
      }else{
        if(action !== 'A'){
          $state.go('site.main-search');
        }
      }
    }
    if(action == 'A'){
      $scope.institutionBean = {};
    }else if(action == 'E'){
      InstitutionService.initEdit(institutionId).then(
        function(success){
          console.log(success);
          $scope.institutionBean.institutionId = success.institutionId;
          $scope.institutionBean.fullName = success.institutionName;
          $scope.institutionBean.countryId = success.chulaMsCountry.countryId;
          $scope.institutionBean.searchTerm = success.searchTerm;
          $scope.institutionBean.institutionType = success.institutionType;
          $scope.institutionBean.potentialArea = success.potentialArea;
        }
      );
    }
  }

  $scope.doDeleteInstitution = function(){
    console.log("institutionId: "+institutionId);
  }

  $scope.initPage = function(){
    //--- prepare Country
    let param = {};
    param.regionId = 0;
    param.countryName = "ALL";
    MasterCountryService.doSearch(param).then(
      function(result){
        $scope.masterCountries = result;
      }
    );
    //--- prepare Institution type
    MasterInstitutionService.getInstitutionType().then(
      function(result){
        $scope.masterInstitutionTypes = result;
      }
    );
  }

  $scope.initPage();
  $scope.initEdit();
});
