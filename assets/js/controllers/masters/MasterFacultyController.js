'use strict';

oiaApplication.controller('MasterFacultyController',function($rootScope,$state,$scope,$location, $cookies,$filter,ngTableParams,
                                                                 localStorageService, MasterFacultyService, MasterInstitutionService){

   $scope.institutions = {};

   $scope.initPage = function(){
     var param = {};
     param.countryId = "0";
     param.institutionName = "ALL";
     MasterInstitutionService.doSearch(param).then(
       function(success){
         $scope.institutions = success;
       }
     );

   }

   $scope.initPage();

  $scope.resetModal = function(){
    $scope.modalFacultyId = "";
    $scope.modalInstitutionId = "";
    $scope.modalFacultyName = "";
  }

  $scope.doSearchFaculty = function(){
    var param = {};
    param.institutionId = (angular.isUndefined($scope.institutionId) || $scope.regionId=="")?0:$scope.institutionId;
    param.facultyName = (angular.isUndefined($scope.facultyName) || $scope.facultyName=="")?"ALL":$scope.facultyName;
    MasterFacultyService.doSearch(param).then(
      function(success){
        var result = success;
        console.log(result);
        $scope.FacultyTable = new ngTableParams({
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
  $scope.initEditFaculty = function(facultyId){
    console.log(facultyId);
    MasterFacultyService.initEdit(facultyId).then(
      function(success){
        console.log(success);
        $scope.modalFacultyId = success.facultyId;
        $scope.modalFacultyName = success.facultyName;
        $scope.modalInstitutionId = success.chulaMsInstitution.institutionId;
        $('#modal-add-edit-faculty').modal('toggle');
      }
    );
  }
  $scope.doSaveFaculty = function(){
    var facultyName = $scope.modalFacultyName;
    if(!angular.isUndefined(facultyName) && facultyName != ''){
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
            param.facultyId = angular.isUndefined($scope.modalFacultyId)?"":$scope.modalFacultyId.toString();
            param.facultyName = facultyName;
            param.institutionId = $scope.modalInstitutionId.toString();
            param.userSession = userSession;
            console.log(param);
  					MasterFacultyService.doSave(param).then(
              function(success){
                swal({
                    title: "Saved success",
                    text: "",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonText: "ok",
                    closeOnConfirm: true
                }, function(isConfirm){
                    $('#modal-add-edit-faculty').modal('toggle');
                    $scope.doSearchFaculty();
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
        title: "Faculty Name cannot blank",
        text: "",
        type: "error",
        showCancelButton: false,
        confirmButtonText: "ok",
        closeOnConfirm: true
      });
    }
  }

  $scope.doDeleteFaculty = function(facultyId){
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
          param.facultyId = angular.isUndefined(facultyId)?"":facultyId;
          param.userSession = userSession;
          console.log(param);
          MasterFacultyService.doDelete(param).then(
            function(success){
              swal({
                  title: "Delete success",
                  text: "",
                  type: "success",
                  showCancelButton: false,
                  confirmButtonText: "ok",
                  closeOnConfirm: true
              }, function(isConfirm){
                  $scope.doSearchFaculty();
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
