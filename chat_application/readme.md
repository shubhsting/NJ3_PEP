user can join a chat group and everyone can message..
mongodb
node 
react
we would focus on concept of sockets.
UI heavy
LOGIN
SIGNUP
/chat



API's -> 




frontend(user) -> call backend -> hit route /api/login -> backend (request received, response returned) connection closed 

frontend(user) -> call backend -> hit route /api/login -> backend (request received, response returned) connection closed 

for normal network calls(API) trigger, create connection, process, close connection


socket



user -> request -> call backend -> connection created -> backend 


user ride create ---------------> socket connection ---->  backend 
    ------------------------------------------------------------
                                                                |
driver accept ----------------------->  socket connection->  backend

user -> request send --------------------> already created connection  -> process 



user1 login ------------------> server request -> socket connection -> 

        ------------------> message->                             server 


user2 login ------------------> server request -> socket connection -> 

    Hi from user 1


close connection


user3 login ------------------> server request -> socket connection -> 

    hi from user 1




user1     create connection 
            send message  emit(message_send_to_server)
            receive message


backend connection create -> accept
        message receive and emit(udsers)  bacxkend receive(message_send_to_server) 
        backend emit(message_sent_to_all)


user2 -> create connection
        send message

        socket receive(message_sent_to_all) show to users.
        receive message(detect message sent by user1)


