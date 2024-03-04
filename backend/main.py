from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from pymongo import MongoClient
from bson import ObjectId
from urllib.parse import quote_plus
# from typing import List
# MongoDB connection setup
username = "aditya_notebook"
password = "aditya@9916"
escaped_username = quote_plus(username)
escaped_password = quote_plus(password)
connection_string = f"mongodb+srv://{escaped_username}:{escaped_password}@fastapinotebook.1nygonl.mongodb.net/"
client = MongoClient(connection_string)
db = client["books"]
collection = db["notes"]

# FastAPI app setup
app = FastAPI()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow requests only from this origin
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

# Pydantic model for Book
class Book(BaseModel):
    _id:str
    title: str
    author: str
    description: str

# Endpoint to create a new book note
@app.post("/books/")
async def create_book(book: Book):
    # Convert book to dictionary
    book_dict = book.dict()

    # Generate ObjectId for _id field if not provided
    if '_id' not in book_dict:
        book_dict['_id'] = str(ObjectId())  # Convert ObjectId to string

    # Insert document into MongoDB collection
    inserted_book = collection.insert_one(book_dict)

    # Return the inserted book with its generated _id
    return {"id": str(inserted_book.inserted_id), **book_dict}

# Endpoint to retrieve a book note by its ID


@app.get("/books/all")
async def read_books():
    # Query the collection to retrieve all books
    books = list(collection.find())
    if books:
        return books 
    raise HTTPException(status_code=404, detail="No books found")


# Endpoint to update a book note by its ID
@app.put("/books/{book_id}")
async def update_book(book_id: str, book: Book):
    # Check if the book with the given ID exists
    existing_book = collection.find_one({"_id": book_id})
    if existing_book:
        # Update the book in MongoDB collection
        updated_book = collection.update_one({"_id": book_id}, {"$set": book.dict()})
        
        if updated_book.modified_count == 1:
            return {"message": "Book updated successfully"}
        else:
            raise HTTPException(status_code=500, detail="Failed to update book")
    else:
        raise HTTPException(status_code=404, detail="Book not found")


# Endpoint to delete a book note by its ID
@app.delete("/books/{book_id}")
async def delete_book(book_id: str):
    # Delete the book from MongoDB collection
    deleted_book = collection.delete_one({"_id": book_id})
    if deleted_book.deleted_count == 1:
        return {"message": "Book deleted successfully"}
    raise HTTPException(status_code=404, detail="Book not found")
