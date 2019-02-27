import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://lwsoftware-burger.firebaseio.com/'
});

export default instance;