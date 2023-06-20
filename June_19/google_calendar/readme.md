Database requirements:
1. create one table for user with columnNames:   
    1.1 email   String  mandatory   
    1.2 First name  String mandatory    
    1.3 last name  String mandatory   
    1.4 password  String   mandatory   
    1.5 phone_number String 10 digits   
    1.6 profile_image String(url)  optional


2. create another mongodb table with name event    
    2.1 startTime: Long(timestamp) mandatory   
    2.2 endTime: long(timestamp)  optional   
    2.3 description: String  optional   
    2.4 guests: [String]  optional   
    2.5 link: String: optional   
    2.6 location: String  delhi(city name)   
    2.7 user_id: String

3. create another mongodb table with name task    
    2.1 startTime: Long(timestamp) mandatory   
    2.2 description: String  optional   
    2.3 user_id: String


API's support:
1. USER API's    
    1.1 login api user should be able to login(return a token);
    1.2 register api(user would register his email)   
    1.3 get user details from token, email  
    1.4 update user details   
    1.5 delete user details(user, activity of user is also deleted)  

2. EVENT API's   
    2.1 create a event   
    2.2 update a event   
    2.3 delete a event   
    2.4 read a event    
        2.4.1 between time task long with ascending order of those events.   
        2.4.2 substring search 


3. TASK API's   
    3.1 create a task   
    3.2 update a task   
    3.3 delete a task   
    3.4 read a task    
        2.4.1 between time task long with ascending order of those tasks.   
        2.4.2 substring search 

4. create a middleware that validates user details/token for every api.




password hashing using bcrypt: 12345 , cgcscvhxbhjsj


12345 -> hash convert -> match with db value


bcrypt
