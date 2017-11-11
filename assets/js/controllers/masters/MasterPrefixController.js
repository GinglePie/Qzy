'use strict';

oiaApplication.controller('MasterPrefixController',function($rootScope,$state,$scope,$location, $cookies,$filter,ngTableParams,
                                                                   localStorageService, MasterPrefixService){

  $scope.doSearchPrefix = function(){
    var param = {};
    param.prefixName = (angular.isUndefined($scope.prefixName) || $scope.prefixName=="")?"ALL":$scope.prefixName;
    MasterPrefixService.doSearch(param).then(
      function(success){
        var result = success;
        console.log(result);
        $scope.PrefixTable = new ngTableParams({
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
    $scope.modalPrefixId = "";
    $scope.modalPrefixName = "";
  }

  $scope.initEditPrefix = function(prefixId){
    MasterPrefixService.initEdit(prefixId).then(
      function(success){
        console.log(success);
        $scope.modalPrefixId = success.prefixId;
        $scope.modalPrefixName = success.prefixName;
        $('#modal-add-edit-msPrefix').modal('toggle');
      }
    );
  }
  $scope.doSavePrefix = function(){
    var prefixName = $scope.modalPrefixName;
    if(!angular.isUndefined(prefixName) && prefixName != ''){
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
            param.prefixId = $scope.modalPrefixId.toString();
            param.prefixName = $scope.modalPrefixName;
            param.userSession = userSession;
            console.log(param);
  					MasterPrefixService.doSave(param).then(
              function(success){
                swal({
                    title: "Saved success",
                    text: "",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonText: "ok",
                    closeOnConfirm: true
                }, function(isConfirm){
                    $('#modal-add-edit-msPrefix').modal('toggle');
                    $scope.doSearchPrefix();
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
        title: "Prefix Name cannot blank",
        text: "",
        type: "error",
        showCancelButton: false,
        confirmButtonText: "ok",
        closeOnConfirm: true
      });
    }
  }

  $scope.doDeletePrefix = function(prefixId){
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
          param.prefixId = angular.isUndefined(prefixId)?"":prefixId;
          param.userSession = userSession;
          console.log(param);
          MasterPrefixService.doDelete(param).then(
            function(success){
              swal({
                  title: "Delete success",
                  text: "",
                  type: "success",
                  showCancelButton: false,
                  confirmButtonText: "ok",
                  closeOnConfirm: true
              }, function(isConfirm){
                  $scope.doSearchPrefix();
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
