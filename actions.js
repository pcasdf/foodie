import { createCard } from './createCard.js';
import {
  renderIngredients,
  renderInstructions,
  renderVideos
} from './renders.js';

const KEY = '51669788a26741668f1b7c5945d50131';
const GOOGLE_KEY = 'AIzaSyCFOgHnJRsojlI70HlZ1HGoDF2bS2u1pYA';

export const fetchVideos = async term => {
  try {
    const response = await axios.get(
      'https://www.googleapis.com/youtube/v3/search',
      {
        params: {
          q: term,
          part: 'snippet',
          type: 'video',
          maxResults: 10,
          key: GOOGLE_KEY
        }
      }
    );
    renderVideos(response.data.items);
  } catch (error) {
    console.log('error');
  }
};

export const fetchRecipes = async term => {
  const filters = localStorage.getItem('filter-state').split(',');
  const updatedFilters = filters.filter(item => item !== '');
  const queryParams = updatedFilters.join(',');
  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/search?apiKey=${KEY}&query=${term}&number=3&diet=${queryParams}&intolerances=${queryParams}`
    );

    localStorage.setItem('foodie-state', '');
    localStorage.setItem('foodie-filtered', '');
    console.log(localStorage.getItem('foodie-state'));
    response.data.results.forEach(item => fetchDetails(item.id));
  } catch (error) {
    console.log('error');
  }
};

const fetchDetails = async id => {
  const main = document.getElementById('main');
  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${KEY}`
    );

    main.innerHTML += createCard(response.data);

    const prevState = localStorage.getItem('foodie-state');
    localStorage.setItem('foodie-state', prevState + ',' + id);
    localStorage.setItem(id, JSON.stringify(response.data));

    renderInstructions(id, response.data.analyzedInstructions[0].steps);
    renderIngredients(id, response.data.extendedIngredients);
  } catch (error) {
    console.log('error');
  }
};

export const fetchBookmark = item => {
  const data = JSON.parse(localStorage.getItem(item));
  if (data) {
    main.innerHTML += createCard(data);
    if (data.analyzedInstructions.length > 0) {
      renderInstructions(item, data.analyzedInstructions[0].steps);
    }
    renderIngredients(item, data.extendedIngredients);
  }
};
