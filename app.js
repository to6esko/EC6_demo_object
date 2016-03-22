//Objects

'use strict'
//EC5
function createPerson(name, age) {
	return {
		name: name,
		age: age
	};
}

//EC6
function createPerson1(name, age) {
	return {
		name,
		age
	};
}

//EC5
var person = {
	name: 'Todor',
	sayName: function() {
		console.log(this.name);
	}
};

//EC6
var person1 = {
	name: 'Todor',
	sayName() {
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
var person4 = {
	'first name': 'Todor',
	[lastName]: 'Krastev'
};
console.log(person4['first name']);
console.log(person4[lastName1]);

console.log('*'.repeat(15));

var suffix = ' name';
var person5 = {
	['first' + suffix]: 'Todor', ['last' + suffix]: 'Krastev'
};
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
	Object.keys(supplier).forEach(function(key) {
		receiver[key] = supplier[key];
	});
	return receiver;
}


function EventTarget() {
	/*...*/
}

EventTarget.prototype = {
	constructor: EventTarget,
	emit: function() {
		/*...*/
	},
	on: function() {
		/*...*/
	}
};

var myObject = {};
mixin(myObject, EventTarget.prototype);
myObject.emit('somethingChanged');


//Object.assign() EC6

EventTarget.prototype = {
	constructor: EventTarget,
	emit: function() {
		/*...*/
	},
	on: function() {
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
			return "file.js"
		}
	};
Object.assign(receiver, supplier);
var descriptor = Object.getOwnPropertyDescriptor(receiver, "name");
console.log(descriptor.value); // "file.js"
console.log(descriptor.get); // undefined	

console.log('*'.repeat(10));



//Дублиране на свойства в обекта

"use strict";
var person = {
	name: "Nicholas",
	name: "Greg" // syntax error in ES5 strict mode
}; //no error in ES6
console.log(person.name); //Greg

console.log('*'.repeat(10));



//Object.setPrototypeOf()  and  Object.getPrototypeOf()
//Super

let persons = {
	getGreeting() {
		return "Hello";
	}
};
let dog = {
	getGreeting() {
		return "Woof";
	}
};
let friend = {
	getGreeting() {
		return Object.getPrototypeOf(this).
		getGreeting.call(this) + ", hi!";
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
let friend1 = {
	getGreeting() {
		return super.getGreeting() + ' hi!';
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


let person7 = {
	getGreeting() {
		return 'Hello';
	}
};
let friend2 = {
	getGreeting() {
		return Object.getPrototypeOf(this)
			.getGreeting.call(this) + ', hi';
	}
};
Object.setPrototypeOf(friend2, person7);
let relative = Object.create(friend2);

console.log(person7.getGreeting()); //Hello
console.log(friend2.getGreeting()); //Hello, hi
//console.log(relative.getGreeting()); //error

console.log('&'.repeat(20));

let person8 = {
	getGreeting() {
		return 'Hello';
	}
};
let friend3 = {
	getGreeting() {
		return super.getGreeting() + ', hi!'
	}
};
Object.setPrototypeOf(friend3, person8);
let relative1 = Object.create(friend3);

console.log(person7.getGreeting());
console.log(friend3.getGreeting());
console.log(relative1.getGreeting());