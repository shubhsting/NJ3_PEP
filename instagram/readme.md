creating an account:
-> user authentication
-> add features of followers and following
-> we would add feature of posting images.

we would be using 
-> node
-> react
-> mysql


tables

USER
-> id, first_name, last_name, phone_number, username, password, profile_image

POSTS
-> id, image_url, post_content, likes_count, posted_by

POST_LIKES
-> id, post_id, user_id

FOLLOW_REQUESTS
-> id sent_by sent_to status (SENT, ACCEPTED, DENIED)

POST_COMMENTS
-> id, post_id, commented_by






