'use strict';

oiaApplication.controller('ActivityInstructionResearchController',function($rootScope,$state,$scope,$location, $cookies, $stateParams,localStorageService,$filter,ngTableParams,
                                                                           ActivityInstructionResearchService,MasterInstitutionService, MasterCountryService){


  $scope.masterCountries = {};
  $scope.masterInstitutions = {};
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

  $scope.doSearchInstructionResearch = function(){
    ActivityInstructionResearchService.doSearch($scope.ActivityInstructionResearchFormBean).then(
      function(success){
        console.log(success);
        $scope.prepareDataTable(success);
      }
    );
  }

  $scope.doInitEditInstructionResearch = function(instructionResearchId){
    $state.go('site.instruction-research-add-edit',{activityInstructionResearchId:instructionResearchId, action:"E"});
  }

  $scope.prepareDataTable = function(result){
    $scope.InstructionResearchTable = new ngTableParams({
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


  }

  $scope.initPage();

});
