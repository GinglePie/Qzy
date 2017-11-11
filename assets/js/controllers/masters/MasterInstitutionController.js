'use strict';

oiaApplication.controller('MasterInstitutionController',function($rootScope,$state,$scope,$location, $cookies,$filter,ngTableParams,
                                                                 localStorageService, MasterInstitutionService, MasterCountryService){

   $scope.countries = {};

   $scope.initPage = function(){
     var param = {};
     param.regionId = "0";
     param.countryName = "ALL";
     MasterCountryService.doSearch(param).then(
       function(success){
         $scope.countries = success;
       }
     );

     MasterInstitutionService.getInstitutionType().then(
       function(success){
         console.log(success.data);
         $scope.institutionTypes = success.data;
       }
     );
   }

   $scope.initPage();

  $scope.resetModal = function(){
    $scope.modalCountryId = "";
    $scope.modalInstitutionId = "";
    $scope.modalInstitutionName = "";
    $scope.modalInstitutionNickName = "";
    $scope.modalInstitutionType = "";
  }

  $scope.doSearchInstitution = function(){
    var param = {};
    param.countryId = (angular.isUndefined($scope.countryId) || $scope.regionId=="")?0:$scope.countryId;
    param.institutionName = (angular.isUndefined($scope.institutionName) || $scope.institutionName=="")?"ALL":$scope.institutionName;
    MasterInstitutionService.doSearch(param).then(
      function(success){
        var result = success;
        console.log(result);
        $scope.InstitutionTable = new ngTableParams({
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
  $scope.initEditInstitution = function(institionId){
    console.log(institionId);
    MasterInstitutionService.initEdit(institionId).then(
      function(success){
        console.log(success);
        $scope.modalInstitutionId = success.institutionId;
        $scope.modalInstitutionName = success.institutionName;
        $scope.modalInstitutionNickName = success.institutionNickName;
        $scope.modalInstitutionType = success.institutionType;
        $scope.modalCountryId = success.chulaMsCountry.countryId;
        $('#modal-add-edit-institution').modal('toggle');
      }
    );
  }
  $scope.doSaveInstitution = function(){
    var institutionName = $scope.modalInstitutionName;
    if(!angular.isUndefined(institutionName) && institutionName != ''){
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
            param.institutionId = angular.isUndefined($scope.modalInstitutionId)?"":$scope.modalInstitutionId.toString();
            param.institutionName = $scope.modalInstitutionName;
            param.institutionType = $scope.modalInstitutionType;
            param.institutionNickName = $scope.modalInstitutionNickName;
            param.countryId = $scope.modalCountryId.toString();
            param.userSession = userSession;
            console.log(param);
  					MasterInstitutionService.doSave(param).then(
              function(success){
                swal({
                    title: "Saved success",
                    text: "",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonText: "ok",
                    closeOnConfirm: true
                }, function(isConfirm){
                    $('#modal-add-edit-institution').modal('toggle');
                    $scope.doSearchInstitution();
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
        title: "Institution Name cannot blank",
        text: "",
        type: "error",
        showCancelButton: false,
        confirmButtonText: "ok",
        closeOnConfirm: true
      });
    }
  }

  $scope.doDeleteInstitution = function(institutionId){
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
          param.institutionId = angular.isUndefined(institutionId)?"":institutionId;
          param.userSession = userSession;
          console.log(param);
          MasterInstitutionService.doDelete(param).then(
            function(success){
              swal({
                  title: "Delete success",
                  text: "",
                  type: "success",
                  showCancelButton: false,
                  confirmButtonText: "ok",
                  closeOnConfirm: true
              }, function(isConfirm){
                  $scope.doSearchInstitution();
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
