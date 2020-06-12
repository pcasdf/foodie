import { createCard } from './card.component.js';
import {
  renderIngredients,
  renderInstructions,
  renderVideos
} from './renders.js';

const KEY = '51669788a26741668f1b7c5945d50131';
const GOOGLE_KEY = 'AIzaSyBDM8oZkVeVWynHNxPrTae65xATvPbW1qA';

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

    const currentState = [];
    response.data.items.forEach(each => currentState.push(each.id.videoId));
    localStorage.setItem('current-state', JSON.stringify(currentState));
    renderVideos(response.data.items);
  } catch (error) {
    console.log('error');
  }
};

export const fetchRecipes = async term => {
  const filters = JSON.parse(localStorage.getItem('filters'));
  const dietParams = filters.diet.join(',');
  const intoleranceParams = filters.intolerance.join(',');

  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/search?apiKey=${KEY}&query=${term}&number=1000&diet=${dietParams}&intolerances=${intoleranceParams}`
    );
    console.log(response.data.results);
    localStorage.setItem('response', JSON.stringify(response.data.results));
    fetchPage();
  } catch (error) {
    console.log('error');
  }
};

export const fetchPage = () => {
  const index = localStorage.getItem('recipe-index');
  const response = JSON.parse(localStorage.getItem('response'));
  const currentState = [];
  localStorage.setItem('current-state', JSON.stringify(currentState));

  for (let i = index - 12; i < index; i++) {
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
    console.log('error');
  }

  const currentState = JSON.parse(localStorage.getItem('current-state'));
  currentState.push(id.toString());
  localStorage.setItem('current-state', JSON.stringify(currentState));

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
