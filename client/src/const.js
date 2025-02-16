import axios from "axios";

export const BACKEND_URL = "http://localhost:5000/api/v1";

// Define routes that should not include the authorization token
const publicRoutes = [
  '/user/updateTenant'
];

export const api = axios.create({
    baseURL: BACKEND_URL,
    withCredentials: true, // Important for session cookies
    headers: {
      'Content-Type': 'application/json',
    },
});

// // Add request interceptor
// api.interceptors.request.use(
//   (config) => {    
//     // Check if the current route is in the publicRoutes array
//     const isPublicRoute = publicRoutes.some(route => 
//       config.url?.includes(route)
//     );
    
//     // Only add token if it's not a public route
//     if (!isPublicRoute) {
//       const token = localStorage.getItem('token');
//       if (token) {
//         config.headers['authorization'] = `Bearer ${token}`;
//       }
//     }
    
//     return config;
//   },
//   (error) => {
//     console.error('Request Error:', error);
//     return Promise.reject(error);
//   }
// );

// // Add response interceptor
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     console.error('Response Error:', error.response?.data || error.message);
//     return Promise.reject(error);
//   }
// );