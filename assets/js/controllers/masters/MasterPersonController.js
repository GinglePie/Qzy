'use strict';

oiaApplication.controller('MasterPersonController',function($rootScope,$state,$scope,$location, $cookies,$filter,ngTableParams,
                                                                   localStorageService, MasterPersonService){
  
  $scope.doSearchPerson = function(){
    var param = {};
    param.searchPersonName = (angular.isUndefined($scope.searchPersonName) || $scope.searchPersonName=="")?"ALL":$scope.searchPersonName;
    MasterPersonService.doSearch(param).then(
      function(success){
        var result = success;
        console.log(result);
        $scope.PersonTable = new ngTableParams({
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

  $scope.initAddPerson = function(){
    $state.go('site.master-add-edit-person',{personId:null, action:"A"});
  }

  $scope.initEditPerson = function(personId){
    $state.go('site.master-add-edit-person',{personId:personId, action:"E"});
  }

  $scope.doDeletePerson = function(personId){
    console.log(personId);
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
          param.personId = angular.isUndefined(personId)?"":personId;
          param.userSession = userSession;
          console.log(param);
          MasterPersonService.doDelete(param).then(
            function(success){
              swal({
                  title: "Delete success",
                  text: "",
                  type: "success",
                  showCancelButton: false,
                  confirmButtonText: "ok",
                  closeOnConfirm: true
              }, function(isConfirm){
                  $scope.doSearchPerson();
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
