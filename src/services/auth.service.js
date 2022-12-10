import axios, {AxiosRequestConfig} from "axios";

const API_URL = "http://localhost:8080/";

const corsHeaders: AxiosRequestConfig = {
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    }
};

const register = (firstName, lastName, email, password) => {
    return axios.post(API_URL + "api/v1/user/register", {
        firstName,
        lastName,
        email,
        password
    }, corsHeaders);
};

const login = (givenUsername, givenPassword) => {
    return axios.post(API_URL + "login", {
        username: givenUsername,
        password: givenPassword
    });
};

const AuthService = {
    register,
    login,
};
export default AuthService;