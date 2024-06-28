import axios from 'axios';

const ACCESS_TOKEN = 'W_sKDGPXUxHmsPCdX4QSwxfzPSDCbzhrMIk1hsmfKgI'; // Replace with your actual API key

export const performSearch = async (query) => {
  if (query.trim() === '') {
    return { error: 'Query cannot be empty' };
  }

  try {
    const response = await axios.get(`https://api.unsplash.com/search/photos`, {
      params: {
        client_id: ACCESS_TOKEN,
        query: query,
      }
    });
    return { results: response.data.results };
  } catch (error) {
    console.error('Error fetching data:', error);
    if (error.response) {
      return { error: `Error: ${error.response.status} - ${error.response.data.message}` };
    } else if (error.request) {
      return { error: 'Error: No response received from server' };
    } else {
      return { error: `Error: ${error.message}` };
    }
  }
};
