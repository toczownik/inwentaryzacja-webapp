import axios, {AxiosRequestConfig} from "axios";

const API_URL = "http://localhost:8080/";

const corsHeaders: AxiosRequestConfig = {
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    }
};

const changePassword = (email) => {
    return axios.get(API_URL + "api/v1/user/change/password",
        {
            params: {
                email
            },
            headers: corsHeaders
        });
};
const setNewPassword = (token, newPassword) => {
    return axios.post(API_URL + "api/v1/user/setNewPassword", {
        token,
        newPassword
    }, corsHeaders);
};

const UserService = {
    setNewPassword,
    changePassword
};

export default UserService;