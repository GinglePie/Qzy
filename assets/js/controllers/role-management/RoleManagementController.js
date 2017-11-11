'use strict';

oiaApplication.controller('RoleManagementController',function($rootScope,$state,$scope,$location, $cookies, localStorageService,$filter,ngTableParams,
                                                              MasterRoleService,WebPageMapRoleManagementService){

  
  $scope.roleFormBean = {};
  $scope.masterWebPages = {};

  $scope.webPageMapRoleFormBean = [];

  $scope.resetModal = function(){
    $scope.roleFormBean = {};
  }

  $scope.doSearchRole = function(){
    let param = {};
    param.roleName = $scope.searchRoleName;
    MasterRoleService.doSearchPost(param).then(
      function(success){
        var result = success;
        $scope.RoleTable = new ngTableParams({
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

  $scope.initEditRole = function(roleId){
    MasterRoleService.initEdit(roleId).then(
      function(success){
        console.log(success);
        $scope.roleFormBean.roleId = success.roleId;
        $scope.roleFormBean.roleName = success.roleName;
        $scope.roleFormBean.roleDescription = success.roleDescription;
        
        $('#modal-add-edit-role').modal('toggle');
      }
    );
  }

  $scope.doSaveRole = function(){
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
          if($scope.roleFormBean.roleId !== null && $scope.roleFormBean.roleId !== "" && angular.isDefined($scope.roleFormBean.roleId)){
            $scope.roleFormBean.roleId = $scope.roleFormBean.roleId.toString();
          }
          console.log($scope.roleFormBean);
          MasterRoleService.doSave($scope.roleFormBean).then(
            function(success){
              swal({
									title: "Save success",
									text: "",
									type: "success",
									showCancelButton: false,
									confirmButtonText: "OK",
									closeOnConfirm: true
							},function(isConfirm){
                $scope.doSearchRole();
                $('#modal-add-edit-role').modal('toggle');
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

  $scope.initModalWebPageMapRole = function(roleId){
    $scope.webPageMapRoleFormBean = [];
    MasterRoleService.initEdit(roleId).then(
      function(success){
        $scope.webPageMapRole_roleName = success.roleName;
      }
    );
    
    WebPageMapRoleManagementService.doSearch(roleId).then(
      function(success){
        // console.log(success);
        if(success === null || success === "" || angular.isUndefined(success) || success.length === 0){
          WebPageMapRoleManagementService.getAllWebPage().then(
            function(allWebPage){
              $scope.masterWebPages = allWebPage;
              _.each(allWebPage, function(obj, id){
                $scope.webPageMapRoleFormBean.push({
                  webPageMapRoleId: "",
                  roleId: roleId,
                  webPageId : obj.webPageId,
                  canAddEdit : true,
                  viewOnly : false
                });
              });
            }
          );
        }else{
          console.log(success);
          _.each(success, function(obj,id){
            $scope.masterWebPages[id] = obj.chulaMsWebPage;
            $scope.webPageMapRoleFormBean.push({
              webPageMapRoleId : obj.webPageMapRoleId,
              roleId: obj.chulaMsRole.roleId,
              webPageId : obj.chulaMsWebPage.webPageId,
              canAddEdit : obj.canAddEdit==='Y'?true:false,
              viewOnly : obj.viewOnly==='Y'?true:false
            });
            
          });
        }
      }
    );
    $('#modal-add-edit-webpage-map-role').modal('toggle');
  }

  $scope.doSaveWebPageMapRole = function(){
    console.log($scope.webPageMapRoleFormBean);
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
          let param = {};
          param.webPages = $scope.webPageMapRoleFormBean;
          _.each($scope.webPageMapRoleFormBean, function(bean){
            if(bean.webPageMapRoleId !== "" && bean.webPageMapRoleId !== null && angular.isDefined(bean.webPageMapRoleId)){
              bean.webPageMapRoleId = bean.webPageMapRoleId.toString();
            }
          });
          WebPageMapRoleManagementService.doSave(param).then(
            function(success){
              swal({
                  title: "Save success",
                  text: "",
                  type: "success",
                  showCancelButton: false,
                  confirmButtonText: "OK",
                  closeOnConfirm: true
              },function(isConfirm){
                $('#modal-add-edit-webpage-map-role').modal('toggle');
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
});
