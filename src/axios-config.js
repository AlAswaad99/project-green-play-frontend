
import axios from 'axios';

const axiosInstance = axios.create();

// Add an interceptor for all outgoing requests
axiosInstance.interceptors.request.use(
  (config) => {
    // Retrieve the token from local storage (you may need to change this based on your implementation)
    const userJSON = localStorage.getItem('user');

    // Parse the JSON string to get the object
    const user = JSON.parse(userJSON);
    // Set the authorization header if a token exists
    if (user) {
      config.headers['Authorization'] = `Bearer ${user.token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
