'use strict';

oiaApplication.controller('ActivityExchangeController',function($rootScope,$state,$scope,$location, $cookies, localStorageService,$filter,ngTableParams,
                                                                MasterInstitutionService, MasterAgreementTypeService, ActivityExchangeService
                                                                ){

  $scope.masterInstitutions = {};
  $scope.masterAgreementTypes = {};

  $scope.searchBean = {};

  $scope.doSearchActivityExchange = function(){
    ActivityExchangeService.doSearch($scope.searchBean).then(
      function(success){
        var result = success;
        $scope.ActivityExchangeTable = new ngTableParams({
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

  $scope.initEditActivityExchange = function(activityExchangeId){
    $state.go('site.activity-exchange-add-edit.information',{activityExchangeId:activityExchangeId, action:"E"});
  }

  $scope.doDeleteActivityExchange = function(activityExchangeId){
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
          var param = {};
          param.activityExchangeId = activityExchangeId;
          ActivityExchangeService.doDelete(param).then(
            function(success){
              swal({
									title: "Save success",
									text: "",
									type: "success",
									showCancelButton: false,
									confirmButtonText: "OK",
									closeOnConfirm: true
							},function(isConfirm){
                $scope.doSearchActivityExchange();
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
    var param = {};
    //---- load MasterInstitution
    param.countryId = "0";
    param.institutionName = "ALL";
    MasterInstitutionService.doSearch(param).then(
      function(success){
        $scope.masterInstitutions = success;
      }
    );


    //---- load MasterAgreementType
    param = {};
		param.agreementTypeName = "ALL";
		MasterAgreementTypeService.doSearch(param).then(
			function(success){
				$scope.masterAgreementTypes = success;
				// console.log($scope.masterAgreementTypes);
			}
		);

  }

  $scope.initPage();

});
