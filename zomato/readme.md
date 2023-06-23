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
        -> tag(optional)   
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
        -> get restaurant details   
        -> get restaurant menu   
        -> get restaurant reviews   

    MENU_ITEMS    
        -> create item   
        -> update   
        -> read    
        -> delete   
        -> submit rating   














