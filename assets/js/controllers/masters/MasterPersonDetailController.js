'use strict';

oiaApplication.controller('MasterPersonDetailController',function($rootScope,$state,$scope,$location, $cookies,$filter,$stateParams,
                                                                   localStorageService, MasterPersonService, MasterCountryService,
                                                                   MasterProvinceService, MasterAmphurService, MasterTambolService,
                                                                   MasterPrefixService){

  $scope.provinces = {};
  $scope.amphurs = {};
  $scope.tambols = {};
  $scope.countries = {};
  $scope.personTypes = {};
  $scope.prefixes = {};
  $scope.person = {};

  $scope.initPageAddEdit = function(){
    var paramProvince = {};
    paramProvince.provinceName = "ALL";
    MasterProvinceService.doSearch(paramProvince).then(
      function(success){
        $scope.provinces = success;
      }
    );

    var paramCountry = {};
    paramCountry.regionId = "0";
    paramCountry.countryName = "ALL";
    MasterCountryService.doSearch(paramCountry).then(
      function(success){
        $scope.countries = success;
      }
    );

    MasterPersonService.getPersonType().then(
      function(success){
        $scope.personTypes = success.data;
      }
    );

    var paramPrefix = {};
    paramPrefix.prefixName = "ALL";
    MasterPrefixService.doSearch(paramPrefix).then(
      function(success){
        $scope.prefixes = success;
      }
    );

  }

  $scope.doSearchAmphur = function(){
    var param = {};
    var provinceId = angular.isUndefined($scope.person.provinceId)?"0":$scope.person.provinceId.toString();
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
      $scope.tambols = {};
    }
  }

  $scope.doSearchTambol = function(){
    var param = {};
    var provinceId = (angular.isUndefined($scope.person.provinceId) || $scope.person.provinceId==null)?"0":$scope.person.provinceId.toString();
    var amphurId = (angular.isUndefined($scope.person.amphurId) || $scope.person.amphurId==null)?"0":$scope.person.amphurId.toString();
    if(amphurId != "0" && amphurId != ""){
      param.provinceId = provinceId;
      param.amphurId = amphurId;
      param.tambolName = "";
      MasterTambolService.doSearch(param).then(
        function(success){
          $scope.tambols = success;
        }
      );
    }else{
      $scope.tambols = {};
    }
  }

  $scope.initEditPerson = function(){

    var action = $stateParams.action;
    var personId = $stateParams.personId;
    console.log("action: "+action+" personId: "+personId);
    if(action == null && personId == null){
      $state.go('site.master-person');
    }
    if(action === 'E'){

      if(!angular.isUndefined(personId) && personId != null && personId != ""){

        console.log(personId);
        MasterPersonService.initEdit(personId).then(
          function(success){
            console.log(success);
            $scope.person = success;
            $scope.person.birthDate = $filter('formatDateTH')(success.birthDate);
            $scope.person.prefixId = success.chulaMsPrefix.prefixId;
            $scope.person.provinceId = success.chulaMsProvince.provinceId;
            $scope.doSearchAmphur($scope.person.provinceId);
            $scope.person.amphurId = success.chulaMsAmphur.amphurId;
            $scope.doSearchTambol($scope.person.amphurId);
            $scope.person.tambolId = success.chulaMsTambol.tambolId;
            $scope.person.countryId = success.chulaMsCountry.countryId;
          }
        );
      }else{
        $state.go('site.master-person');
      }
    }
  }

  $scope.initPageAddEdit();
  $scope.initEditPerson();

  $scope.validateSavePerson = function(person){
    var result = 0;
    $('.require').each(
      function(){
        var val = $(this).val();
        if(angular.isUndefined(val) || val == ""){
          result++;
        }
      }
    );
    return (result==0)?true:false;
  }

  $scope.doSavePerson = function(){
    var person = $scope.person;
    console.log(person);
    if($scope.validateSavePerson(person)){
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
            param.person = person;
            param.person.personId = angular.isUndefined(person.personId)?"":person.personId.toString();
            param.person.prefixId = person.prefixId.toString();
            param.person.provinceId = person.provinceId.toString();
            param.person.amphurId = person.amphurId.toString();
            param.person.tambolId = person.tambolId.toString();
            param.person.countryId = person.countryId.toString();
            param.userSession = userSession;
            console.log(param);
  					MasterPersonService.doSave(param).then(
              function(success){
                swal({
                    title: "Saved success",
                    text: "",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonText: "ok",
                    closeOnConfirm: true
                }, function(isConfirm){
                    $state.go("site.master-person",{},{reload:true});
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
        title: "Please fill value in every red asterik",
        text: "",
        type: "error",
        showCancelButton: false,
        confirmButtonText: "ok",
        closeOnConfirm: true
      });
    }
  }

});
