TASK_1

customer
-> signup
-> create A ride  (start, end, creation time, created_by, estimated_time, estimated_cost, status(initiate, accepted, in_progress, completed))(-> mongo db i would create entry in table)
-> fetch all rides


driver
API
-> signup
-> get all the rides near my range(5 km) and i will accept any one randomly.
-> complete ride (status change, completion time, final fare, time_taken)
-> i want to fetch all rides


mongoDb -> entry create
driver accept-> update
driver complete-> update
fetch from mongodb

mongoDB.
frontend using react.

api 



TASK_2

https://api.publicapis.org/entries 

backend expressn server
create an api

localhost:3000 axios-> hit this endpoint, return data.

ui
create a local component , call this local api

render this data.




Monday, tuesday, wednesday,
chat application(sockets)




[{"name": "shubham", "age": 23}, {"name": "rahul", "age": 21}, {"name":"nikhil", age: 21}, {"name": "shubham", "age": 23}]

for(ele of list){
    if(name==shubham){
        return ele
    }
}
o(n)


map{
    shubham: {"name": "shubham", "age": 23},
    rahul: {"name": "rahul", "age": 21},
    test: {"name": "test", "age": 23}
}
o(1)


read queries are fast


disadvantage: 
writing data becomes slow




customer: nikhil


driver: shubham


login: nikhil -> i want to create a ride::::

create ride api...ride



shubham login=> /get-rides


/change-status -> ACCEPTED_BY_DRIVER_ON_HIS_WAY
/change-status -> REACHED_LOCATION
/change-status -> STARTED
/change-status -> ENDED




fetchridedetails page -> user open


driver ride details page -> he can edit the info-> status change 