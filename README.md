# socialmedia-app

Create a simple social media application using Node.js, Express and MongoDB that allows users to create an account, login, create posts, view posts, and follow other users. You can use Mongoose to interact with the MongoDB database, and handle user authentication and authorization using a library such as Passport. bcryptjs can be used for password encryption
Here's a list of the routes and their corresponding HTTP verbs and actions:

POST /users: Create a new user account
GET /users/:username: Retrieve a specific user by username
GET /users/:username/followers: Retrieve a list of followers for a specific user
GET /users/:username/following: Retrieve a list of users a specific user is following
POST /users/:username/follow: Follow a specific user
DELETE /users/:username/follow: Unfollow a specific user