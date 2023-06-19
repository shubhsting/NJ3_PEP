Database requirements:
1) create one table for user with columnNames:
    1.1) email   String  mandatory
    1.2) First name  String mandatory
    1.3) last name  String mandatory
    1.4) password  String   mandatory
    1.5) phone_number String 10 digits
    1.5) profile_image String(url)  optional


2) create another mongodb table with name activity 
    2.1) type: String(TASK, EVENT)  mandatory
    2.2) startTime: Long(timestamp) mandatory
    2.3) endTime: long(timestamp)  optional
    2.4) description: String  optional
    2.5) guests: [String]  optional
    2.6) link: String: optional
    2.7) location: String  delhi(city name)



API's support:
1) USER API's 
    1.1) login api user should be able to login(return a token);
    1.2) register api(user would register his email)
    1.3) get user details from token, email
    1.4) update user details
    1.5) delete user details(user, activity of user is also deleted)

2) ACTIVITY API's
    2.1) create a task, event
    2.2) update a task/event
    2.3) delete a task/event
    2.4) read a task/event between time task long with ascending order of those tasks.