'use strict';

oiaApplication.controller('ActivityExchangePersonController',function($rootScope,$state,$scope,$location, $cookies, localStorageService,$filter,ngTableParams,
                                                                           ActivityExchangePersonService,MasterPrefixService, MasterInstitutionService,
                                                                           MasterFacultyService,MasterEducationDegreeService){

  $scope.masterPrefixs = {};
  $scope.masterInstitutions = {};
  $scope.masterFaculties = {};
  $scope.masterEducationDegrees = {};
  $scope.ActivityExchangePersonFormBean = {};

  var activityExchangeId = $rootScope.activityExchangeId;

  if(angular.isUndefined(activityExchangeId) || activityExchangeId == "" || null == activityExchangeId){
		$state.go('site.activity-exchange-main',{},{reload:true});
		return false;
	}

  $scope.initModal = function(){
    $scope.ActivityExchangePersonFormBean = {};
    $scope.ActivityExchangePersonFormBean.activityExchangeId = activityExchangeId;
  }

  $scope.doSearchAllActivityExchangePerson = function(){
    ActivityExchangePersonService.doSearchAllPerson(activityExchangeId).then(
      function(success){
        var result = success;
        $scope.ActivityExchangePersonTable = new ngTableParams({
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

  $scope.initEditActivityExchangePerson = function(activityExchangePersonId){
    ActivityExchangePersonService.doSearchPerson(activityExchangePersonId).then(
      function(success){
        console.log(success);
        $scope.ActivityExchangePersonFormBean.activityExchangeId = activityExchangeId;
        $scope.ActivityExchangePersonFormBean.activityExchangePersonId = success.activityExchangePersonId;
        $scope.ActivityExchangePersonFormBean.prefixId = success.chulaMsPrefix.prefixId;
        $scope.ActivityExchangePersonFormBean.firstName = success.firstName;
        $scope.ActivityExchangePersonFormBean.lastName = success.lastName;
        $scope.ActivityExchangePersonFormBean.identificationNo = success.identityNo;
        $scope.ActivityExchangePersonFormBean.passportNo = success.passportVisa;
        $scope.ActivityExchangePersonFormBean.nationality = success.nationality;
        $scope.ActivityExchangePersonFormBean.birthDate = success.birthDateStr;
        $scope.ActivityExchangePersonFormBean.institutionId = success.chulaMsInstitution.institutionId;
        if(null == success.chulaMsFaculty){
          $scope.ActivityExchangePersonFormBean.facultyName = success.facultyName;
        }else{
          $scope.ActivityExchangePersonFormBean.facultyId = success.chulaMsFaculty.facultyId;
        }
        $scope.ActivityExchangePersonFormBean.educationDegree = success.educationDegree;
        $scope.ActivityExchangePersonFormBean.address1 = success.address1;
        $scope.ActivityExchangePersonFormBean.address2 = success.address2;
        $scope.ActivityExchangePersonFormBean.phoneNumber = success.phoneNumber;
        $scope.ActivityExchangePersonFormBean.email = success.email;
        $scope.ActivityExchangePersonFormBean.emergencyContactPersonName = success.emergencyContactPersonName;
        $scope.ActivityExchangePersonFormBean.emergencyContactPersonPhone = success.emergencyContactPersonPhone;

        $("#modal-person").modal('toggle');
      }
    );
  }

  $scope.changeFaculty = function(institutionId){
    angular.forEach($scope.masterInstitutions,function(institution){
      if(institution.institutionId === institutionId){

        if(institution.institutionName.indexOf("Chula") !== -1){
        // if(institution.institutionName === 'Chula'){
          $("#not-chula").attr("style","display:none");
          $("#chula").attr("style","display:block");
        }else{
          $("#not-chula").attr("style","display:block");
          $("#chula").attr("style","display:none");
        }
      }
    });
  }

  $scope.doSavePerson = function(){
    $scope.ActivityExchangePersonFormBean.activityExchangeId = $rootScope.activityExchangeId;
    console.log($scope.ActivityExchangePersonFormBean);
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
          ActivityExchangePersonService.doSave($scope.ActivityExchangePersonFormBean).then(
            function(success){
              swal({
									title: "Save success",
									text: "",
									type: "success",
									showCancelButton: false,
									confirmButtonText: "OK",
									closeOnConfirm: true
							},function(isConfirm){
                $scope.doSearchAllActivityExchangePerson();
                $('#modal-person').modal('toggle');
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

    //---- load MasterPrefix
    var paramPrefix = {};
    paramPrefix.prefixName = "ALL";
    MasterPrefixService.doSearch(paramPrefix).then(
      function(success){
        $scope.masterPrefixs = success;
      }
    );

    //---- load MasterInstitution
    var paramInstitution = {};
		paramInstitution.countryId = 0;
		paramInstitution.institutionName = 'ALL';
		MasterInstitutionService.doSearch(paramInstitution).then(
			function(success){
				$scope.masterInstitutions = success;
			}
		);

    //---- load MasterFaculty
    var paramFaculty = {};
		paramFaculty.institutionId = 0;
		paramFaculty.facultyName = 'ALL';
		MasterFacultyService.doSearch(paramFaculty).then(
			function(success){
				$scope.masterFaculties = success;
			}
		);

    //----- load MasterEducationDegree
    MasterEducationDegreeService.getEducationDegree().then(
			function(success){
				$scope.masterEducationDegrees = success;
			}
		);

    $scope.doSearchAllActivityExchangePerson();
  }

  $scope.initPage();

});
