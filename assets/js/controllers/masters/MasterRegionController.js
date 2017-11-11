'use strict';

oiaApplication.controller('MasterRegionController',function($rootScope,$state,$scope,$location, $cookies,$filter,ngTableParams,localStorageService, MasterRegionService){

  $scope.doSearchRegion = function(){
    MasterRegionService.doSearch($scope.regionName).then(
      function(success){
        var result = success;
        console.log(result);
        $scope.RegionTable = new ngTableParams({
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
  $scope.initEditRegion = function(regionId){
    console.log(regionId);
    MasterRegionService.initEdit(regionId).then(
      function(success){
        $scope.modalRegionId = success.regionId;
        $scope.modalRegionName = success.regionName;
        $('#modal-add-edit-region').modal('toggle');
      }
    );
  }
  $scope.doSaveRegion = function(){
    var regionName = $scope.modalRegionName;
    if(!angular.isUndefined(regionName) && regionName != ''){
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
            param.regionId = angular.isUndefined($scope.modalRegionId)?"":$scope.modalRegionId;
            param.regionName = $scope.modalRegionName;
            param.userSession = userSession;
            console.log(param);
  					MasterRegionService.doSave(param).then(
              function(success){
                swal({
                    title: "Saved success",
                    text: "",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonText: "ok",
                    closeOnConfirm: true
                }, function(isConfirm){
                    $('#modal-add-edit-region').modal('toggle');
                    $scope.doSearchRegion();
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
        title: "RegionName cannot blank",
        text: "",
        type: "error",
        showCancelButton: false,
        confirmButtonText: "ok",
        closeOnConfirm: true
      });
    }
  }

  $scope.doDeleteRegion = function(regionId){
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
          param.regionId = angular.isUndefined(regionId)?"":regionId;
          param.userSession = userSession;
          console.log(param);
          MasterRegionService.doDelete(param).then(
            function(success){
              swal({
                  title: "Delete success",
                  text: "",
                  type: "success",
                  showCancelButton: false,
                  confirmButtonText: "ok",
                  closeOnConfirm: true
              }, function(isConfirm){
                  $scope.doSearchRegion();
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
