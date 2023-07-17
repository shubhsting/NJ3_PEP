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





middleWare


i valiudate the input -> if input is correct, next
if input is wrong exception throw

primary key: unique and not null


first name : unique & 1 null is allowed


last name : not null  

foreign key:
table_1 column id -> primary key
table_2 tab_1_id -> foreign key 


primary key is a column which is unique and not null.


join: combined result 

i want all posts of a user with comments.
user& posts table join.
JOINS

select posts.*, post_comments.* from posts inner join postcomments on post.id = postcomments.postId where post.posted_by=1;


requirement 1:


tables maaping

signup/login


create a post
delete a post 
update a post



user -> fetch posts-> list of posts, post details, likes details, comment details



SELECT `Post`.`*`, `PostLike.*` FROM `user_posts_instagram` AS `Post` INNER JOIN `post_likes_instagram` AS `PostLikes` ON `Post`.`id` = `PostLikes`.`postId`



for joins 3 things:


1) the column which is common in both tables, add them as foreign key in real table using migration.
2) associate both columns in local models using associations.
3) in find all query, use include