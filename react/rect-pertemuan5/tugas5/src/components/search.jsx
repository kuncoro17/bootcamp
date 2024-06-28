import React, { Component, createRef } from 'react';
import { performSearch } from '../Controllers/searchController';
import './Search.css'; // Import the CSS file

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      results: [],
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
      this.setState({ results: response.results, error: null });
    } else if (response.error) {
      this.setState({ error: response.error });
    }
  };

  render() {
    const containerStyles = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: '20px'
    };

    const inputContainerStyles = {
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
      marginBottom: '20px'
    };

    const inputStyles = {
      fontSize: '1rem',
      padding: '10px',
      width: '80%',
      marginRight: '10px'
    };

    const buttonStyles = {
      padding: '10px 20px',
      fontSize: '1rem',
      cursor: 'pointer'
    };

    const { results, error } = this.state;

    return (
      <div style={containerStyles}>
        <div style={inputContainerStyles}>
          <input
            type="text"
            ref={this.inputRef}
            style={inputStyles}
            placeholder="Enter search query"
            value={this.state.query}
            onChange={this.handleInputChange}
          />
          <button style={buttonStyles} onClick={this.performSearch}>Search</button>
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <div className="image-grid">
          {results.length > 0 && results.map((result, index) => (
            <div key={index} className="image-item">
              <p>ID: {result.id}</p>
              <p>Description: {result.description || 'No description'}</p>
              <img src={result.urls.small} alt={result.description || 'Image'} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Search;
