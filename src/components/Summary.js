import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from './Nav';
import { Spinner } from 'react-bootstrap'; // Import the Spinner component from react-bootstrap

const stripHTML = (html) => {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || "";
};

const Summary = () => {
  const [bookTitle, setBookTitle] = useState('');
  const [bookList, setBookList] = useState([]);
  const [bookSummary, setBookSummary] = useState(null);
  const [loading, setLoading] = useState(false); // Add a loading state

  const searchBooks = async (title) => {
    setLoading(true); // Set loading to true when the search starts
    try {
      const response = await axios.get(`https://openlibrary.org/search.json?title=${title}`);
      const booksWithSummary = [];

      for (const book of response.data.docs) {
        try {
          const bookDetails = await axios.get(`https://openlibrary.org${book.key}.json`);
          if (bookDetails.data.description) {
            booksWithSummary.push(book);
          }
        } catch (err) {
          console.error('Error fetching book details', err);
        }
      }

      setBookList(booksWithSummary);
      setBookSummary(null);
    } catch (err) {
      setBookList([]);
      console.error('Error searching books', err);
    } finally {
      setLoading(false); // Set loading to false when the search is complete
    }
  };

  const fetchBookSummary = async (key) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://openlibrary.org${key}.json`);
      const book = response.data;
      
      // Handle cases where description might be an object or might not exist
      let description = book.description;
      if (typeof description === 'object') {
        description = description.value || ""; // Adjust based on actual structure
      }
      
      setBookSummary(stripHTML(description || ""));
    } catch (err) {
      setBookSummary(null);
      console.error('Error fetching book summary', err);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <>
      <Nav />
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
          className="btn btn-success mb-2"
          type="button"
          id="button-addon2"
          onClick={() => searchBooks(bookTitle)}
        >
          Search Books
        </button>
        {loading ? ( // Show the spinner if loading is true
          <div className="text-center my-4">
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <div className="row">
            <div className="col-lg-6 col-md-12 mb-4">
              <ul className="list-group">
                {bookList.map(book => (
                  <li key={book.key} className="list-group-item d-flex justify-content-between align-items-center">
                    {book.title}
                    <button className="btn btn-success m-2" onClick={() => fetchBookSummary(book.key)}>Get Summary</button>
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
        )}
      </div>
    </>
  );
};

export default Summary;
