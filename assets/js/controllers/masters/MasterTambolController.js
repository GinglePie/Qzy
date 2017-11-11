'use strict';

oiaApplication.controller('MasterTambolController',function($rootScope,$state,$scope,$location, $cookies,$filter,ngTableParams,
                                                            localStorageService,MasterProvinceService,MasterAmphurService, MasterTambolService){


  $scope.provinces = {};
  $scope.amphurs = {};

  $scope.initPage = function(){
    var param = {};
    param.provinceName = "";
    MasterProvinceService.doSearch(param).then(
      function(success){
        $scope.provinces = success;
      }
    );
  }

  $scope.doSearchAmphur = function(isModal){
    var param = {};
    var provinceId = "";
    if(isModal){
      provinceId = angular.isUndefined($scope.modalProvinceId)?"0":$scope.modalProvinceId.toString();
    }else{
      provinceId = angular.isUndefined($scope.provinceId)?"0":$scope.provinceId.toString();  
    }
    if(provinceId != "0" && provinceId != ""){
      param.provinceId = provinceId;
      param.amphurName = "";
      MasterAmphurService.doSearch(param).then(
        function(success){
          $scope.amphurs = success;
        }
      );
    }else{
      $scope.amphurs = {};
    }
  }

  $scope.initPage();

  $scope.doSearchTambol = function(){
    var param = {};
    param.provinceId = (angular.isUndefined($scope.provinceId) || $scope.provinceId == "")?"0":$scope.provinceId.toString();
    param.amphurId = (angular.isUndefined($scope.amphurId) || $scope.amphurId == "")?"0":$scope.amphurId.toString();  
    param.tambolName = (angular.isUndefined($scope.tambolName) || $scope.tambolName=="")?"ALL":$scope.tambolName;
    MasterTambolService.doSearch(param).then(
      function(success){
        var result = success;
        console.log(result);
        $scope.TambolTable = new ngTableParams({
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
    $scope.modalTambolId = "";
    $scope.modalTambolName = "";
  }

  $scope.initEditTambol = function(tambolId){
    MasterTambolService.initEdit(tambolId).then(
      function(success){
        console.log(success);
        $scope.modalProvinceId = success.chulaMsAmphur.chulaMsProvince.provinceId;
        $scope.doSearchAmphur($scope.modalProvinceId);
        $scope.modalAmphurId = success.chulaMsAmphur.amphurId;
        $scope.modalTambolId = success.tambolId;
        $scope.modalTambolName = success.tambolName;
        $('#modal-add-edit-msTambol').modal('toggle');
      }
    );
  }
  $scope.doSaveTambol = function(){
    var provinceId = angular.isUndefined($scope.modalProvinceId)?"0":$scope.modalProvinceId.toString();
    var amphurId = angular.isUndefined($scope.modalAmphurId)?"0":$scope.modalAmphurId.toString();
    var tambolId = angular.isUndefined($scope.modalTambolId)?"0":$scope.modalTambolId.toString();
    var tambolName = angular.isUndefined($scope.modalTambolName)?"":$scope.modalTambolName;
    if(provinceId != "0" && amphurId != "0" && tambolId != "0" && tambolName != ""){
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
            param.tambolId = tambolId;
            param.tambolName = tambolName;
            param.userSession = userSession;
            console.log(param);
  					MasterTambolService.doSave(param).then(
              function(success){
                swal({
                    title: "Saved success",
                    text: "",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonText: "ok",
                    closeOnConfirm: true
                }, function(isConfirm){
                    $('#modal-add-edit-msTambol').modal('toggle');
                    $scope.doSearchTambol();
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
        title: "AgreementType Name cannot blank",
        text: "",
        type: "error",
        showCancelButton: false,
        confirmButtonText: "ok",
        closeOnConfirm: true
      });
    }
  }

  $scope.doDeleteTambol = function(tambolId){
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
          param.tambolId = angular.isUndefined(tambolId)?"0":tambolId;
          param.userSession = userSession;
          console.log(param);
          MasterTambolService.doDelete(param).then(
            function(success){
              swal({
                  title: "Delete success",
                  text: "",
                  type: "success",
                  showCancelButton: false,
                  confirmButtonText: "ok",
                  closeOnConfirm: true
              }, function(isConfirm){
                  $scope.doSearchTambol();
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
