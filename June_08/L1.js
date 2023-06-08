function test_fxn(params) {
    console.log("entered inside function")
}


console.log("before fxn")
test_fxn(10)
console.log("after fxn")

async function test_fxn(params) {
    setTimeout(()=>{
        console.log("entered inside function")
    }, 4000)
}


console.log("before fxn")
test_fxn(10)
console.log("after fxn")



async function test_fxn_1(params) {
    setTimeout(()=>{
        console.log("entered inside function 1")
    }, 2000)
}

async function test_fxn_2(params) {
    setTimeout(()=>{
        console.log("entered inside function 2")
    }, 1000)
}

console.log("before fxn")
test_fxn_1(10)
test_fxn_2(10)
console.log("after fxn")


setTimeout(()=>{
    console.log("entered inside function 2")
}, 1000)


async function test_fxn_2(params) {
    console.log("inside async function")
}

console.log("before fxn")
test_fxn_2(10).then(()=>{
    console.log("after fxn")
})


// promise is not actually a response, it is reference to a response.
const test_promise = new Promise((resolve, reject)=>{
    setTimeout(()=>{
    // resolve("This promise is completed")
    reject("There was some exception inside this promise")
}, 1000)
})


async function test_fxn_promise() {
    test_promise.then((result)=>{
        console.log(result)
    }).catch((exception)=>{
        console.log("exception occured")
    }).finally(()=>{
        console.log("entered into finally")
    })
    const result = await test_promise
    console.log(result)
}

console.log("before promise")
test_promise.then((result)=> {
    console.log(result)
    console.log("after promise")
})

console.log("before promise")
test_promise
console.log("after promise")


test_fxn_promise()







