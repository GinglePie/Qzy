'use strict';

oiaApplication.controller('MasterAgreementTypeController',function($rootScope,$state,$scope,$location, $cookies,$filter,ngTableParams,
                                                                   localStorageService, MasterAgreementTypeService){

  $scope.doSearchAgreementType = function(){
    var param = {};
    param.agreementTypeName = (angular.isUndefined($scope.agreementTypeName) || $scope.agreementTypeName=="")?"ALL":$scope.agreementTypeName;
    MasterAgreementTypeService.doSearch(param).then(
      function(success){
        var result = success;
        console.log(result);
        $scope.AgreementTypeTable = new ngTableParams({
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
    $scope.modalAgreementTypeId = "";
    $scope.modalAgreementTypeName = "";
  }

  $scope.initEditAgreementType = function(agreementTypeId){
    MasterAgreementTypeService.initEdit(agreementTypeId).then(
      function(success){
        console.log(success);
        $scope.modalAgreementTypeId = success.agreementTypeId;
        $scope.modalAgreementTypeName = success.agreementTypeName;
        $('#modal-add-edit-agreement-type').modal('toggle');
      }
    );
  }
  $scope.doSaveAgreementType = function(){
    var agreementTypeName = $scope.modalAgreementTypeName;
    if(!angular.isUndefined(agreementTypeName) && agreementTypeName != ''){
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
            param.agreementTypeId = $scope.modalAgreementTypeId.toString();
            param.agreementTypeName = $scope.modalAgreementTypeName;
            param.userSession = userSession;
            console.log(param);
  					MasterAgreementTypeService.doSave(param).then(
              function(success){
                swal({
                    title: "Saved success",
                    text: "",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonText: "ok",
                    closeOnConfirm: true
                }, function(isConfirm){
                    $('#modal-add-edit-agreement-type').modal('toggle');
                    $scope.doSearchAgreementType();
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

  $scope.doDeleteAgreementType = function(agreementTypeId){
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
          param.agreementTypeId = angular.isUndefined(agreementTypeId)?"":agreementTypeId;
          param.userSession = userSession;
          console.log(param);
          MasterAgreementTypeService.doDelete(param).then(
            function(success){
              swal({
                  title: "Delete success",
                  text: "",
                  type: "success",
                  showCancelButton: false,
                  confirmButtonText: "ok",
                  closeOnConfirm: true
              }, function(isConfirm){
                  $scope.doSearchAgreementType();
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
