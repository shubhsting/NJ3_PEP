const user = { name: 'Shubham', age: 23 };
const admin = { admin: true, ...user };
console.log(admin);
// { name: 'Shubham', age: 23, admin: true };



const settings = {
    username: 'lydiahallie',
    level: 19,
    health: 90,
  };
  
const data = JSON.stringify(settings,  ['level', 'health']);
console.log(data);
// {"level": 19, "health": 90}





class Dog {
    constructor(name) {
      this.name = name;
    }
  };
  
  class Labrador extends Dog {
    // 1
    constructor(name, size) {
      this.size = size;
    }
    // 2
    constructor(name, size) {
      super(name);
      this.size = size;
    }
    // 3
    constructor(size) {
      super(name);
      this.size = size;
    }
    // 4
    constructor(name, size) {
      this.name = name;
      this.size = size;
    }
  
  };




//   function addToList(item, list) {
//     return list.push(item);
//   }
  
//   const result = addToList('apple', ['banana']);
//   console.log(result);


function addToList(item, list) {
    list.push(item);
    return list
}
  
const result = addToList('apple', ['banana']);
console.log(result);

list = ["10", "20"]

console.log(list.push("30")) // 3
 list.push("30")
 console.log(list) ["10", "20", "30"]




const myLifeSummedUp = ['item1', 'item2', 'item3', 'item4'];

for (let item in myLifeSummedUp) {
  console.log(item);
}
// 0,1,2,3
for (let item of myLifeSummedUp) {
  console.log(item);
}

// item1, item2, item3, item4

const test = {"key1":"value1", "key2":"value2"}
for (let item in test) {
    console.log(item);
  }
  // 0,1,2,3
for (let item of test) {
    console.log(item);
}


function sum(num1, num2 = num1) {
    console.log(num1 + num2);
}
  
sum(10);



function getItems(fruitList, ...args) {
    return [...fruitList, ...args]
}
  
getItems(["banana", "apple"], "pear", "orange")




// const person = {
//     firstName: 'Lydia',
//     lastName: 'Hallie'
// };
// console.log(person?.firstName)


const person = {
    firstName: 'Lydia',
    lastName: 'Hallie',
    pet: {
      name: 'Mara',
      breed: 'Dutch Tulip Hound',
    },
    getFullName() {
      return `${this.firstName} ${this.lastName}`;
    },
  };
  
  console.log(person.pet?.name);// Mara
  console.log(person.pet?.family?.name); //undefined
  console.log(person.getFullName?.());//undefined
  console.log(member.getLastName?.()); //undefined

