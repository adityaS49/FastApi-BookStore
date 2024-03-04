// frontend/src/services/ApiService.js

import axios from 'axios';

const BASE_URL = 'https://fastapi-bookstore-6.onrender.com';

const ApiService = {
  getBooks: async () => {
    return await axios.get(`${BASE_URL}/books/all`);
  },

  postBook: async (bookData) => {
    return await axios.post(`${BASE_URL}/books`, bookData);
  },
  deleteBook: async (bookId) => {
    return await axios.delete(`${BASE_URL}/books/${bookId}`);
  },
  updateBook: async (bookId) => {
    return await axios.put(`${BASE_URL}/books/${bookId}`);
  }
};

export default ApiService;
