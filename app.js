import { toggleModal } from './toggleModal.js';
import { fetchRecipes, fetchVideos } from './actions.js';
import { renderBookmarks } from './renders.js';
import { handleFilters, toggleFilters } from './filters.js';

const border = 'border-bottom: 1px solid black';
const none = 'border-bottom: none';

const handleSubmit = e => {
  e.preventDefault();

  mainLink.style = border;
  bookmarksLink.style = none;
  videosLink.style = none;

  main.innerHTML = '';

  fetchRecipes(search.input.value);
};

const handleShowBookmarks = e => {
  mainLink.style = none;
  bookmarksLink.style = border;
  videosLink.style = none;

  main.innerHTML = '';

  resetFilters();
  renderBookmarks();
};

const handleShowVideos = () => {
  if (search.input.value) {
    mainLink.style = none;
    bookmarksLink.style = none;
    videosLink.style = border;

    resetFilters();
    fetchVideos(search.input.value);
  }
};

const resetFilters = () => {
  filters.innerHTML = '';
  localStorage.setItem('filter-state', '');
  localStorage.setItem('foodie-state', '');
  localStorage.setItem('diet-params', '');
  localStorage.setItem('intolerance-params', '');
};

const search = document.getElementById('search');
const main = document.getElementById('main');
const filters = document.getElementById('filters');
const filterLink = document.getElementById('filter-dropdown');
const mainLink = document.getElementById('main-link');
const bookmarksLink = document.getElementById('bookmarks-link');
const videosLink = document.getElementById('videos-link');

addEventListener('click', e => toggleModal(e));
search.addEventListener('submit', e => handleSubmit(e));
mainLink.addEventListener('click', e => handleSubmit(e));
bookmarksLink.addEventListener('click', e => handleShowBookmarks(e));
videosLink.addEventListener('click', handleShowVideos);
filterLink.addEventListener('click', toggleFilters);
filters.addEventListener('click', handleFilters);

if (!localStorage.getItem('foodie-bookmarks')) {
  localStorage.setItem('foodie-bookmarks', '');
}

resetFilters();
