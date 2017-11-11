'use strict';

oiaApplication.controller('RelationNetworkMOUInstitutionController',function($rootScope,$state,$scope,$location, $cookies, localStorageService,ngTableParams,$filter,
																																						 RelationNetworkMOUInstitutionService, MasterCountryService, MasterInstitutionService){


  $scope.checkedBox = [];
	// var networkMou = localStorageService.get('networkMou');
	var networkMou = $rootScope.networkMou;
	if(angular.isUndefined(networkMou) || networkMou == ""){
		$state.go('site.relation-add-edit-network-mou-main.information',{},{reload:true});
		return false;
	}
	$scope.doSerchNetworkMouInstitution = function(){
		var networkMouId = networkMou.networkMouId;
		RelationNetworkMOUInstitutionService.doSearch(networkMouId).then(
      function(success){
        var result = success;
				$rootScope.networkMouInstitution = result;
        $scope.NetworkMouInstitutionTable = new ngTableParams({
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

	$scope.initModal = function(){
		var param = {};
		param.regionId = "0";
		param.countryName = "ALL";
		MasterCountryService.doSearch(param).then(
			function(success){
				$scope.countries = success;
			}
		);
	}

	$scope.doSearchInstitution = function(){
		var param = {};
    param.countryId = (angular.isUndefined($scope.countryId) || $scope.regionId=="")?0:$scope.countryId;
    param.institutionName = (angular.isUndefined($scope.institutionName) || $scope.institutionName=="")?"ALL":$scope.institutionName;
    MasterInstitutionService.doSearch(param).then(
      function(success){
        var result = success;
				$scope.institutions = success;
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

	$scope.doDeleteInstitution = function(networkMouId, institutionId){
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
					param.networkMouId = networkMouId;
					param.institutionId = institutionId;
					RelationNetworkMOUInstitutionService.doDelete(param).then(
						function(success){
							console.log(success);
							swal({
									title: "Save success",
									text: "",
									type: "success",
									showCancelButton: false,
									confirmButtonText: "OK",
									closeOnConfirm: true
							},function(isConfirm){
								$scope.doSerchNetworkMouInstitution();
								$rootScope.chulaMsInstitution = success.chulaMsInstitution;
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

	$scope.doSaveInstitution = function(){
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
					var institutions = [];
					angular.forEach($scope.institutions, function(institution){
						if(institution.selected){
							institutions.push({
								institutionId : institution.institutionId
							});
						}
					});

					var networkMouId = networkMou.networkMouId;
					param.networkMouId = networkMouId;
					param.institutions = institutions;
					console.log(param);
					RelationNetworkMOUInstitutionService.doSave(param).then(
						function(success){
							console.log(success);
							swal({
									title: "Save success",
									text: "",
									type: "success",
									showCancelButton: false,
									confirmButtonText: "OK",
									closeOnConfirm: true
							},function(isConfirm){
								$scope.doSerchNetworkMouInstitution();
								$rootScope.chulaMsInstitution = success.chulaMsInstitution;
								$('#modal-institution').modal('toggle');
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
		// if(angular.isUndefined(networkMou.networkMouId) || networkMou.networkMouId == ""){
		// 	$state.go('site.relation-add-edit-network-mou-main.information',{},{reload:true});
		// }

		//----- load Institution underneath network/MOU
		$scope.doSerchNetworkMouInstitution();
	}

	$scope.initPage();

});
