import axios from 'axios';

// https://itoys-ecommerce.herokuapp.com/api/v1
// http://localhost:5000/api/v1

const baseURL = "http://localhost:5000/api/v1";

export default axios.create({
    baseURL
});