'use strict';

oiaApplication.controller('UserManagementController',function($rootScope,$state,$scope,$location, $cookies, localStorageService,$filter,ngTableParams,
                                                              UserManagementService,MasterRoleService){

  $scope.masterRoles = {};
  $scope.userFormBean = {};

  $scope.resetModal = function(){
    // $scope.userFormBean.userId = "";
    // $scope.userFormBean.fullName = "";
    // $scope.userFormBean.email = "";
    // $scope.userFormBean.userLoginName = "";
    // $scope.userFormBean.roleId = "";
    $scope.userFormBean = {};
  }

  $scope.doSearchUser = function(){
    let param = {};
    param.userFullName = $scope.searchUserFullName;
    UserManagementService.doSearchPost(param).then(
      function(success){
        var result = success;
        $scope.UserTable = new ngTableParams({
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

  $scope.initEditUser = function(userId){
    UserManagementService.initEdit(userId).then(
      function(success){
        console.log(success);
        $scope.userFormBean.userId = success.userId;
        $scope.userFormBean.fullName = success.fullName;
        $scope.userFormBean.email = success.email;
        $scope.userFormBean.userLoginName = success.userLoginName;
        $scope.userFormBean.roleId = success.chulaMsRole.roleId;
        $('#modal-add-edit-user').modal('toggle');
      }
    );
  }

  $scope.doSaveUser = function(){
    swal({
        title: "Confirm?",
        text: "",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#641E20",
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        closeOnConfirm: false
    }, function(isConfirm){
        if(isConfirm){
          if($scope.userFormBean.userId !== null && $scope.userFormBean.userId !== "" && angular.isDefined($scope.userFormBean.userId)){
            $scope.userFormBean.userId = $scope.userFormBean.userId.toString();
          }
          if($scope.userFormBean.roleId !== null && $scope.userFormBean.roleId !== "" && angular.isDefined($scope.userFormBean.roleId)){
            $scope.userFormBean.roleId = $scope.userFormBean.roleId.toString();
          }
          console.log($scope.userFormBean);
          UserManagementService.doSave($scope.userFormBean).then(
            function(success){
              swal({
									title: "Save success",
									text: "",
									type: "success",
									showCancelButton: false,
									confirmButtonText: "OK",
									closeOnConfirm: true
							},function(isConfirm){
                $scope.doSearchUser();
                $('#modal-add-edit-user').modal('toggle');
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
									confirmButtonText: "OK",
									closeOnConfirm: true
							});
            }
          );
        }
      }
    );
  }

  $scope.initPage = function(){
    MasterRoleService.getAllRole().then(
      function(success){
        $scope.masterRoles = success;
      }
    );
  }
  $scope.initPage();

});
