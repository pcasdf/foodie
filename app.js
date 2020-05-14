import { toggleModal } from './modal.component.js';
import { fetchRecipes, fetchVideos, fetchPage } from './actions.js';
import { renderBookmarks } from './renders.js';
import { handleFilters, toggleFilters } from './filters.js';
import { videoNavigation } from './video-navigation.component.js';
import { recipeNavigation } from './recipe-navigation.component.js';

const border = 'border-bottom: 1px solid black';
const none = 'border-bottom: none';

const handleSubmit = e => {
  e.preventDefault();

  mainLink.style = border;
  bookmarksLink.style = none;
  videosLink.style = none;

  main.innerHTML = '';
  videoNav.innerHTML = '';
  recipeNav.innerHTML = '';

  fetchRecipes(search.input.value);

  recipeNav.innerHTML += recipeNavigation();

  localStorage.setItem('recipe-index', '12');
  const recipeIndex = localStorage.getItem('recipe-index');

  const recipeStatus = document.getElementById('recipe-status');
  recipeStatus.innerText = `Showing results ${
    recipeIndex - 11
  } - ${recipeIndex}`;
};

const handleShowBookmarks = e => {
  mainLink.style = none;
  bookmarksLink.style = border;
  videosLink.style = none;

  main.innerHTML = '';
  videoNav.innerHTML = '';
  recipeNav.innerHTML = '';

  resetFilters();
  renderBookmarks();
};

const handleShowVideos = () => {
  if (search.input.value) {
    mainLink.style = none;
    bookmarksLink.style = none;
    videosLink.style = border;
    videoNav.innerHTML = '';
    recipeNav.innerHTML = '';
    videoNav.innerHTML += videoNavigation();

    localStorage.setItem('video-index', '10');
    const videoIndex = localStorage.getItem('video-index');

    const videoStatus = document.getElementById('video-status');
    videoStatus.innerText = `Showing results ${videoIndex - 9} - ${videoIndex}`;

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

const handleRecipeNav = e => {
  let recipeIndex = localStorage.getItem('recipe-index');

  if (e.target.id === 'recipe-next') {
    localStorage.setItem('recipe-index', +recipeIndex + 12);
    main.innerHTML = '';
    fetchPage();
  } else if (e.target.id === 'recipe-prev') {
    if (recipeIndex >= 24) {
      localStorage.setItem('recipe-index', +recipeIndex - 12);
      main.innerHTML = '';
      fetchPage();
    }
  }

  const recipeStatus = document.getElementById('recipe-status');
  recipeIndex = localStorage.getItem('recipe-index');
  recipeStatus.innerText = `Showing results ${
    recipeIndex - 11
  } - ${recipeIndex}`;
  scroll(0, 225);
};

const handleVideoNav = e => {
  let videoIndex = localStorage.getItem('video-index');

  if (e.target.id === 'video-next') {
    const pageToken = localStorage.getItem('next-video');

    localStorage.setItem('video-index', +videoIndex + 10);

    fetchVideos(search.input.value, pageToken);
  } else if (e.target.id === 'video-prev') {
    const pageToken = localStorage.getItem('prev-video');

    localStorage.setItem('video-index', +videoIndex - 10);

    fetchVideos(search.input.value, pageToken);
  }

  const videoStatus = document.getElementById('video-status');
  videoIndex = localStorage.getItem('video-index');
  videoStatus.innerText = `Showing results ${videoIndex - 9} - ${videoIndex}`;
  scroll(0, 225);
};

const handleKeyNav = e => {
  if (e.keyCode === 37) {
    const id = localStorage.getItem('current-modal');
    const state = JSON.parse(localStorage.getItem('current-state'));
    const next = state[state.indexOf(id) - 1];
    const currentModal = document.getElementById(`${id}-modal`);
    const nextModal = document.getElementById(`${next}-modal`);

    localStorage.setItem('current-modal', next);
    currentModal.style.display = 'none';
    nextModal.style.display = 'block';
  } else if (e.keyCode === 39) {
    const id = localStorage.getItem('current-modal');
    const state = JSON.parse(localStorage.getItem('current-state'));
    const next = state[state.indexOf(id) + 1];
    const currentModal = document.getElementById(`${id}-modal`);
    const nextModal = document.getElementById(`${next}-modal`);

    localStorage.setItem('current-modal', next);
    currentModal.style.display = 'none';
    nextModal.style.display = 'block';
  }
};

const search = document.getElementById('search');
const main = document.getElementById('main');
const filters = document.getElementById('filters');
const filterLink = document.getElementById('filter-dropdown');
const mainLink = document.getElementById('main-link');
const bookmarksLink = document.getElementById('bookmarks-link');
const videosLink = document.getElementById('videos-link');
const videoNav = document.getElementById('video-nav');
const recipeNav = document.getElementById('recipe-nav');

addEventListener('click', e => toggleModal(e));
search.addEventListener('submit', e => handleSubmit(e));
mainLink.addEventListener('click', e => handleSubmit(e));
bookmarksLink.addEventListener('click', e => handleShowBookmarks(e));
videosLink.addEventListener('click', handleShowVideos);
filterLink.addEventListener('click', toggleFilters);
filters.addEventListener('click', handleFilters);
videoNav.addEventListener('click', handleVideoNav);
recipeNav.addEventListener('click', handleRecipeNav);
window.addEventListener('keydown', handleKeyNav);

if (!localStorage.getItem('bookmarks')) {
  localStorage.setItem('bookmarks', JSON.stringify([]));
}

localStorage.setItem('current-state', JSON.stringify([]));
localStorage.setItem('filters', JSON.stringify({ diet: [], intolerance: [] }));

resetFilters();
