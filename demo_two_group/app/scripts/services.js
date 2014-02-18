angular.module('companyServices', ['ngResource'])
	.factory('Company', function ($resource) {
		return $resource('http://localhost:4000/company/:id', 
			{id:''},
			{'query' : {method: 'GET', isArray: true}});
	});