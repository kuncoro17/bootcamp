import React, { useState, useEffect, useRef } from 'react';
import { performSearch } from '../Controllers/searchController';
import './Search.css'; // Import the CSS file

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    // Automatically focus on the input when the component mounts
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const performSearch = async () => {
    const response = await performSearch(query);

    if (response.results) {
      setResults(response.results);
      setSelectedVideo(response.results[0]);
      setError(null);
    } else if (response.error) {
      setError(response.error);
    }
  };

  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
  };

  return (
    <div className="container">
      <div className="input-container">
        <input
          type="text"
          ref={inputRef}
          className="search-input"
          placeholder="Enter search query"
          value={query}
          onChange={handleInputChange}
        />
        <button className="search-button" onClick={performSearch}>Search</button>
      </div>

      {error && <p className="error-message">{error}</p>}

      <div className="content-container">
        <div className="video-player">
          {selectedVideo && (
            <>
              <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${selectedVideo.id.videoId}`}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={selectedVideo.snippet.title}
              ></iframe>
              <h2>{selectedVideo.snippet.title}</h2>
              <div className="video-details">
                <p className="channel-name">{selectedVideo.snippet.channelTitle}</p>
                <button className="subscribe-button">Subscribe</button>
                <div className="action-buttons">
                  <button className="like-button">Like</button>
                  <button className="dislike-button">Dislike</button>
                  <button className="download-button">Download</button>
                  <button className="clip-button">Clip</button>
                </div>
              </div>
              <div className="description-box">
                <p>{selectedVideo.snippet.description}</p>
              </div>
            </>
          )}
        </div>

        <div className="video-list">
          {results.length > 0 && results.map((result, index) => (
            <div key={index} className="video-item" onClick={() => handleVideoSelect(result)}>
              <img src={result.snippet.thumbnails.default.url} alt={result.snippet.title} />
              <div>
                <h3>{result.snippet.title}</h3>
                {/* <p>{result.snippet.description}</p> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
