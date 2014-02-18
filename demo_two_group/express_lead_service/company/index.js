var Company = function() {
	this.data = {
		id: null,
		name: null,
		address: null,
		city: null,
		zip: null,
		state: null,
		phone: null,
		url: null,
		likes: null
	};

	this.fill = function(info) {
		for(var prop in this.data){
			if(this.data[prop] !== 'undefined') {
				this.data[prop] = info[prop];
			}
		}
	};

	this.getInformation = function(){
		return this.data;
	};
};

module.exports = function(info) {
	var instance = new Company();

	instance.fill(info);

	return instance;
}