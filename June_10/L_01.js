var length = 10;
function fn() {
	console.log(length);
}

var obj = {
  length: 5,
  method: function(fn) {
    fn();
  }
};

obj.method(fn, 1);



function sayHi() {
    console.log(name);
    console.log(age);
    var name = 'Lydia';
    let age = 21;
  }
  
  sayHi();

// undefined, ReferenceError


// ==========================


var x = 21;
var girl = function () {
    console.log(x);
    var x = 20;
};

console.log(x)
girl ();


// undefined 




// ==============================


for (let i = 0; i < 5; i++) {
    setTimeout(function() { console.log(i); }, i * 1000 );
}
//============================


let a = 3;
let b = new Number(3);
let c = 3;

console.log(a == b);
console.log(a === b);
console.log(b === c);


// ========================



function bark() {
    console.log('Woof!');
}
  
bark.animal = 'dog';

// =================

function Person(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
}
  
const lydia = new Person('Lydia', 'Hallie');
const sarah = Person('Sarah', 'Smith');
  
console.log(lydia);
console.log(sarah);
// Person { firstName: 'Lydia', lastName: 'Halli }, undefined



function sum(a, b) {
    return a + b;
}
  
sum(1, '2');

// 12 type coercion


function checkAge(data) {
    if (data === { age: 18 }) {
      console.log('You are an adult!');
    } else if (data == { age: 18 }) {
      console.log('You are still an adult.');
    } else {
      console.log(`Hmm.. You don't have an age I guess`);
    }
  }
  
  checkAge({ age: 18 });

//   ==== reference check 

// == value check: primitives    reference



function getAge(...args) {
    console.log(typeof args);
}
  
getAge(21);




const numbers = [1, 2, 3];
numbers[10] = 11;
console.log(numbers);



// counter.js
let counter = 10;
export default counter;



// index.js
import myCounter from './counter';

myCounter += 1;

console.log(myCounter);
