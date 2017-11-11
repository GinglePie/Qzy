'use strict';

oiaApplication.controller('Rpt002Controller', function($rootScope, $state, $scope, $location, $cookies, localStorageService, $filter, ngTableParams,
  MasterInstitutionService, MasterCountryService, RptService) {


  $scope.masterInstitutions = {};
  $scope.masterCountries = {};

  $scope.initPage = function() {

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

  $scope.doSearch = function() {
    var param = {};
    param.institutionId = $scope.institutionId;
    param.countryId = $scope.countryId;

    RptService.doPostSearch('rpt002',param).then(
      function(success){
        var result = success;
        // console.log(result);
        $scope.rpt002Table = new ngTableParams({
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

});
