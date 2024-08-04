import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from './Nav';


const stripHTML = (html) => {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || "";
};

const Dictionary = () => {
  const [bookTitle, setBookTitle] = useState('');
  const [bookList, setBookList] = useState([]);
  const [bookSummary, setBookSummary] = useState(null);

  const searchBooks = async (title) => {
    try {
      const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=intitle:${title}&key=AIzaSyAqhfpy1PxuHZS-JUELCTL53uLk-N_PgAg`);
      setBookList(response.data.items || []);
      setBookSummary(null);
    } catch (err) {
      setBookList([]);
      console.error('Error searching books', err);
    }
  };

  const fetchBookSummary = async (bookId) => {
    try {
      const response = await axios.get(`https://www.googleapis.com/books/v1/volumes/${bookId}`);
      const book = response.data;
      setBookSummary(stripHTML(book.volumeInfo.description));
    } catch (err) {
      setBookSummary(null);
      console.error('Error fetching book summary', err);
    }
  };

  return (
    <>
    <Nav/>
    <div className="container SS">
      <h2 className="text-center my-4 fancy">Books</h2>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter a book title"
          aria-label="Enter a book title"
          aria-describedby="button-addon2"
          value={bookTitle}
          onChange={(e) => setBookTitle(e.target.value)}
        />
       
      </div>
      <button
          className="btn btn-success mb-2 "
          type="button"
          id="button-addon2"
          onClick={() => searchBooks(bookTitle)}
        >
          Search Books
        </button>
      <div className="row">
        <div className="col-lg-6 col-md-12 mb-4">
          <ul className="list-group">
            {bookList.map(book => (
              <li key={book.id} className="list-group-item d-flex justify-content-between align-items-center">
                {book.volumeInfo.title}
                <button className="btn btn-success m-2 " onClick={() => fetchBookSummary(book.id)}>Get Summary</button>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-lg-6 col-md-12">
          {bookSummary && (
            <div className="summary-container p-3 border rounded">
              <h3 className='fancy'>Book Summary</h3>
              <p>{bookSummary}</p>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default Dictionary;
