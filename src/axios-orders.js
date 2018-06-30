import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-burger-builder-5fa6a.firebaseio.com/'
});

export default instance;
