'use strict';

angular.module('myAppApp')
  .controller('CompanyCtrl', function ($scope, Company) {
  	$scope.companies = Company.query({});

  })
  .controller('ThisCompanyCtrl', function ($scope, $routeParams, Company) {
  	$scope.company = Company.get({id: $routeParams.id});
  })
.controller('ChartCtrl', function ($scope) {
  	$scope.thisData = [40,100,80,15,25,60,10];
  })






































.directive('donutChart', function() {
  return {
    scope: { 'data': '=' },
    restrict: 'E',
    link: link
  };

  function link(scope, element) {
    // the D3 bits..
    var color = d3.scale.category10();
    var el = element[0];
    var width = el.clientWidth;
    var height = el.clientHeight;
    var min = Math.min(width, height);
    var pie = d3.layout.pie().sort(null);
    var arc = d3.svg.arc()
      .outerRadius(min / 2 * 0.9)
      .innerRadius(min / 2 * 0.5);
    var svg = d3.select(el).append('svg')
      .attr({width: width, height: height})
      .append('g')
        .attr('transform', 'translate(' + width / 4 + ',' + height / 2 + ')');
    
    // add the <path>s for each arc slice
    svg.selectAll('path').data(pie(scope.data))
      .enter().append('path')
        .style('stroke', 'white')
        .attr('d', arc)
        .attr('fill', function(d, i){ return color(i) });
  }
});
 