'use strict';

oiaApplication.controller('ActivityExchangeInformationController',function($rootScope,$state,$scope,$location, $cookies, $stateParams,localStorageService,$filter,ngTableParams,
                                                                           ActivityExchangeInformationService,MasterAgreementTypeService,RelationNetworkMOUService,
                                                                           MasterInstitutionService){

  $scope.masterPersonTypes = {};
  $scope.masterAgreementTypes = {};
  $scope.ActivityExchangeInformationFormBean = {};
  $scope.masterInstitutions = {};

  

  $scope.resetModal = function(){
    $scope.networkMouName = "";
    $scope.prepareDataTable("");
  }


  $scope.doSaveInformation = function(){
    console.log($scope.ActivityExchangeInformationFormBean);
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
          ActivityExchangeInformationService.doSave($scope.ActivityExchangeInformationFormBean).then(
            function(success){
              swal({
									title: "Save success",
									text: "",
									type: "success",
									showCancelButton: false,
									confirmButtonText: "OK",
									closeOnConfirm: true
							},function(isConfirm){
                $rootScope.activityExchangeId = success.activityExchangeId;
                $state.go('site.activity-exchange-add-edit.information',{activityExchangeId:success.activityExchangeId, action:"E"},{reload:true})
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

  $scope.selectedMOU = function(mou){
    console.log(mou);
    $scope.networkMouRelatedName = mou.networkMouName;
    $scope.ActivityExchangeInformationFormBean.networkMouId = mou.networkMouId;
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

  $scope.initPage = function(){
    ActivityExchangeInformationService.getPersonType().then(
      function(success){
        $scope.masterPersonTypes = success;
      }
    );


    //---- load MasterAgreementType
    var param = {};
		param.agreementTypeName = "ALL";
		MasterAgreementTypeService.doSearch(param).then(
			function(success){
				$scope.masterAgreementTypes = success;
				// console.log($scope.masterAgreementTypes);
			}
		);

    param = {};
    //---- load MasterInstitution
    param.countryId = "0";
    param.institutionName = "ALL";
    MasterInstitutionService.doSearch(param).then(
      function(success){
        $scope.masterInstitutions = success;
      }
    );

  }

  $scope.initEditActivityExchange = function(){
    var action = $stateParams.action;
		var activityExchangeId = $stateParams.activityExchangeId;
    console.log("action: "+action +" activityExchangeId: "+activityExchangeId);
    if(action == "" && activityExchangeId == ""){
			$state.go("site.activity-exchange-main");
		}
		if(action == "E"){
      if(!angular.isUndefined(activityExchangeId) && activityExchangeId != null && activityExchangeId != ""){
        ActivityExchangeInformationService.doSearch(activityExchangeId).then(
          function(success){
            console.log(success);
            $rootScope.activityExchangeId = success.activityExchangeId;
            $scope.ActivityExchangeInformationFormBean.activityExchangeId = success.activityExchangeId;
            $scope.ActivityExchangeInformationFormBean.activityName = success.activityName;
            $scope.ActivityExchangeInformationFormBean.inboundOutbound = success.inboundOutbound;
            $scope.ActivityExchangeInformationFormBean.remark = success.remark;
            $scope.ActivityExchangeInformationFormBean.totalPerson = success.totalPerson;
            $scope.ActivityExchangeInformationFormBean.personType = success.personType;
            $scope.ActivityExchangeInformationFormBean.startDate = success.startDateStr;
						$scope.ActivityExchangeInformationFormBean.endDate = success.endDateStr;
            $scope.ActivityExchangeInformationFormBean.agreementTypeId = success.chulaMsAgreementType.agreementTypeId;
            $scope.ActivityExchangeInformationFormBean.institutionId = (null != success.chulaMsInstitution)?success.chulaMsInstitution.institutionId:"";
            $scope.ActivityExchangeInformationFormBean.networkMouId = success.chulaTrNetworkMou.networkMouId;
            $scope.networkMouRelatedName = success.chulaTrNetworkMou.networkMouName;
          }
        );
      }
    }
  }

  $scope.initPage();
  $scope.initEditActivityExchange ();

});
