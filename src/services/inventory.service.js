import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/inventory/";

const getInventory = (page, size) => {
    return axios.get(API_URL + "all", {
        params: {
            page,
            size
        },
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    })
}

const checkItem = (item) => {
    return axios.post(API_URL, item, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    })
}

const InventoryService = {
    getInventory,
    checkItem
}

export default InventoryService;