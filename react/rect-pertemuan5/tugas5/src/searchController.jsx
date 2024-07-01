import axios from 'axios';

const ACCESS_TOKEN = 'AIzaSyApU4ZlTvQnyIMJCmvf_mfc8eA0EKMz98Q'; // Replace with your actual API key

export const performSearch = async (query) => {
  if (query.trim() === '') {
    return { error: 'Query cannot be empty' };
  }

  try {
    const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        key: ACCESS_TOKEN,
        q: query,
        part: 'snippet',
        type: 'video'
      }
    });
    return { results: response.data.items };
  } catch (error) {
    console.error('Error fetching data:', error);
    if (error.response) {
      return { error: `Error: ${error.response.status} - ${error.response.data.error.message}` };
    } else if (error.request) {
      return { error: 'Error: No response received from server' };
    } else {
      return { error: `Error: ${error.message}` };
    }
  }
};
