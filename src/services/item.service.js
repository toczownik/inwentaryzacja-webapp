import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/item/";

const addItem = (name, date, faxNumber, purchasePrice, amountOfAnnualDepreciation, currencyValue, description,
                 location, classification) => {
    let purchaseDate = new Date(date).toISOString();
    return axios.post(API_URL, {
        name,
        purchaseDate,
        faxNumber,
        purchasePrice,
        amountOfAnnualDepreciation,
        currencyValue,
        description,
        location,
        classification
    }, {
        headers: {
            Authorization: `Bearer${localStorage.getItem("token")}`,
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
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