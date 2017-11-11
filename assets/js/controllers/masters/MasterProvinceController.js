'use strict';

oiaApplication.controller('MasterProvinceController',function($rootScope,$state,$scope,$location, $cookies,$filter,ngTableParams,
                                                                   localStorageService, MasterProvinceService){

  $scope.doSearchProvince = function(){
    var param = {};
    param.provinceName = (angular.isUndefined($scope.provinceName) || $scope.provinceName=="")?"ALL":$scope.provinceName;
    MasterProvinceService.doSearch(param).then(
      function(success){
        var result = success;
        console.log(result);
        $scope.ProvinceTable = new ngTableParams({
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
    $scope.modalProvinceId = "";
    $scope.modalProvinceName = "";
  }

  $scope.initEditProvince = function(provinceId){
    MasterProvinceService.initEdit(provinceId).then(
      function(success){
        console.log(success);
        $scope.modalProvinceId = success.provinceId;
        $scope.modalProvinceName = success.provinceName;
        $('#modal-add-edit-province').modal('toggle');
      }
    );
  }
  $scope.doSaveProvince = function(){
    var provinceName = $scope.modalProvinceName;
    if(!angular.isUndefined(provinceName) && provinceName != ''){
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
            param.provinceId = $scope.modalProvinceId.toString();
            param.provinceName = $scope.modalProvinceName;
            param.userSession = userSession;
            console.log(param);
  					MasterProvinceService.doSave(param).then(
              function(success){
                swal({
                    title: "Saved success",
                    text: "",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonText: "ok",
                    closeOnConfirm: true
                }, function(isConfirm){
                    $('#modal-add-edit-province').modal('toggle');
                    $scope.doSearchProvince();
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
        title: "Province Name cannot blank",
        text: "",
        type: "error",
        showCancelButton: false,
        confirmButtonText: "ok",
        closeOnConfirm: true
      });
    }
  }

  $scope.doDeleteProvince = function(provinceId){
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
          param.provinceId = angular.isUndefined(provinceId)?"":provinceId;
          param.userSession = userSession;
          console.log(param);
          MasterProvinceService.doDelete(param).then(
            function(success){
              swal({
                  title: "Delete success",
                  text: "",
                  type: "success",
                  showCancelButton: false,
                  confirmButtonText: "ok",
                  closeOnConfirm: true
              }, function(isConfirm){
                  $scope.doSearchProvince();
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
