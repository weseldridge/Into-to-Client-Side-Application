'use strict';

angular.module('myAppApp', [
  'ngResource',
  'ngRoute',
  'companyServices'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/company', {
        templateUrl: 'views/company.html',
        controller: 'CompanyCtrl'
      })
      .when('/company/:id', {
        templateUrl: 'views/thiscompany.html',
        controller: 'ThisCompanyCtrl'
      })
      .when('/chart', {
        templateUrl: 'views/chart1.html',
        controller: 'ChartCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
