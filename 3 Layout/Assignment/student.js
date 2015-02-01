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

//construct an Item

var Item = function(surName, firstName, lastName, selectedOptionClass) {
    this.surName = ko.protectedObservable(surName);
    this.surName.focused = ko.observable();
    this.firstName = ko.protectedObservable(firstName);
	this.lastName = ko.protectedObservable(lastName);
	this.selectedOptionClass = ko.protectedObservable(selectedOptionClass);
}

var ViewModel = function(items) {
    var self = this;
    
    this.items = ko.observableArray(items);
   
    this.selectedItem = ko.observable();

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
		self.selectedItem().lastName.commit();
		self.selectedItem().selectedOptionClass.commit();
        self.selectedItem(null);
    };

    this.cancelItemEdit = function() {
        self.selectedItem().surName.reset();
        self.selectedItem().firstName.reset();
		self.selectedItem().lastName.reset();
		self.selectedItem().selectedOptionClass.reset();
        self.selectedItem(null);
    };

    this.templateToUse = function(item) {
        return self.selectedItem() === item ? "editTmpl" : "itemTmpl";
    };
};
    
ko.applyBindings(new ViewModel([
    new Item("tylor", "sushi", "rebecca", 1),
    new Item("kabue", "lee", "mathews", 3),
    new Item("jackson", "charles", "mark", 4),
	new Item("tylor", "sushi", "rebecca", 1),
    new Item("kabue", "lee", "mathews", 3),
    new Item("jackson", "charles", "mark", 4),
	new Item("tylor", "sushi", "rebecca", 1),
    new Item("kabue", "lee", "mathews", 3),
    new Item("jackson", "charles", "mark", 4)
    ]));