// frontend/src/components/BookForm.js

import React, { useState } from "react";
import ApiService from "../services/ApiService";

const BookForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async () => {
    try {
      const newBook = {
        title,
        author,
        description,
      };
      await ApiService.postBook(newBook);
      // Optionally, you can reset the form fields after successful submission
      setTitle("");
      setAuthor("");
      setDescription("");
    } catch (error) {
      console.error("Error adding book:", error);
      alert("Failed to add book!");
    }
  };

  return (
    <div className=" p-4 items-center justify-cente rounded ">
      <h1 className="text-2xl text-center mb-4 font-bold">Add New Book to Book Store</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 font-bold mb-1">
          Title:
        </label>
        <input
          type="text"
          id="title"
          placeholder="Enter the title of book"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-input border-2 pl-2 border-gray-300 h-10 rounded-md focus:outline-none focus:border-blue-500 w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="author" className="block text-gray-700 mb-1 font-bold">
          Author:
        </label>
        <input
          type="text"
          id="author"
          value={author}
          placeholder="Enter Author Name"
          onChange={(e) => setAuthor(e.target.value)}
          className="form-input border-2 pl-2 border-gray-300 h-10 rounded-md focus:outline-none focus:border-blue-500 w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block font-bold text-gray-700 mb-1">
          Description:
        </label>
        <textarea
          id="description"
          value={description}
          placeholder="Enter the description of the Book"
          onChange={(e) => setDescription(e.target.value)}
          className="form-textarea border-2 p-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500 w-full"
          required
        />
      </div>
    
      <button
        type="submit"
        className="bg-blue-500 text-white  w-full px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
      >
        Add Book
      </button>
    </form>
    
    </div>
  );
};

export default BookForm;
