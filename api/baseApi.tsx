import axios from 'axios';
// @ts-ignore
import { API_BASE_URL } from '../config';

export default axios.create({
    baseURL: API_BASE_URL,
});
