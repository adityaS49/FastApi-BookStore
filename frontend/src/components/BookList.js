// frontend/src/components/BookList.js

import React, { useState, useEffect } from "react";
import ApiService from "../services/ApiService";
import { FaRegTrashAlt } from "react-icons/fa";
const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await ApiService.getBooks();
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };
  console.log(books);
  const handleDeleteBook = async (bookId) => {
    try {
      await ApiService.deleteBook(bookId);
      console.log(bookId);
      // After successful deletion, fetch the updated list of books
      fetchBooks();
    } catch (error) {
      alert("Error in deletion");
      console.error("Error deleting book:", error);
    }
  };

  return (
    <div>
  <h1 className="text-xl mt-4 font-bold text-[2rem] mb-4">
    Book List
  </h1>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {books.length === 0 ? (
      <p className="text-red-500 font-bold text-[2rem]">Oppsss....No books available.</p>
    ) : (
      books.map((book) => (
        <div key={book._id} className="bg-white rounded-lg shadow-md">
  <div className="p-4 flex flex-col gap-2">
    <h2 className="text-2xl font-bold">{book.title}</h2>
    <p className="text-gray-600 text-base font-bold">Author: {book.author}</p>
    <p className="text-gray-600 text-base font-bold">Description: {book.description}</p>
    <div className="mt-4 flex text-base justify-end">
      <button
        className="px-2 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-300"
        onClick={() => handleDeleteBook(book._id)}
      >
        <FaRegTrashAlt className="text-[1.5rem]" />
      </button>
    </div>
  </div>
</div>

      ))
    )}
  </div>
</div>

  );
};

export default BookList;
