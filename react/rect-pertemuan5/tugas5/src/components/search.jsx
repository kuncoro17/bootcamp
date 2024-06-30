import React, { Component, createRef } from 'react';
import { performSearch } from '../Controllers/searchController';
import './Search.css'; // Import the CSS file

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      results: [],
      selectedVideo: null,
      error: null,
    };
    this.inputRef = createRef();
  }

  componentDidMount() {
    // Automatically focus on the input when the component mounts
    if (this.inputRef.current) {
      this.inputRef.current.focus();
    }
  }

  handleInputChange = (event) => {
    this.setState({ query: event.target.value });
  };

  performSearch = async () => {
    const { query } = this.state;
    const response = await performSearch(query);

    if (response.results) {
      this.setState({ results: response.results, selectedVideo: response.results[0], error: null });
    } else if (response.error) {
      this.setState({ error: response.error });
    }
  };

  handleVideoSelect = (video) => {
    this.setState({ selectedVideo: video });
  };

  render() {
    const { results, selectedVideo, error } = this.state;

    return (
      <div className="container">
        <div className="input-container">
          <input
            type="text"
            ref={this.inputRef}
            className="search-input"
            placeholder="Enter search query"
            value={this.state.query}
            onChange={this.handleInputChange}
          />
          <button className="search-button" onClick={this.performSearch}>Search</button>
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
              <div key={index} className="video-item" onClick={() => this.handleVideoSelect(result)}>
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
  }
}

export default Search;
