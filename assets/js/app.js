'use strict';

var oiaApplication = angular.module('oiaApplication',[
  'ui.router',
  'angular-loading-bar',
  'ngAnimate',
  'ngTable',
  'ngCacheBuster',
  'LocalStorageModule',
  'ngCookies',
  'naif.base64'
])
.filter('formatDate', function($filter){
    return function(input){
        if(input == null || input == ''){ return ""; }

        var _date = $filter('date')(new Date(input), 'dd/MM/yyyy');

        return _date.toUpperCase();
    };
})
.filter('formatDateTH', function($filter){
    return function(input){
        if(input == null || input == ''){ return ""; }
        var _date = $filter('date')(new Date(input), 'dd/MM/yyyy');
        if(_date == 'Invalid Date'){
            _date = input;
        }
        var arrDate = _date.split("/");
        var dd = arrDate[0];
        var mm = arrDate[1];
        var yyyy = arrDate[2];
        var iYear = parseFloat(yyyy);
        if(iYear <= 2500){
            iYear = iYear + 543;
        }
        return dd+"/"+mm+"/"+iYear;
    };
})
.filter('formatTime', function($filter){
    return function(input){
        if(input == null || input == ''){ return ""; }

        var _date = $filter('date')(new Date(input), 'HH:mm:ss');

        return _date.toUpperCase();
    };
});
