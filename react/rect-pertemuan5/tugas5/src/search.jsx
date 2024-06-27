import React, { Component } from 'react';
import axios from 'axios';

const ACCESS_TOKEN = 'W_sKDGPXUxHmsPCdX4QSwxfzPSDCbzhrMIk1hsmfKgI'; // Replace with your actual API key

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      results: [], // Expecting an array of results
      error: null,
    };
  }

  // Method to handle input change
  handleInputChange = (event) => {
    this.setState({ query: event.target.value });
  };

  // Method to perform search using axios
  performSearch = () => {
    const { query } = this.state;
    if (query.trim() === '') {
      return;
    }

    axios.get(`https://api.unsplash.com/search/photos`, {
      params: {
        client_id: ACCESS_TOKEN,
        query: query,
      }
    })
      .then(response => {
        console.log(response.data.results);
        this.setState({ results: response.data.results, error: null });
      })
      .catch(error => {
        // Log the error response for debugging
        console.error('Error fetching data:', error);
        if (error.response) {
          this.setState({ error: `Error: ${error.response.status} - ${error.response.data.message}` });
        } else if (error.request) {
          this.setState({ error: 'Error: No response received from server' });
        } else {
          this.setState({ error: `Error: ${error.message}` });
        }
      });
  };

  // Lifecycle method: componentDidMount
  componentDidMount() {
    // Any initialization if required
  }

  // Lifecycle method: componentWillUnmount
  componentWillUnmount() {
    // Any cleanup if required
  }

  render() {
    const searchStyles = {
      textAlign: 'center',
      fontSize: '1.5rem',
      fontWeight: 'bold',
      marginTop: '20px'
    };

    const inputStyles = {
      fontSize: '1rem',
      padding: '10px',
      width: '80%',
      marginBottom: '20px'
    };

    const buttonStyles = {
      padding: '10px 20px',
      fontSize: '1rem',
      cursor: 'pointer'
    };

    const resultStyles = {
      textAlign: 'left',
      fontSize: '1.2rem',
      marginTop: '20px',
      marginLeft: '10%'
    };

    const { results, error } = this.state;

    return (
      <div style={searchStyles}>
        <input
          type="text"
          style={inputStyles}
          placeholder="Enter search query"
          value={this.state.query}
          onChange={this.handleInputChange}
        />
        <button style={buttonStyles} onClick={this.performSearch}>Search</button>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <div style={resultStyles}>
          {results.length > 0 && results.map((result, index) => (
            <div key={index}>
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
