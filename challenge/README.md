## API Documentation

### Base URL
- The backend server is running locally at `http://localhost:3001`

### Endpoints

#### 1. Login Endpoint
- **URL**: `/login`
- **Method**: `POST`
- **Description**: This endpoint is used to authenticate users by their email and password. If the authentication is successful, it returns a JWT token.
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "userpassword"
  }
  ```
- **Responses**:
  - **200 OK**: 
    ```json
    {
      "token": "<jwt-token>"
    }
    ```
  - **401 Unauthorized**: Incorrect password.
    ```json
    {
      "message": "Incorrect password"
    }
    ```
  - **404 Not Found**: User does not exist.
    ```json
    {
      "message": "User does not exist"
    }
    ```
  - **500 Internal Server Error**: Server-side error occurred.
    ```json
    {
      "message": "Server error",
      "error": "<error details>"
    }
    ```

#### 2. Register Endpoint
- **URL**: `/register`
- **Method**: `POST`
- **Description**: This endpoint is used to register a new user with their email and password. If successful, the user is stored in the database.
- **Request Body**:
  ```json
  {
    "email": "newuser@example.com",
    "password": "newuserpassword"
  }
  ```
- **Responses**:
  - **201 Created**: Successfully created a new user.
    ```json
    {
      "_id": "<user-id>",
      "email": "newuser@example.com",
      "password": "newuserpassword"
    }
    ```
  - **409 Conflict**: Email already registered.
    ```json
    {
      "message": "Email already registered"
    }
    ```
  - **500 Internal Server Error**: Server-side error occurred.
    ```json
    {
      "message": "Server error",
      "error": "<error details>"
    }
    ```

## Data Model

### User Model
The user data is persisted using MongoDB. Below is the schema for the `User` model, implemented with Mongoose.

- **Collection Name**: `users`
- **Schema Definition**:
  ```javascript
  const UserSchema = new mongoose.Schema({
    email: String,
    password: String
  });
  ```
- **Fields**:
  - `email`: (String) The email of the user. This field is unique for each user.
  - `password`: (String) The password of the user.

> **Note**: Security measures such as password hashing or token validation are not implemented, as specified in the exercise description.

## Technology Choices

#### 1. **Frontend**
- **React**: Chosen for the frontend due to its component-based architecture, making the UI easy to develop, reuse, and maintain. React also provides great flexibility in building dynamic and responsive user interfaces. One of the most widely used technologies today.
- **Axios**: Used for making HTTP requests because of its simplicity and support for handling responses and errors.
- **React Router**: Enables smooth navigation between different pages in the app, such as login, signup, and home.
- **Bootstrap**: Used for quick and easy styling of components, providing a consistent and responsive design with minimal custom CSS.
- **SASS**: I added some custom styles using SASS, which provides more flexibility in styling with features like nesting, variables, and mixins.

#### 2. **Backend**
- **Node.js with Express**: Chosen for its simplicity in setting up a server and handling routing. Express provides a straightforward way to define endpoints and manage HTTP requests and responses.
- **MongoDB with Mongoose**: Used as DB. MongoDB is well-suited for projects that need flexible schemas. Mongoose provides a simple way to interact with MongoDB, offering a schema-based approach to define and validate data.
- **JWT (JSON Web Token)**: Used to generate tokens for user authentication. JWTs are easy to use for stateless authentication and provide a simple way to encode user information.

### Improvements for the project

- We could add password hashing with `bcrypt` and implementing HTTPS to improve security.
- Protecting the `/home` route to ensure only authenticated users can access it.
