'use strict';

oiaApplication.controller('RelationNetworkMOUInformationController',function($rootScope,$state, $stateParams,$scope,$location, $cookies, localStorageService,ngTableParams,$filter,
																																						 RelationNetworkMOUInformationService, MasterAgreementTypeService,MasterNetworkMOUTypeService,
																																					   RelationNetworkMOUInstitutionService,MasterLevelOfCooperationService,RelationNetworkMOUService){

  $scope.masterAgreementTypes = [];
	$scope.masterNetworkMouTypes = {};
	$scope.masterLevelOfCooperations = {};
	$scope.NetworkMouFormBean = {};

	$scope.checkedBox = [];

	$scope.initPage = function(){
		//--- load master Network/MOU type
		MasterNetworkMOUTypeService.getInstitutionType().then(
			function(success){
				$scope.masterNetworkMouTypes = success;
			}
		);

		//--- load Level of Cooperation
		MasterLevelOfCooperationService.getLevelOfCooperation().then(
			function(success){
				$scope.masterLevelOfCooperations = success;
			}
		);

		//--- load agreement type
		var param = {};
		param.agreementTypeName = "ALL";
		MasterAgreementTypeService.doSearch(param).then(
			function(success){
				$scope.masterAgreementTypes = success;
				console.log($scope.masterAgreementTypes);
			}
		);
	}
	$scope.resetModal = function(){
    $scope.networkMouName = "";
    $scope.prepareDataTable("");
  }
	$scope.selectedMOU = function(mou){
    console.log(mou);
    $scope.networkMouRelatedName = mou.networkMouName;
    $scope.NetworkMouFormBean.networkMouRelatedId = mou.networkMouId;
    $scope.resetModal();
    $('#modal-add-edit-activity-exchange-information').modal('toggle');
  }

  $scope.doSearchMou = function(){
    var param = {};
		param.networkMouName = (angular.isUndefined($scope.networkMouName) || $scope.networkMouName == "")?"ALL":$scope.networkMouName;
    param.isOnlyMOU = "Y";
    RelationNetworkMOUService.doSearch(param).then(
      function(success){
        $scope.prepareDataTable(success);
        var dataLength = success.length;
        if(dataLength <= 5){
          $('#modal-add-edit-activity-exchange-information').attr("style","display: block; margin-top: -350px;");
        }else if(dataLength > 5 && dataLength < 10){
          $('#modal-add-edit-activity-exchange-information').attr("style","display: block; margin-top: -400px;");
        }else if(dataLength >= 10){
            $('#modal-add-edit-activity-exchange-information').attr("style","display: block; margin-top: -470px;");
        }
      }
    );
  }

	$scope.prepareDataTable = function(result){
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


	$scope.initEditInformation = function(){
		var action = $stateParams.action;
		var networkMouId = $stateParams.networkMouId;
		if(action == "" && networkMouId == ""){
			$state.go("site.relation-network-mou");
		}
		if(action == "A"){
			if(null != $rootScope.networkMou || !angular.isUndefined($rootScope.networkMou)){
					$rootScope.networkMou = "";
			}
		}
		if(action == "E"){
			if(!angular.isUndefined(networkMouId) && networkMouId != null && networkMouId != ""){
				RelationNetworkMOUInformationService.doSearch(networkMouId).then(
					function(success){
						$rootScope.networkMou = success;
						$scope.NetworkMouFormBean = success;
						if(success.totalQuota <= 0){
							$scope.NetworkMouFormBean.totalQuota = "";
						}
						if(success.yearlyRenew <= 0){
							$scope.NetworkMouFormBean.yearlyRenew = "";
						}
						$scope.NetworkMouFormBean.signDate = success.signDateStr;
						$scope.NetworkMouFormBean.startDate = success.startDateStr;
						$scope.NetworkMouFormBean.expireDate = success.expireDateStr;

						angular.forEach(success.networkMouAgreementTypes,function(agreementType,id){
							var selectedAgreementTypeId = agreementType.chulaMsAgreementType.agreementTypeId;
              $scope.checkedBox.push(selectedAgreementTypeId);
							angular.forEach($scope.masterAgreementTypes,function(master,id){
								if(master.agreementTypeId == selectedAgreementTypeId){
									 $scope.masterAgreementTypes[id].selected = true;
								}
							});
            });
						if(null != success.networkMouRelated && !angular.isUndefined(success.networkMouRelated)){
							$scope.NetworkMouFormBean.networkMouRelatedId = success.networkMouRelated.networkMouId;
							$scope.networkMouRelatedName = success.networkMouRelated.networkMouName;
						}
						delete $scope.NetworkMouFormBean.networkMouAgreementTypes;
						delete $scope.NetworkMouFormBean.networkMouRelated;
					}
				);
				RelationNetworkMOUInstitutionService.doSearch(networkMouId).then(
		      function(success){
						$rootScope.networkMouInstitution = success;
		      }
		    );
			}
		}
	}

	$scope.initPage();
	$scope.initEditInformation();

	$scope.initialCheckBox = function(id){
			var result = false;
			angular.forEach($scope.checkedBox,function(checked){
					if(checked === id){
							result = true;
							return;
					}
			});
			return result;
	}

	$scope.resetPage = function(){
		$scope.NetworkMouFormBean.networkMouId = "";
		$scope.NetworkMouFormBean.networkMouType = "";
		$scope.NetworkMouFormBean.networkMouName = "";
		$scope.NetworkMouFormBean.networkMouRelatedId = "";
		$scope.NetworkMouFormBean.networkMouRelatedName = "";
		$scope.NetworkMouFormBean.networkMouWeight = "";
		$scope.NetworkMouFormBean.levelOfCooperation = "";
		$scope.NetworkMouFormBean.totalQuota = "";
		$scope.NetworkMouFormBean.signDate = "";
		$scope.NetworkMouFormBean.startDate = "";
		$scope.NetworkMouFormBean.expireDate = "";
		$scope.NetworkMouFormBean.yearlyRenew = "";
		$scope.NetworkMouFormBean.isNeverExpire = "";
		$scope.NetworkMouFormBean.description = "";
	}

	$scope.doSaveInformation = function(){
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
					var param = $scope.NetworkMouFormBean;
					var chulaMsAgreementTypes = [];
					angular.forEach($scope.masterAgreementTypes, function(agreementType){
						if(agreementType.selected){
							chulaMsAgreementTypes.push({
								agreementTypeId : agreementType.agreementTypeId
							});
						}
					});
					param.chulaMsAgreementTypes = chulaMsAgreementTypes;
					console.log(param);
					RelationNetworkMOUInformationService.doSave(param).then(
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
								// localStorageService.set('networkMou',success);
								$rootScope.networkMou = success;
								$state.go('site.relation-add-edit-network-mou-main.information',{networkMouId:success.networkMouId, action:"E"},{reload:true});
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
});
