import { toggleModal } from './modal.component.js';
import { fetchRecipes, fetchVideos } from './actions.js';
import { renderBookmarks } from './renders.js';
import { handleFilters, toggleFilters } from './filters.js';
import { videoNavigation } from './video-navigation.component.js';

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
  videoNav.innerHTML = '';

  resetFilters();
  renderBookmarks();
};

const handleShowVideos = () => {
  if (search.input.value) {
    mainLink.style = none;
    bookmarksLink.style = none;
    videosLink.style = border;
    videoNav.innerHTML = '';
    videoNav.innerHTML += videoNavigation();

    localStorage.setItem('video-page-min', '1');
    localStorage.setItem('video-page-max', '10');
    const pageMin = localStorage.getItem('video-page-min');
    const pageMax = localStorage.getItem('video-page-max');

    const videoStatus = document.getElementById('video-status');
    videoStatus.innerText = `Showing results ${pageMin} - ${pageMax}`;

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

const handleVideoNav = e => {
  const prevPageMin = localStorage.getItem('video-page-min');
  const prevPageMax = localStorage.getItem('video-page-max');

  if (e.target.id === 'video-next') {
    const pageToken = localStorage.getItem('next-vid');

    localStorage.setItem('video-page-min', +prevPageMin + 10);
    localStorage.setItem('video-page-max', +prevPageMax + 10);

    fetchVideos(search.input.value, pageToken);
  } else if (e.target.id === 'video-prev') {
    const pageToken = localStorage.getItem('prev-vid');

    localStorage.setItem('video-page-min', +prevPageMin - 10);
    localStorage.setItem('video-page-max', +prevPageMax - 10);

    fetchVideos(search.input.value, pageToken);
  }

  const pageMin = localStorage.getItem('video-page-min');
  const pageMax = localStorage.getItem('video-page-max');
  const videoStatus = document.getElementById('video-status');

  videoStatus.innerText = `Showing results ${pageMin} - ${pageMax}`;
  scroll(0, 225);
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

if (!localStorage.getItem('foodie-bookmarks')) {
  localStorage.setItem('foodie-bookmarks', '');
}

resetFilters();
