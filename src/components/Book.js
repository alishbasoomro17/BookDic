import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from './Nav';

const Book = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [mostRead, setMostRead] = useState([]);
  const [famousAuthors, setFamousAuthors] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const fetchMostRead = async () => {
      try {
        const response = await axios.get('https://www.googleapis.com/books/v1/volumes?q=most+read&key=AIzaSyAqhfpy1PxuHZS-JUELCTL53uLk-N_PgAg');
        const limit = 8;
        setMostRead(response.data.items.slice(0,limit));
      } catch (err) {
        console.error('Error fetching most-read books', err);
      }
    };

    const fetchFamousAuthors = async () => {
      try {
        const response = await axios.get('https://www.googleapis.com/books/v1/volumes?q=non-fiction&key=AIzaSyAqhfpy1PxuHZS-JUELCTL53uLk-N_PgAg');
        const limit = 8;
        
        setFamousAuthors(response.data.items.slice(0,limit));
      } catch (err) {
        console.error('Error fetching famous authors', err);
      }
    };

    fetchMostRead();
    fetchFamousAuthors();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsSearching(true);
    try {
      const response = await axios.get(`https://openlibrary.org/search.json?q=${query}`);
      const results = response.data.docs;

      const limit = 8;
      const limitedResults = results.slice(0, limit);

      setBooks(limitedResults);
    } catch (err) {
      console.error('Error searching books', err);
    }
  };

  const handleView = (book) => {
    window.open(`https://openlibrary.org${book.key}`, '_blank');
  };

  const handleDownload = (book) => {
    window.open(`https://openlibrary.org${book.key}`, '_blank');
  };

  return (
    <>
    <Nav/>
      <div className="book-search-container card-box">
      <h1 className="text-center mb-4 fancy">Book Search</h1>
      <form onSubmit={handleSearch} className="search-form mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for books"
          className="form-control"
        />
        <button type="submit" className="btn btn-success  mt-2 w-100">Search</button>
      </form>

      {!isSearching ? (
        <>
          <div className="container mt-5">
            <h2 className='text-center fancy'>Most-Read Books</h2>
            <div className="row">
              {mostRead.length > 0 ? (
                mostRead.map((book, index) => (
                  <div key={index} className="col-6 col-sm-4 col-md-3 mb-4">
                    <div className="card book-card">
                      <img
                        src={book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : 'https://via.placeholder.com/150'}
                        alt={book.volumeInfo.title}
                        className="card-img-top"
                      />
                      <div className="card-img-overlay d-flex align-items-end p-2">
                        <div className="overlay-content">
                          <h5 className="card-title">{book.volumeInfo.title}</h5>
                          <p className="card-text">{book.volumeInfo.publishedDate ? `Published: ${book.volumeInfo.publishedDate}` : 'Unknown Date'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <center>
                  <div className="spinner-grow text-success" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </center>
              )}
            </div>
          </div>

          <div className="container mt-5">
            <h2 className='text-center fancy'>Non-Fiction</h2>
            <div className="row">
              {famousAuthors.length > 0 ? (
                famousAuthors.map((author, index) => (
                  <div key={index} className="col-6 col-sm-4 col-md-3 mb-4">
                    <div className="card book-card">
                      <img
                        src={author.volumeInfo.imageLinks ? author.volumeInfo.imageLinks.thumbnail : 'https://via.placeholder.com/150'}
                        alt={author.volumeInfo.title}
                        className="card-img-top"
                      />
                      <div className="card-img-overlay d-flex align-items-end p-2">
                        <div className="overlay-content">
                          <h5 className="card-title ">{author.volumeInfo.title}</h5>
                          <p className="card-text">{author.volumeInfo.authors ? author.volumeInfo.authors.join(', ') : 'Unknown Author'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <center>
                  <div className="spinner-grow text-success" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </center>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="container mt-5">
          <h2 className='fancy'>Search Results</h2>
          <div className="row">
            {books.length > 0 ? (
              books.map((book, index) => (
                <div key={index} className="col-6 col-sm-4 col-md-3 mb-4">
                  <div className="card book-card">
                    <img
                      src={book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : 'https://via.placeholder.com/150'}
                      alt={book.title}
                      className="card-img-top"
                    />
                    <div className="card-img-overlay d-flex align-items-end p-2">
                      <div className="overlay-content">
                        <h5 className="card-title ">{book.title}</h5>
                        <p className="card-text">{book.author_name ? book.author_name.join(', ') : 'Unknown Author'}</p>
                        <button onClick={() => handleView(book)} className="btn btn-outline-light btn-sm me-2">View</button>
                        <button onClick={() => handleDownload(book)} className="btn btn-outline-light btn-sm">Download</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <center>
                <div className="spinner-grow text-success" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </center>
            )}
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default Book;
