import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import './App.css';
import Dictionary from './components/Dictionary';
import Spinner from './components/Spinner';
import Nav from './components/Nav';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Book from './components/Book';
import Summ from './components/Summary';
import Main from './Main';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter >
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/" index element={loading ? <Spinner /> : <Main />} />
            <Route path='/nav' element={<Nav />} />
            <Route path="/dictionary" element={<Dictionary />} />
            <Route path="/book-search" element={<Book />} />
            <Route path="/summary-search" element={<Summ />} />
          </Routes>
        </header>
      </div>
    </BrowserRouter>
  );
}

export default App;
