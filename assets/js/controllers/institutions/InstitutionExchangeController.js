'use strict';

oiaApplication.controller('InstitutionExchangeController',function($rootScope,$state,$scope,$location, $cookies, localStorageService,$filter,ngTableParams,
                                                                   MasterPersonService, MasterFacultyService, MasterEducationDegreeService, MasterLinkageService,
                                                                   MasterInteractionService,InstitutionExchangeService){

  $scope.masterPersonTypes = {};
  $scope.masterFaculties = {};
  $scope.masterEducationDegrees = {};
  $scope.masterInteraction = {};
  $scope.masterLinkages = {};
  $scope.institutionExchangeFormBean = {};

  $scope.institutionExchangeDatas = {};

  $scope.resetModal = function(){
    $scope.institutionExchangeFormBean = {};
  }

  $scope.doSearchExchange = function(){
    if(null != localStorageService.get('institutionId')){
      const institutionId = localStorageService.get('institutionId');
      InstitutionExchangeService.doSearch(institutionId).then(
        function(success){
          console.log(success);
          $scope.institutionExchangeDatas = success;
        }
      );
    }
  }

  $scope.initEditInstitutionExchange = function(id){
    InstitutionExchangeService.initEdit(id).then(
      function(success){
        console.log(success);
        $scope.institutionExchangeFormBean.institutionExchangeId = success.institutionExchangeId.toString();
        $scope.institutionExchangeFormBean.exchangePersonType = success.exchangePersonType;
        $scope.institutionExchangeFormBean.startDate = success.exchangeStartDateFormatted;
        $scope.institutionExchangeFormBean.endDate = success.exchangeEndDateFormatted;
        $scope.institutionExchangeFormBean.exchangeName = success.fullName;
        $scope.institutionExchangeFormBean.facultyId = success.chulaMsFaculty.facultyId;
        $scope.institutionExchangeFormBean.exchangeProgram = success.exchangeProgram;
        $scope.institutionExchangeFormBean.educationDegree = success.degree;
        $scope.institutionExchangeFormBean.institutionActivityId = success.chulaTrInstitutionActivity.institutionActivityId.toString();
        $scope.institutionExchangeFormBean.interaction = success.interaction;
        $scope.institutionExchangeFormBean.note = success.exchangeNote;
        $("#modal-exchange").modal('toggle');
      }
    );
  }

  $scope.doSaveExchange = function(){
    console.log($scope.institutionBean);
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
          const institutionId = localStorageService.get('institutionId').toString();
          $scope.institutionExchangeFormBean.institutionId = institutionId;
          $scope.institutionExchangeFormBean.facultyId = $scope.institutionExchangeFormBean.facultyId.toString();
          InstitutionExchangeService.doSave($scope.institutionExchangeFormBean).then(
            function(success){
              swal({
									title: "Save success",
									text: "",
									type: "success",
									showCancelButton: false,
									confirmButtonText: "OK",
									closeOnConfirm: true
							},function(isConfirm){
                $('#modal-exchange').modal('toggle');
                $scope.doSearchExchange();
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

  $scope.doDelete = function(){
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
        InstitutionExchangeService.doDelete($scope.institutionExchangeFormBean.institutionExchangeId.toString()).then(
          function(success){
            swal({
                title: "Save success",
                text: "",
                type: "success",
                showCancelButton: false,
                confirmButtonText: "OK",
                closeOnConfirm: true
            },function(isConfirm){
              $scope.doSearchExchange();
              $('#modal-exchange').modal('toggle');
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

    let param = {};
    //---- prepare person type
    MasterPersonService.getPersonType().then(
      function(success){
        $scope.masterPersonTypes = success.data;
      }
    );
    
    //---- prepare faculty
    param.facultyName = "ALL";
    MasterFacultyService.doSearchChulaFaculty(param).then(
      function(success){
        $scope.masterFaculties = success;
      }
    );
    
    //---- prepare education degree
    param = {};
    MasterEducationDegreeService.getEducationDegree().then(
      function(success){
        $scope.masterEducationDegrees = success;
      }
    );

    //---- prepare inbound outbound
    param = {};
    MasterInteractionService.getInteraction().then(
      function(success){
        $scope.masterInteraction = success;
      }
    );

    //---- prepare linkage
    const institutionId = localStorageService.get('institutionId');
    MasterLinkageService.getLinkage(institutionId).then(
      function(success){
        $scope.masterLinkages = success;
      }
    );
  }

  $scope.initPage();
  $scope.doSearchExchange();

});
