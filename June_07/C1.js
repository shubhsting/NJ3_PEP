
//variables in JS
let test = 10;
var num =10;


for(let i=0;i< 2 ;i++) {
    var a = 10;
    var b = 10;
    
    console.log("inside loop", i);
}

console.log("outside loop", i);



for(var i=0;i< 2 ;i++) {
    var a =10;
    var b = 10;
    
    console.log("inside loop", i);
}


console.log("outside loop", i);


const num2 = 20;

let abc = ["10", "20", "30"];
abc = 20
console.log(abc);




const status = "";
let score = 86
if(score>=90){
    status = "excellent";
} else if (score >=80 && score<90) {
    status = "okyish";
}

console.log(status)




// functions

//conventional ways
function test_fxn(a,b,c) {
    console.log(a,b,c);
}

test_fxn([10, 90, "it is a list"],20,30)

const test_fxn = function(a,b,c) {
    console.log(a, b, c);
}

test_fxn([10, 90, "it is a list"],20,30)



//arrow functions

const test_fxn = (a,b) => {
    console.log(a,b);
}



const test_fxn = (a,b) => a+b


console.log(test_fxn(10,20))

// rest parameters
function test_fxn(...args) {
    console.log(args);
}
test_fxn(10);
test_fxn(10,20,30,40);



// spread operators

let test_list = [10,20,30,40,50];
let second_list = [60,70,80,90]
let new_list =[]
for(let i=0;i<test_list.size();i++) {
    new_list.add(test_list.get(i));
}


console.log([...test_list, ...second_list])

console.log([...test_list, second_list]);



// for(let i=0;i<test_list.size();i++) {
//     new_list.add(test_list.get(i));
// }


const array = [10,20,30];
for(const element in array) {
    console.log(element)
}


// const string_value = "shubham";
//conventional way


for(const element of string_value) {
    console.log(element)
}

// try out iterations on following data types too -> Maps, sets


// objects and classes


// const obj = {
//     a:1,
//     b:2,
//     c:3,
//     print: function() {
//         console.log(this.a, this.b, this.c)
//     }
// }

// obj.print()


// const obj = {
//     a:1,
//     b:2,
//     c:3,
//     print() {
//         console.log(this.a, this.b, this.c)
//     }
// }


// obj.print()


//destructuring an object
const obj = {
    a:1,
    b:2,
    c:3,
    name: "shubham",
    email: "shubham@test.com",
    phone:987128979871
}

console.log(obj.a, obj.b, obj.c);

const {a, b, c, name, email, phone} = obj;
console.log(a, b, c, name, email, phone)



class Test{
    
    // //would be used by object 1
    // constructor(name, email){
    //     this.name = name;
    //     this.email = email;
    // }
    
    //used by object2
    constructor(name) {
        this.name = name
    }
}

//class object
// let test_class = new Test("shubham", "abc@gmail.com")

//object 2
let test_class_2 = new Test("abc");
console.log(test_class_2)



















