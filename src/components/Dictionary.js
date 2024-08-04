// Dictionary.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Nav from './Nav';


const Dictionary = () => {
  const [word, setWord] = useState('');
  const [meaning, setMeaning] = useState(null);
  const [error, setError] = useState(null);
  const navigate=useNavigate();
  const fetchMeaning = async (searchWord) => {
    try {
      const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchWord}`);
      const firstMeaning = response.data[0].meanings[0];
      setMeaning(firstMeaning);
      setError(null);
    } catch (err) {
      setMeaning(null);
      setError('Word not found');
    }
  };

  const pronounceWord = () => {
    if (!word) return;
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-US';
    speechSynthesis.speak(utterance);
  };
  const to_Summ = () => {
    navigate('/summary-search');
  };
  const to_book = () => {
    navigate('/book-search');
  };

  return (
    <>
  <Nav/>
    <div className="dictionary-container container">
      <h1 className="title1 fancy">Dictionary</h1>

      <div className="search-section container">
        <input
          type="text"
          className="input-field"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          placeholder="Enter a word"
        />
        <button className="button btn btn-success" onClick={() => fetchMeaning(word)}>Search Word</button>
        <button className="button btn btn-success" onClick={pronounceWord} disabled={!word}>
          🎙️ Pronounce
        </button>
        <button className="button btn btn-success" onClick={to_Summ}>See Books Summary</button>
        <button className="button btn btn-success" onClick={to_book}>Search Books</button>
      </div>

      {error && <p className="error-message">{error}</p>}
      {meaning && (
        <div className="meaning-section dict container">
          <h2>Word: <span className="highlight">{word}</span></h2>
          <p><strong>Part of Speech:</strong> {meaning.partOfSpeech}</p>
          <p><strong>Meaning:</strong> {meaning.definitions[0].definition}</p>
          {meaning.definitions[0].example && (
            <p><strong>Example:</strong> {meaning.definitions[0].example}</p>
          )}
          {meaning.definitions[0].synonyms && meaning.definitions[0].synonyms.length > 0 && (
            <p><strong>Synonyms:</strong> {meaning.definitions[0].synonyms.join(', ')}</p>
          )}
          {meaning.definitions[0].antonyms && meaning.definitions[0].antonyms.length > 0 && (
            <p><strong>Antonyms:</strong> {meaning.definitions[0].antonyms.join(', ')}</p>
          )}
        </div>
      )}
    </div>
    </>
  );
};

export default Dictionary;
