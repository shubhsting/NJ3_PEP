We would be creating zomato clone:

    1. BACKEND

        We would create 4 tables:   
            -> User    
            -> restaurants   
            -> menu(food items)   
            -> reviews(reviews can be of 2 types item reviews/ restaurant review)  

        We would create APIs for below operations:

            1.  USER API'S
                1.1 login 
                1.2 signup
                1.3 get profile
                1.4 get user reviews


            2. RESTAURANT API's
                2.1 onboard restaurant/ create
                2.2 update the restaurant info
                2.3 delete restaurant
                2.4 get restaurant info
                    2.4.1 Fetch menu of restaurant(all food items) reviews individual items 
                    2.4.2 fetch all reviews along with average rating

    2. FRONTEND   
        ->  we would learn routes   
        -> Login page   
        -> signup page   
        -> user profile page (my restaurants)   
        -> create restaurant page    
        -> restaurant menu page   
        -> restaurant review page   
        -> other users should be able to see it.    





TABLE STRUCTURES

    USER TABLE   
        -> email   
        -> phone   
        -> first name   
        -> last name   
        -> current address   
        -> profile_image   

    RESTAURANT   
        -> restaurant name   
        -> complete address   
        -> contact_number   
        -> landline info   
        -> owner's name   
        -> owner's phone   
        -> owner's email   
        -> opening hours   
        -> popular dishes   
        -> photos []   
        -> created_by -> user_id   
        -> more_info(features) [Breakfast, Home Delivery, Takeaway Available, Indoor Seating, Kid Friendly, High Chair Available, Wifi, Family Friendly]   

    MENU_ITEMS   
        -> restaurant_id   
        -> name   
        -> image   
        -> category   
        -> tags(optional)   
        -> description   
        -> price   

    REVIEWS   
        -> restaurant_id   
        -> rating [1, 5]  
        -> description   
        -> user_id   
        -> menu_item(optional)   
        -> created_at   
        -> tags =[loaded fries, polite staff, wonderful presentation]   


API structure

    USER   
        -> signup   
        -> login   
        -> get profile   
        -> get user restaurants   
        -> get user reviews   
        -> update profile    
        -> get all nearby restaurants   
        -> submit review   
        -> update review   
        -> delete review   
        -> get all reviews   


    RESTAURANT   
        -> create   
        -> update   
        -> delete   
        -> get restaurant details (get by slug/identifier)
        -> get restaurant menu  (get by slug/identifier) 
        -> get restaurant reviews   (get by slug/identifier)

    MENU_ITEMS    
        -> create item   
        -> update   
        -> read    
        -> delete   
        -> submit rating   




enum gender: ["Male", "female", "other"]
user enters address-> ui(call geolocation and converts it into coordinates) , backend will stpre it as coordinates



slug is a unique identifier that is used in urls. 





ui-> slug(restaurant identifier), userToken(uder identifier) , 
middleware get restaurant details and get user details req.user = user, request.restaurant  
controllers 





user -> ui upload image->   /upload-image-> image ->  multer(image) -> put the image in public folder

    req.params = {itemId: "123455"}

    const { itemId } = req.params;
    const itemId =  req.params;

    1) itemId=123455
    2) itemiD = {itemId: "123455"}


routes 

/api/restaurant -> controller run

frontend -> /login -> page load 




db you stored the data

info: {tfft} 

id: 12, 29, 
create index;


[{"name":"shubham", "age": 23}, , {"name":"Agam", "age": 21}, {"name":"vaibhav", "age": 21}, {"name":"person", "age": 60}]
// get element by name

map "shubham" => {"name":"shubham", "age": 23},
   "agam" => {"name":"Agam", "age": 21}
   "person" => 
//shubham o(n)
// o(1)


advantage:
fast read

disadvantage

write queries: slow 





indexing -> 

read queries -> fast

write -> slow



What did we learn:

-> authentication -> login, signup -> bcrypt, jwttoken, 
-> image handling using multer
-> create restaurant-> automatically create a slug, list restaurants-> returns us list -> fetch the slug and use it is our frontend url (slug part)
-> create indexes in databases and benefits of indexing -> read queries fast, write queries
-> geospatial queries of mongodb to fetch restaurants near user.
-> serving assets/images in express
-> basic hooks, components, state
-> calling apis from frontend using axios
-> rendering states after api responses
-> managing cookies: react-cookies 
-> navigating to a new url -> useNavigate
-> triggered clicks on input by referencing it via image -> useRef -> used ref of image input to upload images by clicking on profile picture
-> fetch/read url/route params using useParams hook
-> useEffect multiple cases (trigger on page load, trigger on variable changes)
-> react routes
-> mongodb connection, how  an we wait until connection is ready
