import axios from 'axios';

const API_URL = process.env.REACT_APP_DOG_API_URL;
const API_KEY = process.env.REACT_APP_DOG_API_KEY;

const callAPI = async (url, params = null) => {

    const requestConfig = {
      baseURL: API_URL,
      headers: {
        'x-api-key': API_KEY
      },
      url
    };

    if (params) {
      requestConfig.params = params;
    }
    try {
      return await axios(requestConfig);
    } catch (err) {
      console.log('axios encountered an error', err);
    }
};


export const  fetchBreeds = async(page, limit=10) => {
    const breeds = await callAPI('breeds', {
        page,
        limit
    });

    return {
        breeds: breeds.data, 
        totalBreeds:breeds.headers['pagination-count']
    };
}

export const fetchPictures = async(breed='', limit = 10)  => {
    if(!breed){
        return [];
    }

    const images = await callAPI('/images/search', {
        breed_id: breed,
        limit
    });
    console.log(images);
    return images.data;
}