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
    localStorage.setItem('video-response', JSON.stringify(response.data.items));
    renderVideos(JSON.parse(localStorage.getItem('video-response')));
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
      `https://api.spoonacular.com/recipes/search?apiKey=${KEY}&query=${term}&number=300&diet=${dietParams}&intolerances=${intoleranceParams}`
    );

    localStorage.setItem('foodie-state', '');
    localStorage.setItem('foodie-filtered', '');
    localStorage.setItem('total-results', response.data.totalResults);
    localStorage.setItem(
      'response-data',
      JSON.stringify(response.data.results)
    );

    fetchPage();
  } catch (error) {
    console.log('error');
  }
};

export const fetchPage = () => {
  const index = localStorage.getItem('recipe-index');
  const response = JSON.parse(localStorage.getItem('response-data'));
  localStorage.setItem('foodie-state', '');

  for (let i = index - 12; i < index; i++) {
    const prevState = localStorage.getItem('foodie-state');
    localStorage.setItem('foodie-state', prevState + ',' + response[i].id);

    fetchDetails(response[i].id);
  }
};

const fetchDetails = async id => {
  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${KEY}`
    );
    localStorage.setItem(id, JSON.stringify(response.data));
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
