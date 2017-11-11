'use strict';

oiaApplication.controller('RelationNetworkMOUFacultyController',function($rootScope,$state,$stateParams,$scope,$location, $cookies,$compile, localStorageService,ngTableParams,$filter,
																																				 RelationNetworkMOUFacultyService, MasterCountryService, MasterInstitutionService,
																																				 MasterFacultyService){


	$scope.institutions = [];
	$scope.networkMouFaculties = [];
	$scope.networkMouInstitutions = [];
	$scope.totalInstitutions = 0;
	$scope.NetworkMouFacultyFormBean = {};


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

	$scope.doSaveFaculty = function(){
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
					$scope.NetworkMouFacultyFormBean.networkMouId = networkMou.networkMouId;
					RelationNetworkMOUFacultyService.doSave($scope.NetworkMouFacultyFormBean).then(
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
								$state.go('site.relation-add-edit-network-mou-main.information',{},{reload:true})
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

	$scope.appendFaculty = function(institution){
		var templateClassName = "#"+institution+"-template";
		var parentClassName = "#"+institution;

		var template = $(templateClassName).find('.row-template').clone(true);
		var parent = $(parentClassName);
		template.attr("class","row row-cnt");
		var totalRowInstitution = $scope.totalInstitutions;
		// console.log("totalRowInstitution: "+totalRowInstitution);
		var totalRowFaculty = parent.parent().find('.row-cnt').length;
		if(institution === 'chula'){
			template.find('#facultyElem').attr("ng-model","NetworkMouFacultyFormBean.networkMouChula.networkMouFaculties["+totalRowFaculty+"].facultyId").addClass("edited ng-touched");
			template.find('#quotaElem').attr("ng-model","NetworkMouFacultyFormBean.networkMouChula.networkMouFaculties["+totalRowFaculty+"].quota").addClass("edited ng-touched");
		}else{
			var idxInstitution = parent.parent().parent().parent().parent().attr('id').replace("institution-","");
			// console.log(idxInstitution);
			template.find('#facultyElem').attr("ng-model","NetworkMouFacultyFormBean.networkMouInstitutions["+idxInstitution+"].networkMouFaculties["+totalRowFaculty+"].facultyName").addClass("edited ng-touched");
			template.find('#quotaElem').attr("ng-model","NetworkMouFacultyFormBean.networkMouInstitutions["+idxInstitution+"].networkMouFaculties["+totalRowFaculty+"].quota").addClass("edited ng-touched");
		}
		$compile(template)($scope);
		parent.parent().append(template);

	}

	$scope.setRemoveRow = function(){
		$('.delRow').click(function(){
        var selectedRow = $(this).parent().parent().parent().parent();
				selectedRow.remove();
    });
	}

	$scope.initPage = function(){

		//----- retreive list institutionId
		$scope.institutions = $rootScope.networkMouInstitution;
		$scope.totalInstitutions = angular.isUndefined($scope.institutions)?0:$scope.institutions.length;
		//----- load chula faculty
		var param = {};
		param.institutionId = 0;
		param.facultyName = 'ALL';
		MasterFacultyService.doSearch(param).then(
			function(success){
				$scope.faculties = success;
				$scope.setRemoveRow();
			}
		);
	}

	$scope.initEditFaculty = function(){
		//----- load NetworkMouFaculty from networkMouId each institutionId
		var networkMouId = networkMou.networkMouId;
		RelationNetworkMOUFacultyService.doSearch(networkMouId).then(
			function(success){
				// console.log(success);
				$scope.NetworkMouFacultyFormBean.networkMouChula = {};
				angular.forEach(success.networkMouChula,function(facultyChula){
					var i = 1;
					$scope.NetworkMouFacultyFormBean.networkMouChula.networkMouFaculties = [];
					angular.forEach(facultyChula.networkMouFaculties,function(fac,id){
						if(facultyChula.networkMouFaculties.length > 1 && i > 1){
							$scope.appendFaculty("chula");
						}
						// console.log(fac);
						if(fac.quota === 0) {fac.quota = "";}
						$scope.NetworkMouFacultyFormBean.networkMouChula.networkMouFaculties.push(fac);
						i++;
					});
				});

				$scope.NetworkMouFacultyFormBean.networkMouInstitutions = [];
				$scope.networkMouFaculties = {};
				angular.forEach(success.networkMouInstitutions, function(networkIns,id){
					angular.forEach($scope.institutions,function(institution){
							// console.log(networkIns);
							if(networkIns.institutionId == institution.chulaMsInstitution.institutionId){
								var i = 1;
								$scope.NetworkMouFacultyFormBean.networkMouInstitutions.push(networkIns);
								$scope.networkMouFaculties[$scope.NetworkMouFacultyFormBean.networkMouInstitutions] = [];
								angular.forEach(networkIns.networkMouFaculties,function(fac,idx){
									if(networkIns.networkMouFaculties.length > 1 && i > 1){
										$scope.appendFaculty(networkIns.institutionId);
									}
									if(fac.quota === 0) {fac.quota = "";}
									$scope.networkMouFaculties[$scope.NetworkMouFacultyFormBean.networkMouInstitutions].push(fac);
									i++;
								});
							}
					});
				});
			}
		);
	}

	$scope.initPage();
	$scope.initEditFaculty();
});
