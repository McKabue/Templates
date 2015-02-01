//wrapper for an observable that protects value until committed
ko.protectedObservable = function(initialValue) {
    //private variables
    var _temp = initialValue;
    var _actual = ko.observable(initialValue);

    var result = ko.dependentObservable({
        read: _actual,
        write: function(newValue) {
            _temp = newValue;
        }
    });
    
    //commit the temporary value to our observable, if it is different
    result.commit = function() {
        if (_temp !== _actual()) {
            _actual(_temp);
        }
    };

    //notify subscribers to update their value with the original
    result.reset = function() {
        _actual.valueHasMutated();
        _temp = _actual();
    };

    return result;
};

var classFilterOptions = ["Show All", 8, 7, 6, 5, 4, 3, 2, 1, "Nursery"];
var genderFilterOptions = ["Show All","Female", "Male"];
var grammarFilterOptions = ["Show All", "Top 10", "Above Half", "Last 10"];
var compoFilterOptions = ["Show All", "Top 10", "Above Half", "Last 10"];
var lughaFilterOptions = ["Show All", "Top 10", "Above Half", "Last 10"];
var inshaFilterOptions = ["Show All", "Top 10", "Above Half", "Last 10"];
var mathFilterOptions = ["Show All", "Top 10", "Above Half", "Last 10"];
var scieFilterOptions = ["Show All", "Top 10", "Above Half", "Last 10"];
var socialFilterOptions = ["Show All", "Top 10", "Above Half", "Last 10"];
var creFilterOptions = ["Show All", "Top 10", "Above Half", "Last 10"];
var totalFilterOptions = ["Show All", "Top 10", "Above Half", "Last 10"];
var rankFilterOptions = ["Show All", "Top 10", "Above Half", "Last 10"];

//construct an Item

var Item = function(surName, firstName, grammar, compo, lugha, insha, math, scie, social, cre, selectedClass, selectedGender, classOptions, genderOptions) {
    this.surName = ko.protectedObservable(surName);
    this.surName.focused = ko.observable();
    this.firstName = ko.protectedObservable(firstName);
	this.grammar = ko.protectedObservable(grammar);
	this.compo = ko.protectedObservable(compo);
	this.lugha = ko.protectedObservable(lugha);
	this.insha = ko.protectedObservable(insha);
	this.math = ko.protectedObservable(math);
	this.scie = ko.protectedObservable(scie);
	this.social = ko.protectedObservable(social);
	this.cre = ko.protectedObservable(cre);
	this.classOptions = [8, 7, 6, 5, 4, 3, 2, 1, "Nursery"];
	this.selectedClass = ko.protectedObservable(selectedClass);
	this.genderOptions = ["Female", "Male"];
	this.selectedGender = ko.protectedObservable(selectedGender);
	
	this.totalMarks = ko.computed(function() {return Number(this.grammar()) + Number(this.compo()) + Number(this.lugha()) + Number(this.insha()) + Number(this.math()) + Number(this.scie()) + Number(this.social()) + Number(this.cre())}, this);
	
	////////////////////////////////////////////////////////////
	
}

var ViewModel = function(items){
    var self = this;
    this.items = ko.observableArray(items);
    this.selectedItem = ko.observable();
	/////////////////////////////////////////////////////////////////////

	
	
	////////////////////////////////////////////////////////////////////
    this.addItem = function() {
        var newItem = new Item("surname", "first name", "last name", "1");
        self.items.push(newItem);
        self.selectedItem(newItem);
    };

    this.deleteItem = function(itemToDelete) {
        self.items.remove(itemToDelete);
        self.selectedItem(null);
    };

    this.editItem = function(item) {
        self.selectedItem(item);
        item.surName.focused(true);
    };

    this.acceptItemEdit = function() {
        self.selectedItem().surName.commit();
        self.selectedItem().firstName.commit();
		self.selectedItem().grammar.commit();
		self.selectedItem().compo.commit();
		self.selectedItem().lugha.commit();
		self.selectedItem().insha.commit();
		self.selectedItem().math.commit();
		self.selectedItem().scie.commit();
		self.selectedItem().social.commit();
		self.selectedItem().cre.commit();
		self.selectedItem().selectedClass.commit();
		self.selectedItem().selectedGender.commit();
        self.selectedItem(null);
    };

    this.cancelItemEdit = function() {
        self.selectedItem().surName.reset();
        self.selectedItem().firstName.reset();
		self.selectedItem().grammar.reset();
		self.selectedItem().compo.reset();
		self.selectedItem().lugha.reset();
		self.selectedItem().insha.reset();
		self.selectedItem().math.reset();
		self.selectedItem().scie.reset();
		self.selectedItem().social.reset();
		self.selectedItem().cre.reset();
		self.selectedItem().selectedClass.reset();
		self.selectedItem().selectedGender.reset();
        self.selectedItem(null);
    };
	
	//////////////////////////////////////////////////
	
	//////////////////////////////////////////////////////

    this.templateToUse = function(item) {
        return self.selectedItem() === item ? "editTmpl" : "itemTmpl";
    };
};


    
ko.applyBindings(new ViewModel([
    new Item("Tylor", "Sushi", 40, 34, 24, 28, 69, 80, 50, 28, 8, "Female"),
    new Item("Kabue", "lee", 41, 32, 29, 18, 63, 60, 45, 42, 6, "Male"),
    new Item("Jackson", "Charles", 34, 38, 29, 11, 73, 69, 35, 43, 7, "Male"),
	new Item("Kamau", "Saral", 41, 35, 29, 18, 63, 60, 45, 42, 8, "Male"),
    new Item("Victor", "Austin", 47, 32, 27, 18, 63, 60, 45, 42, 4, "Male"),
    new Item("Victoria", "Katherine", 39, 32, 29, 18, 63, 60, 45, 42, 5, "Male"),
	new Item("Abraham", "Boston", 49, 32, 29, 18, 63, 60, 45, 42, 3, "Male"),
    new Item("Frank", "Glee", 45, 32, 29, 18, 63, 60, 45, 42, 2, "Male"),
    new Item("Henly", "Elvis", 42, 42, 30, 19, 53, 60, 45, 42, 1, "Male"),
	new Item("Maina", "Jacob", 41, 32, 29, 18, 63, 60, 45, 42, "Nursery", "Male"),
	new Item("cindy", "sandra", 60, 55, 29, 78, 63, 60, 51, 57, "Nursery", "Female"),
    ]));