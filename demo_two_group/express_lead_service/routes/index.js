
/*
 * GET home page.
 */

var companys = require('../data');
var company = require('../company');

for(var id in companys){
	companys[id] = company(companys[id]);
}

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};


exports.list = function(req, res) {
	var companyData = [];
	for(var id in companys){
		companyData.push(companys[id].getInformation());
	}
	res.json(companyData);
};

exports.company = function(req, res) {
	var id = req.param('id');

	if(typeof companys[id] == 'undefinded') {
		res.status(404).json({status: 'error: not found'});
	} else {
		res.json(companys[id].getInformation());
	}
};
