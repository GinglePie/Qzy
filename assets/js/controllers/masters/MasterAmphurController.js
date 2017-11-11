'use strict';

oiaApplication.controller('MasterAmphurController',function($rootScope,$state,$scope,$location, $cookies,$filter,ngTableParams,
                                                            localStorageService,MasterProvinceService, MasterAmphurService){



  $scope.provinces = {};

  $scope.initPage = function(){
    var param = {};
    param.provinceName = "";
    MasterProvinceService.doSearch(param).then(
      function(success){
        $scope.provinces = success;
      }
    );
  }

  $scope.initPage();

  $scope.doSearchAmphur = function(){
    var param = {};
    param.amphurName = (angular.isUndefined($scope.amphurName) || $scope.amphurName=="")?"ALL":$scope.amphurName;
    param.provinceId = (angular.isUndefined($scope.provinceId) || $scope.provinceId=="")?0:$scope.provinceId;
    MasterAmphurService.doSearch(param).then(
      function(success){
        var result = success;
        console.log(result);
        $scope.AmphurTable = new ngTableParams({
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
    $scope.modalAmphurId = "";
    $scope.modalAmphurName = "";
  }

  $scope.initEditAmphur = function(amphurId){
    MasterAmphurService.initEdit(amphurId).then(
      function(success){
        console.log(success);
        $scope.modalProvinceId = success.chulaMsProvince.provinceId;
        $scope.modalAmphurId = success.amphurId;
        $scope.modalAmphurName = success.amphurName;
        $('#modal-add-edit-amphur').modal('toggle');
      }
    );
  }
  $scope.doSaveAmphur = function(){
    var amphurName = angular.isUndefined($scope.modalAmphurName)?"0":$scope.modalAmphurName;
    var amphurId = angular.isUndefined($scope.modalAmphurId)?"":$scope.modalAmphurId.toString();
    var provinceId = angular.isUndefined($scope.modalProvinceId)?"0":$scope.modalProvinceId.toString();
    if(amphurName != ''){
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
            param.provinceId = provinceId;
            param.amphurId = amphurId;
            param.amphurName = amphurName;
            param.userSession = userSession;
            console.log(param);
  					MasterAmphurService.doSave(param).then(
              function(success){
                swal({
                    title: "Saved success",
                    text: "",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonText: "ok",
                    closeOnConfirm: true
                }, function(isConfirm){
                    $('#modal-add-edit-amphur').modal('toggle');
                    $scope.doSearchAmphur();
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
        title: "Amphur Name cannot blank",
        text: "",
        type: "error",
        showCancelButton: false,
        confirmButtonText: "ok",
        closeOnConfirm: true
      });
    }
  }

  $scope.doDeleteAmphur = function(amphurId){
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
          param.amphurId = angular.isUndefined(amphurId)?"":amphurId;
          param.userSession = userSession;
          console.log(param);
          MasterAmphurService.doDelete(param).then(
            function(success){
              swal({
                  title: "Delete success",
                  text: "",
                  type: "success",
                  showCancelButton: false,
                  confirmButtonText: "ok",
                  closeOnConfirm: true
              }, function(isConfirm){
                  $scope.doSearchAmphur();
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
