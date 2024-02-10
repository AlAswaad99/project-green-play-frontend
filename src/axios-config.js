
import axios from 'axios';
import { useUserSessionStore } from './provider/user';


const axiosInstance = axios.create();

// Add an interceptor for all outgoing requests
axiosInstance.interceptors.request.use(
  (config) => {
    const { userSession } = useUserSessionStore.getState();

    console.log("I am here")
    console.log(userSession);
    if (!userSession) {
      const localStorageSession = localStorage.getItem('session');

      if (localStorageSession) {
        const user = JSON.parse(localStorageSession);
        config.headers['Authorization'] = `Bearer ${user.idToken.jwtToken}`;
        return config;
      }
      else return Promise.reject("Unauthorized");
      // if(localStorageSession) setUserSession(localStorageSession)
      // else navigate("/login")
    }


    // // Parse the JSON string to get the object
    // const user = JSON.parse(userJSON);
    // // Set the authorization header if a token exists
    if (userSession) {
      config.headers['Authorization'] = `Bearer ${userSession.idToken.jwtToken}`;
      return config;

    }
    else return Promise.reject("Unautorized");

  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
