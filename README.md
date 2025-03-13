# Argent Bank - Banking Application  

Argent Bank is a modern banking application that allows users to securely authenticate, manage their accounts, and track transactions. Built with **React** and **Redux**, this project integrates with a REST API to provide a seamless banking experience.  

## Features  

### 🔐 **User Authentication**  
- Secure login and logout functionality.  
- Access control to restrict unauthorized profile access.  

## 🚀 Technologies Used  

- **React**: Component-based frontend framework for building the UI.  
- **Redux**: State management for handling authentication and account data.  
- **React Router**: Navigation between different application views.  
- **Fetch API**: Handles HTTP requests to interact with the backend API.  
- **Swagger**: API documentation and endpoint modeling.  
- **Node.js**: Executes JavaScript on the server side.  
- **CSS**: Styles the application for an optimal user experience.  

## 🛠️ Skills Demonstrated  

- **Frontend Development**: Structuring a React application with reusable components.  
- **API Integration**: Connecting the frontend to the backend with RESTful API calls.  
- **State Management**: Handling user sessions and account data with Redux.  
- **Authentication & Authorization**: Securing user access and profile data.  
- **API Documentation**: Using Swagger to document and model API endpoints.  

## 📌 Installation & Usage  

### 1️⃣ Clone the project  
```bash  
git clone https://github.com/VincentWings/ArgentBank.git  
cd ArgentBank  
```  

### 2️⃣ Backend Installation  
Ensure you have **Node.js** installed.  
```bash  
cd backend  
npm install  
# Start the server  
npm run dev:server
```  
The website will be available at [http://localhost:3001](http://localhost:3001)  

### 3️⃣ Frontend Installation  
```bash  
cd frontend  
npm install  
# Start the React application  
npm run dev
# Populate database with two users
npm run populate-db
```  
The application will be accessible at [http://localhost:5173/](http://localhost:5173/)  

## 🔗 Backend API  

To learn more about how the API works, once you have started your local environment, you can visit: http://localhost:3001/api-docs

### **User Module**  
- `POST /user/login` → User authentication (returns JWT token).  
- `POST /user/signup` → User registration.  
- `GET /user/profile` → Fetch logged-in user profile.  
- `PUT /user/profile` → Update user profile details.  

## Error Handling  
- **Invalid Credentials** → Displays an error message on login failure.  
- **Unauthorized Access** → Redirects users to the login page if not authenticated.  
