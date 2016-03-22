(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
//Objects

'use strict';
//EC5

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _person2, _obj, _obj2;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function createPerson(name, age) {
	return {
		name: name,
		age: age
	};
}

//EC6
function createPerson1(name, age) {
	return {
		name: name,
		age: age
	};
}

//EC5
var person = {
	name: 'Todor',
	sayName: function sayName() {
		console.log(this.name);
	}
};

//EC6
var person1 = {
	name: 'Todor',
	sayName: function sayName() {
		console.log(this.name);
	}
};

//EC5
var person2 = {},
    lastName = 'last name';
person2['first name'] = 'Todor';
person2[lastName] = 'Krastev';
console.log(person2['first name']);
console.log(person2[lastName]);
console.log('*'.repeat(15));

var person3 = {
	'first name': 'Todor'
};
console.log(person3['first name']);
console.log('*'.repeat(15));

//EC6
var lastName1 = 'last name';
var person4 = _defineProperty({
	'first name': 'Todor'
}, lastName, 'Krastev');
console.log(person4['first name']);
console.log(person4[lastName1]);

console.log('*'.repeat(15));

var suffix = ' name';
var person5 = (_person2 = {}, _defineProperty(_person2, 'first' + suffix, 'Todor'), _defineProperty(_person2, 'last' + suffix, 'Krastev'), _person2);
console.log(person5['first name']);
console.log(person5['last name']);

console.log('*'.repeat(10));

//metod Object.is()
console.log(+0 == -0);
console.log(+0 === -0);
console.log(Object.is(+0, -0));

console.log('*'.repeat(10));

console.log(NaN == NaN);
console.log(NaN === NaN);
console.log(Object.is(NaN, NaN));

console.log('*'.repeat(10));

console.log(5 == 5);
console.log(5 == '5');
console.log(5 === 5);
console.log(5 === '5');

console.log('*'.repeat(10));

console.log(Object.is(5, 5));
console.log(Object.is(5, '5'));

console.log('*'.repeat(10));

//metod Object.assing()

//mixin()  EC5
function mixin(receiver, supplier) {
	Object.keys(supplier).forEach(function (key) {
		receiver[key] = supplier[key];
	});
	return receiver;
}

function EventTarget() {
	/*...*/
}

EventTarget.prototype = {
	constructor: EventTarget,
	emit: function emit() {
		/*...*/
	},
	on: function on() {
		/*...*/
	}
};

var myObject = {};
mixin(myObject, EventTarget.prototype);
myObject.emit('somethingChanged');

//Object.assign() EC6

EventTarget.prototype = {
	constructor: EventTarget,
	emit: function emit() {
		/*...*/
	},
	on: function on() {
		/*...*/
	}
};

var myObject = {};
Object.assign(myObject, EventTarget.prototype);
myObject.emit('somethingChanged');

var receiver = {};
Object.assign(receiver, {
	type: 'js',
	name: 'file.js'
}, {
	type: 'css'
});
console.log(receiver.type);
console.log(receiver.name);

console.log('*'.repeat(10));

//Object.assing with accessor, не създава accessor севойства
var receiver = {},
    supplier = {
	get name() {
		return "file.js";
	}
};
Object.assign(receiver, supplier);
var descriptor = Object.getOwnPropertyDescriptor(receiver, "name");
console.log(descriptor.value); // "file.js"
console.log(descriptor.get); // undefined	

console.log('*'.repeat(10));

//Дублиране на свойства в обекта

"use strict";
var person = _defineProperty({
	name: "Nicholas"
}, 'name', "Greg"); //no error in ES6
// syntax error in ES5 strict mode
console.log(person.name); //Greg

console.log('*'.repeat(10));

//Object.setPrototypeOf()  and  Object.getPrototypeOf()
//Super

var persons = {
	getGreeting: function getGreeting() {
		return "Hello";
	}
};
var dog = {
	getGreeting: function getGreeting() {
		return "Woof";
	}
};
var friend = {
	getGreeting: function getGreeting() {
		return Object.getPrototypeOf(this).getGreeting.call(this) + ", hi!";
	}
};
// определя прототипа на person
Object.setPrototypeOf(friend, persons);
console.log(friend.getGreeting()); // "Hello, hi!"
console.log(Object.getPrototypeOf(friend) === persons); // true
// определя прототипа на dog
Object.setPrototypeOf(friend, dog);
console.log(friend.getGreeting()); // "Woof, hi!"
console.log(Object.getPrototypeOf(friend) === dog); // true

console.log('&'.repeat(10));

//ES6
var friend1 = _obj = {
	getGreeting: function getGreeting() {
		return _get(Object.getPrototypeOf(_obj), 'getGreeting', this).call(this) + ' hi!';
	}
};
/*
let friend = {
    getGreeting: function() {
        return super.getGreeting() + ", hi!";
    }
};
friend.getGreeting();       // throws error!
*/
// в предишния пример, this е също както:
// Object.getPrototypeOf(this).getGreeting.call(this)
Object.setPrototypeOf(friend1, persons);
console.log(friend.getGreeting()); // "Hello, hi!"
console.log(Object.getPrototypeOf(friend1) === persons); // true
// определя прототипа на dog
Object.setPrototypeOf(friend1, dog);
console.log(friend.getGreeting()); // "Woof, hi!"
console.log(Object.getPrototypeOf(friend1) === dog);

console.log('*'.repeat(20));

var person7 = {
	getGreeting: function getGreeting() {
		return 'Hello';
	}
};
var friend2 = {
	getGreeting: function getGreeting() {
		return Object.getPrototypeOf(this).getGreeting.call(this) + ', hi';
	}
};
Object.setPrototypeOf(friend2, person7);
var relative = Object.create(friend2);

console.log(person7.getGreeting()); //Hello
console.log(friend2.getGreeting()); //Hello, hi
//console.log(relative.getGreeting()); //error

console.log('&'.repeat(20));

var person8 = {
	getGreeting: function getGreeting() {
		return 'Hello';
	}
};
var friend3 = _obj2 = {
	getGreeting: function getGreeting() {
		return _get(Object.getPrototypeOf(_obj2), 'getGreeting', this).call(this) + ', hi!';
	}
};
Object.setPrototypeOf(friend3, person8);
var relative1 = Object.create(friend3);

console.log(person7.getGreeting());
console.log(friend3.getGreeting());
console.log(relative1.getGreeting());

},{}]},{},[1]);
