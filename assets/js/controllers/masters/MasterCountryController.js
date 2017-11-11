'use strict';

oiaApplication.controller('MasterCountryController',function($rootScope,$state,$scope,$location, $cookies,$filter,ngTableParams,
                                                             localStorageService, MasterCountryService,MasterRegionService){

  $scope.regions = {};

  $scope.initPage = function(){
    MasterRegionService.doSearch("").then(
      function(success){
        $scope.regions = success;
      }
    );
  }

  $scope.initPage();

  $scope.doSearchCountry = function(){
    var param = {};
    param.countryName = (angular.isUndefined($scope.countryName) || $scope.countryName=="")?"ALL":$scope.countryName;
    param.regionId = (angular.isUndefined($scope.regionId) || $scope.regionId=="")?0:$scope.regionId;
    MasterCountryService.doSearch(param).then(
      function(success){
        var result = success;
        console.log(result);
        $scope.CountryTable = new ngTableParams({
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

  $scope.resetModal = function(){
    $scope.modalRegionId = "";
    $scope.modalCountryId = "";
    $scope.modalCountryName = "";
  }

  $scope.initEditCountry = function(countryId){
    MasterCountryService.initEdit(countryId).then(
      function(success){
        $scope.modalCountryId = success.countryId;
        $scope.modalCountryName = success.countryName;
        $scope.modalRegionId = success.chulaMsRegion.regionId;
        $('#modal-add-edit-country').modal('toggle');
      }
    );
  }

  $scope.doSaveCountry = function(){
    var regionId = angular.isUndefined($scope.modalRegionId)?"0":$scope.modalRegionId.toString();
    var countryName = angular.isUndefined($scope.modalCountryName)?"":$scope.modalCountryName;
    var countryId = angular.isUndefined($scope.modalCountryId)?"0":$scope.modalCountryId.toString();
    if(countryName != ''){
      swal({
          title: "Confirm?",
          text: "",
          type: "warning",
          showCancelButton: true,
          confirmButtonText: "Confirm",
          cancelButtonText: "Cancel",
          closeOnConfirm: false
      }, function(isConfirm){
          if(isConfirm){
  					var userSession = localStorageService.get("userSession");
  					var param = {};
            param.regionId = regionId;
            param.countryName = countryName;
            param.countryId = countryId;
            param.userSession = userSession;
            console.log(param);
  					MasterCountryService.doSave(param).then(
              function(success){
                swal({
                    title: "Saved success",
                    text: "",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonText: "ok",
                    closeOnConfirm: true
                }, function(isConfirm){
                    $('#modal-add-edit-country').modal('toggle');
                    $scope.doSearchCountry();
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
                  confirmButtonText: "ok",
                  closeOnConfirm: true
  		          });
              }
            );
          }
      });
    }else{
      swal({
        title: "Retion or CountryName cannot blank",
        text: "",
        type: "error",
        showCancelButton: false,
        confirmButtonText: "ok",
        closeOnConfirm: true
      });
    }
  }

  $scope.doDeleteCountry = function(countryId){
    swal({
        title: "Confirm?",
        text: "",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Confirm",
        cancelButtonText: "Cancel",
        closeOnConfirm: false
    }, function(isConfirm){
        if(isConfirm){
          var userSession = localStorageService.get("userSession");
          var param = {};
          param.countryId = angular.isUndefined(countryId)?"":countryId;
          param.userSession = userSession;
          console.log(param);
          MasterCountryService.doDelete(param).then(
            function(success){
              swal({
                  title: "Delete success",
                  text: "",
                  type: "success",
                  showCancelButton: false,
                  confirmButtonText: "ok",
                  closeOnConfirm: true
              }, function(isConfirm){
                  $scope.doSearchCountry();
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
                confirmButtonText: "ok",
                closeOnConfirm: true
              });
            }
          );
        }
    });
  }

});
