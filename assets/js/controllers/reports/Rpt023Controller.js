'use strict';

oiaApplication.controller('Rpt023Controller', function($rootScope, $state, $scope, $location, $cookies, localStorageService, $filter, ngTableParams,
  MasterInstitutionService, MasterCountryService, RptService) {

  $scope.masterInstitutions = {};
  $scope.masterCountries = {};

  $scope.doSearch = function() {
    var param = {};
    console.log($scope.institutionId);
    console.log($scope.countryId);
    if(!angular.isUndefined($scope.institutionId) && $scope.institutionId != "" && null != $scope.institutionId){
      param.institutionId = $scope.institutionId.toString();
    };
    if(!angular.isUndefined($scope.countryId) && $scope.countryId != "" && null != $scope.countryId){
      param.countryId = $scope.countryId.toString();
    }
    RptService.doPostSearch('rpt023', param).then(
      function(success) {
        var result = success;
        // console.log(result);
        $scope.rpt023Table = new ngTableParams({
          page: 1, // show first page
          count: 10, // count per page
        }, {
          total: result.length,
          getData: function($defer, params) {
            var orderedData = params.sorting() ? $filter('orderBy')(result, params.orderBy()) : result;
            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
          }
        });
      }
    );
  }

  $scope.doPrintReport = function(institutionId,institutionName){
    var param = {};
    param.institutionId = institutionId.toString();
    console.log(param);
    var reportName = 'rpt023-'+institutionName+'.docx';
    RptService.doPrintReport('rpt023',reportName,'application/octet-stream',param);
  }

  $scope.initPage = function(){

    var param = {};
    param.regionId = "0";
    param.countryName = "ALL";
    MasterCountryService.doSearch(param).then(
      function(success) {
        $scope.masterCountries = success;
      }
    );

    param = {};
    //---- load MasterInstitution
    param.countryId = "0";
    param.institutionName = "ALL";
    MasterInstitutionService.doSearch(param).then(
      function(success) {
        $scope.masterInstitutions = success;
      }
    );
  }

  $scope.initPage();
});
