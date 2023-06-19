1) mongodb basics
2) connecting to mongo cluster
3) notes app... we converted it to api...we ould be integrating mongo db into it
4) we would start new project by creating google calendar
    1) authentication + why do we need it
    2) create multiple events on our calendar via api.
    3) CRUD operations on these calendar events.










                                user: name, password
                                : link
                                cluster remote machine (instance) we have our mongo db table(collections)




// MVC architecture
models, views,controller


// API's for google calendar
1) design a momgo db schema for this system
2) user authentication (login into google calendar account using email and password)
3) CRUD operations for task
4) CRUD operations for events.


/login -> username and password   req backend -> ddb check entry -> user valid or note -> response

-> identifier : token: details

browser -> stores that identifier in cookies/browser cache


/account


/login -> check if user is valid or not : return identifier

website local cookie storeed at browser end and then every request contains that token

/ middleware: 