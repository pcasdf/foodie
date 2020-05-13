import { createCard } from './card.component.js';
import {
  renderIngredients,
  renderInstructions,
  renderVideos
} from './renders.js';

const KEY = '51669788a26741668f1b7c5945d50131';
const GOOGLE_KEY = 'AIzaSyACGwyCMNDgQcweesXc_uCuc7EZ_I6FOA8';

export const fetchVideos = async (term, token) => {
  try {
    const response = await axios.get(
      'https://www.googleapis.com/youtube/v3/search',
      {
        params: {
          q: term,
          part: 'snippet',
          type: 'video',
          maxResults: 10,
          pageToken: token,
          key: GOOGLE_KEY
        }
      }
    );
    localStorage.setItem('next-video', response.data.nextPageToken);
    localStorage.setItem('prev-video', response.data.prevPageToken);
    console.log(response.data);
    renderVideos(response.data.items);
  } catch (error) {
    console.log('error');
  }
};

export const fetchRecipes = async term => {
  const dietParams = localStorage
    .getItem('diet-params')
    .split(',')
    .filter(each => each !== '')
    .join(',');
  const intoleranceParams = localStorage
    .getItem('intolerance-params')
    .split(',')
    .filter(each => each !== '')
    .join(',');

  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/search?apiKey=${KEY}&query=${term}&number=12&diet=${dietParams}&intolerances=${intoleranceParams}`
    );
    console.log(response);
    localStorage.setItem('foodie-state', '');
    localStorage.setItem('foodie-filtered', '');
    localStorage.setItem('total-results', response.data.totalResults);
    console.log(localStorage.getItem('total-results'));
    response.data.results.forEach(item => fetchDetails(item.id));
  } catch (error) {
    console.log('error');
  }
};

const fetchDetails = async id => {
  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${KEY}`
    );
    localStorage.setItem(id, JSON.stringify(response.data));
    const prevState = localStorage.getItem('foodie-state');
    localStorage.setItem('foodie-state', prevState + ',' + id);
  } catch (error) {
    console.log('wtf');
  }

  const item = JSON.parse(localStorage.getItem(id));
  const main = document.getElementById('main');
  main.innerHTML += createCard(item);

  renderInstructions(id, item.analyzedInstructions[0].steps);
  renderIngredients(id, item.extendedIngredients);
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
