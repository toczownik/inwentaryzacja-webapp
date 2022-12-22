import axios, {AxiosRequestConfig} from "axios";

const API_URL = "http://localhost:8080/api/v1/item/";

const corsHeaders: AxiosRequestConfig = {
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    }
};

const addItem = (name, purchaseDate, faxNumber, purchasePrice, amountOfAnnualDepreciation, currencyValue, description, location) => {
    return axios.post(API_URL, {
        name,
        faxNumber,
        purchasePrice,
        amountOfAnnualDepreciation,
        currencyValue,
        description,
        location
    }, {
        headers: {
            Authorization: `Bearer${localStorage.getItem("token")}`
        }
    });
}

const getItem = (id) => {
    return axios.get(API_URL, {
        params: {
            id
        },
        headers: {
            Authorization: `Bearer${localStorage.getItem("token")}`
        }
    });
}

const UserService = {
    getItem,
    addItem
};

export default UserService;