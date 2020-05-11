import { createCard } from './createCard.js';
import { createVideoCard } from './createVideoCard.js';
import { toggleModal } from './toggleModal.js';

const KEY = '51669788a26741668f1b7c5945d50131';
const GOOGLE_KEY = 'AIzaSyCFOgHnJRsojlI70HlZ1HGoDF2bS2u1pYA';

const fetchVideos = async term => {
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
    console.log(response.data.items);
  } catch (error) {
    console.log('error');
  }
};

const handleShowVideos = () => {
  if (search.input.value) {
    mainLink.style = 'border-bottom: none';
    bookmarksLink.style = 'border-bottom: none';
    videosLink.style = 'border-bottom: 1px solid black';
    fetchVideos(search.input.value);
  }
};

const renderVideos = items => {
  main.innerHTML = '';
  items.forEach(item => (main.innerHTML += createVideoCard(item)));
};

const fetchRecipes = async term => {
  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/search?apiKey=${KEY}&query=${term}&number=10`
    );
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
    localStorage.setItem(id, JSON.stringify(response.data));
    renderInstructions(id, response.data.analyzedInstructions[0].steps);
    renderIngredients(id, response.data.extendedIngredients);
  } catch (error) {
    console.log('error');
  }
};

const renderInstructions = (id, data) => {
  const instructionList = document.getElementById(`${id}-instructions`);
  data.forEach(each => (instructionList.innerHTML += `<li>${each.step}</li>`));
};

const renderIngredients = (id, data) => {
  const ingredientList = document.getElementById(`${id}-ingredients`);
  data.forEach(
    each => (ingredientList.innerHTML += `<li>${each.original}</li>`)
  );
};

const handleSubmit = e => {
  e.preventDefault();
  mainLink.style = 'border-bottom: 1px solid black';
  bookmarksLink.style = 'border-bottom: none';
  videosLink.style = 'border-bottom: none';
  main.innerHTML = '';
  fetchRecipes(search.input.value);
};

const handleShowBookmarks = e => {
  console.log(e.target.style);
  mainLink.style = 'border-bottom: none';
  bookmarksLink.style = 'border-bottom: 1px solid black';
  videosLink.style = 'border-bottom: none';
  main.innerHTML = '';
  const bookmarks = localStorage.getItem('foodie-bookmarks').split(',');
  bookmarks.forEach(item => fetchBookmark(item));
};

const fetchBookmark = item => {
  const data = JSON.parse(localStorage.getItem(item));
  if (data) {
    main.innerHTML += createCard(data);
    renderInstructions(item, data.analyzedInstructions[0].steps);
    renderIngredients(item, data.extendedIngredients);
  }
};

const toggleFilters = () => {
  filters.innerHTML = 'hello';
};

const search = document.getElementById('search');
const main = document.getElementById('main');
const filters = document.getElementById('filters');
const filterLink = document.getElementById('filter-dropdown');
const mainLink = document.getElementById('main-link');
const bookmarksLink = document.getElementById('bookmarks-link');
const videosLink = document.getElementById('videos-link');

window.addEventListener('click', e => toggleModal(e));
search.addEventListener('submit', e => handleSubmit(e));
mainLink.addEventListener('click', e => handleSubmit(e));
bookmarksLink.addEventListener('click', e => handleShowBookmarks(e));
videosLink.addEventListener('click', handleShowVideos);
filterLink.addEventListener('click', toggleFilters);
