import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const getBooks = async () => axios.get(`${API_URL}/books`);
export const getCart = async (userId) => axios.get(`${API_URL}/orders/${userId}`);
export const addToCart = async (userId, bookId, quantity) => 
  axios.post(`${API_URL}/orders/add`, { userId, bookId, quantity });
export const removeFromCart = async (userId, bookId) => 
  axios.post(`${API_URL}/orders/remove`, { userId, bookId });
