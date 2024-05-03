STEPS TO RUN IN LOCAL : 

1. clone the repo

2. cd into server and 'npm install'
3. cd into client and 'npm install'
 
4. to run server : cd into server and 'npm start'
5. to run client : cd into client and 'npm start'

BACKEND API's : 

authentication : 
- localhost:8000/api/v1/auth/register  [registers and responds with auth-token]
- localhost:8000/api/v1/auth/login   [send auth-token in headers]

user-profile : 
- localhost:8000/api/v1/user-profile/upload/bank-statements  [to upload bank statements or files]
- localhost:8000/api/v1/user-profile/update    [to update user profile interests , username and other sections]
- localhost:8000/api/v1/user-profile/feed      [to get a feed for a user]

friend-request : 
- localhost:8000/api/v1/friend-request/send   [to send a friend request]
- localhost:8000/api/v1/friend-request/respond  [to accept or reject a friend request]

posts : 
- localhost:8000/api/v1/posts/create-post

questions : 
- localhost:8000/api/v1/questions/ask
- localhost:8000/api/v1/questions/:questionId/answers

feed : 
- localhost:8000/api/v1/feed/suggested-users
