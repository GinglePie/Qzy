'use strict';

oiaApplication.controller('Rpt003Controller', function($rootScope, $state, $scope, $location, $cookies, localStorageService, $filter, ngTableParams,
  MasterInstitutionService, MasterCountryService, RptService) {


  $scope.doSearch = function() {
    var param = $scope.fiscalYear;
    if(angular.isUndefined(param) || param == ""){
      param = "0";
    }
    RptService.doGetSearch('rpt003',param).then(
      function(success){
        var result = success;
        // console.log(result);
        $scope.rpt003Table = new ngTableParams({
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
