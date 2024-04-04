import axios from 'axios';

// https://itoys-ecommerce-4742f4a62895.herokuapp.com/api
// http://localhost:5000/api

const baseURL = "https://itoys-ecommerce-4742f4a62895.herokuapp.com/api";

export default axios.create({
    baseURL
});