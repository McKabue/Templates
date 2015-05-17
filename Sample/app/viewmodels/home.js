
define(['durandal/app'],
    function (app) {


    return {
        name: ko.observable(),
        sayHello: function () {
            app.showMessage('Hello ' + this.name() + '! Nice to meet you.', 'Greetings');
        },
		compositionComplete: function () {
                //alert("home compositionComplete");
                $('.carousel').carousel({ interval: 20000, cycle: true });
            }
    };
    /*
    function test() {
        self = this;
        self.name = ko.observable();

        self.sayHello = function () {
            app.showMessage('Hello ' + this.name() + '! Nice to meet you.', 'Greetings');
        }
    }
    return test;

    var test = function() {
        self = this;
        self.name = ko.observable();

        self.sayHello = function () {
            app.showMessage('Hello ' + this.name() + '! Nice to meet you.', 'Greetings');
        }
    }
    return test;


    return {
        name: ko.observable(),
        sayHello: function () {
            app.showMessage('Hello ' + this.name() + '! Nice to meet you.', 'Greetings');
        }
    };
    */
});