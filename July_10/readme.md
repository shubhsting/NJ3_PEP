No SQL
-> MongoDb
-> data store object
-> no refrential constraints
-> fast development, less scalable 

SQL based
-> MySQL
-> data store is a table
-> there are constraints. foreign key, primary key, non null, unique 
-> for very huge systems, there are query patterns







SQL based database
structured query language.
queries, tables, storage 
-> MYSQL    select * from tableName
-> PLSQL   select * from database.table_name
-> postgres


API 

interacting with database
query select * from table name


SQL based databases 
wqe have concept called ORM.

ORMS -> pre defined functions.

model.find() -> select * from model

ORM: tool dtabase: 

we would be using sequelize.

database -> mysql, mongodb, plsql 

Sequelize is a ORM which helps us in managing databases.

functions would same.
db link -> 

table create:

CREATE table table_name  

INSERT INTO table name
values (1,2,e)

await User.findAll(); -> db query -> select * from users database run -> 



real world application


notes application

customer deploy

developer code
code github merge 
code deploy


multiple environments


alpha/test developers use this application mysql 

beta/dev environment  developer specific , testers test different database

production/main users can use... different database




customer/developer     ORM    table.findAll() ORM(model) .......    
real database(mysql, plsql) -> select * from table_name  ....

api 
response 


models folder , tables declare we would use them in code.
migrations -> it would store all operations that would interact with real table.



mongodb -> you create model and directly use in controller. it would automatically create the table.


ORM/mysql 
first write a migration to create table   user

declare a model and map it with mysql migration USER(code model) -> user(real mysql table)

i woul;d use USER in my whole code.     USER.findAll



we would create a notes application and store our notes in mysql table.

for mongodb, moongose is ORM.
migration to create table
CRUD operations.
api to create note 
api to get note


migration is a way to perform any operation on direct mysql table
models are used to perform operations via code schema 


run all migrations...



clever cloud create mysql instance
https://sequelize.org/docs/v6/core-concepts/model-basics/


create template 

write a migration to create table

run the migration

