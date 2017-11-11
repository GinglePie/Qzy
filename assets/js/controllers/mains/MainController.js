'use strict';

oiaApplication.controller('MainController',function($rootScope,$state,$scope,$location, $cookies, localStorageService,$filter,ngTableParams,
                                                    MasterFocusTypeService, MasterFocusGroupService, MasterFocusSpecificService, MasterCountryService,
                                                    MainService){

  $scope.masterCountries = {};
  $scope.masterFocusTypes = {};
  $scope.masterFocusGroups = {};
  $scope.masterFocusSpecifics = {};

  $scope.searchBean = {};

  
  $scope.doInitEditInstitution = function(id){
    $state.go('site.institution.institution-management',{institutionId:id, action:"E"});
  }

  $scope.doInitAddInstitution = function(){
    $state.go('site.institution.institution-management',{institutionId:null, action:"A"});
    localStorageService.remove('institutionId');
  }

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

  $scope.doSearch = function(){
    if(angular.isDefined($scope.searchBean.countryId)){
      $scope.searchBean.countryId = $scope.searchBean.countryId.toString();
    }
    MainService.doSearch($scope.searchBean).then(
      function(success){
        console.log(success);
        const result = success;
        $scope.MainTable = new ngTableParams({
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

  $scope.initPage = function(){
    let param = {};
    // param.focusType = "ALL";
    // MasterFocusTypeService.doSearch(param).then(
    //   function(result){
    //     $scope.masterFocusTypes = result;
    //   }
    // );

    param = {};
    param.regionId = "0";
    param.countryName = "ALL";
    MasterCountryService.doSearch(param).then(
      function(success){
        $scope.masterCountries = success;
      }
    );


  }

  $scope.initPage();

});
