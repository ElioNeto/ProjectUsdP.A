import axios from 'axios';

const apiMongo = axios.create({
  baseURL: 'http://localhost:3333'
});

export default apiMongo;