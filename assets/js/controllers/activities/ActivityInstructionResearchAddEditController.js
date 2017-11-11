'use strict';

oiaApplication.controller('ActivityInstructionResearchAddEditController',function($rootScope,$state,$scope,$location, $cookies, $stateParams,localStorageService,
                                                                           ActivityInstructionResearchService,MasterInstitutionService, MasterCountryService,
                                                                           MasterPrefixService, MasterFacultyService){

  $scope.masterPrefixes = {};
  $scope.masterCountries = {};
  $scope.masterInstitutions = {};
  $scope.masterFaculties = {};
  $scope.ActivityInstructionResearchFormBean = {};

  $scope.searchInstitution = function(){
    var countryId = $scope.ActivityInstructionResearchFormBean.countryId;
    console.log(countryId);
    if(!angular.isUndefined(countryId) && countryId !== "" && countryId !== null){
      var param = {};
      param.countryId = countryId;
      param.institutionName = "ALL";
      MasterInstitutionService.doSearch(param).then(
        function(success){
          $scope.masterInstitutions = success;
        }
      );
    }else{
      $scope.masterInstitutions = {};
    }
  }


  $scope.doSaveInstructionResearch = function(){
    console.log($scope.ActivityInstructionResearchFormBean);
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
          ActivityInstructionResearchService.doSave($scope.ActivityInstructionResearchFormBean).then(
            function(success){
              swal({
									title: "Save success",
									text: "",
									type: "success",
									showCancelButton: false,
									confirmButtonText: "OK",
									closeOnConfirm: true
							},function(isConfirm){
                $rootScope.activityInstructionResearchId = success.activityInstructionResearchId;
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
    });

  }

  $scope.initPage = function(){
    //---- load MasterAgreementType
    var param = {};
		param.regionId = "0";
    param.countryName = "ALL";
		MasterCountryService.doSearch(param).then(
			function(success){
				$scope.masterCountries = success;
				// console.log($scope.masterAgreementTypes);
			}
		);

    param = {};
    //---- load MasterInstitution
    param.countryId = "0";
    param.institutionName = "Chula";
    MasterInstitutionService.doSearch(param).then(
      function(success){
        var paramFaculty = {};
        paramFaculty.institutionId = success[0].institutionId;
        paramFaculty.facultyName = "ALL";
        MasterFacultyService.doSearch(paramFaculty).then(
          function(success){
            console.log(success);
              $scope.masterFaculties = success;
          }
        );
      }
    );

    param = {};
    //---- load MasterPrefix
    param.prefixName = "ALL";
    MasterPrefixService.doSearch(param).then(
      function(success){
        $scope.masterPrefixes = success;
      }
    );



  }

  $scope.initEditInstructionResearch = function(){
    var action = $stateParams.action;
		var activityInstructionResearchId = $stateParams.activityInstructionResearchId;
    console.log("action: "+action +" activityInstructionResearchId: "+activityInstructionResearchId);
    if(action == "" && activityInstructionResearchId == ""){
			$state.go("site.activity-exchange-main");
		}
		if(action == "E"){
      if(!angular.isUndefined(activityInstructionResearchId) && activityInstructionResearchId != null && activityInstructionResearchId != ""){
        ActivityInstructionResearchService.initEdit(activityInstructionResearchId).then(
          function(success){
            console.log(success);
            $scope.ActivityInstructionResearchFormBean.activityInstructionResearchId = success.activityInstructionResearchId;
            $scope.ActivityInstructionResearchFormBean.prefixId = success.chulaMsPrefix.prefixId;
            $scope.ActivityInstructionResearchFormBean.fullName = success.fullName;
            $scope.ActivityInstructionResearchFormBean.gender = success.gender;
            $scope.ActivityInstructionResearchFormBean.inboundOutbound = success.inboundOutbound;
            $scope.ActivityInstructionResearchFormBean.startDate = success.startDateFormated;
            $scope.ActivityInstructionResearchFormBean.endDate = success.endDateFormated;
            $scope.ActivityInstructionResearchFormBean.detailInstructionResearch = success.detailInstructionResearch;
            var countryId = success.chulaMsCountry.countryId;
            $scope.ActivityInstructionResearchFormBean.countryId = countryId;
            $scope.searchInstitution(countryId);
            $scope.ActivityInstructionResearchFormBean.institutionId = success.chulaMsInstitution.institutionId;
            $scope.ActivityInstructionResearchFormBean.informFacultyId = success.chulaMsFaculty.facultyId;
          }
        );
      }
    }
  }

  $scope.initPage();
  $scope.initEditInstructionResearch();

});
