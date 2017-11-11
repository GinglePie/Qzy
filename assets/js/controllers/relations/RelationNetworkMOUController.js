'use strict';

oiaApplication.controller('RelationNetworkMOUController',function($rootScope,$state,$scope,$location, $cookies, localStorageService,$filter,ngTableParams,
																																	RelationNetworkMOUService){

	$scope.doAddNetworkMou = function(){
		$state.go('site.relation-add-edit-network-mou-main.information',{networkMouId:null, action:"A"});
	}

	$scope.doSearchNetworkMou = function(){
		var param = {};
		param.networkMouName = (angular.isUndefined($scope.networkMouName) || $scope.networkMouName == "")?"ALL":$scope.networkMouName;
		RelationNetworkMOUService.doSearch(param).then(
			function(success){
				var result = success;
        console.log(result);
        $scope.NetworkMouTable = new ngTableParams({
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

	$scope.initEditNetworkMou = function(networkMouId){
    $state.go('site.relation-add-edit-network-mou-main.information',{networkMouId:networkMouId, action:"E"});
  }

	$scope.doDeleteNetworkMou = function(networkMouId){
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
					RelationNetworkMOUService.doDelete(networkMouId).then(
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
								$scope.doSearchNetworkMou();
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
					);;
				}
		});
	}
});
