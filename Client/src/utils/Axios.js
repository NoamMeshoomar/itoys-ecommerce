import axios from 'axios';

// https://itoys.projects-portfolio.live/api/v1
// http://localhost:5000/api/v1

const baseURL = 'https://itoys-ecommerce.herokuapp.com/api/v1';

export default axios.create({
    baseURL
});