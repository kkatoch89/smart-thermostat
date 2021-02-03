import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://api-staging.paritygo.com/sensors/api',
});

export default instance;
