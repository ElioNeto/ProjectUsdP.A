import axios from 'axios';

const apiUsd = axios.create({
  baseURL: 'http://localhost:3334'
});

export default apiUsd;