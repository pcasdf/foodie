import { toggleModal } from './toggleModal.js';
import { fetchRecipes, fetchVideos } from './actions.js';
import { renderBookmarks } from './renders.js';
import { renderFilters, toggleFilters } from './filters.js';

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

const handleFilters = e => {
  const filterState = localStorage.getItem('filter-state').split(',');
  const dietParams = localStorage.getItem('diet-params').split(',');
  const intoleranceParams = localStorage
    .getItem('intolerance-params')
    .split(',');
  let updatedDietParams = [];
  let updatedIntoleranceParams = [];

  if (e.target.checked) {
    if (!filterState.includes(e.target.id)) {
      localStorage.setItem('filter-state', filterState + ',' + e.target.id);
    }
    switch (e.target.id) {
      case 'vegetarian':
        if (!dietParams.includes('vegetarian')) {
          dietParams.push('vegetarian');
          break;
        }
      case 'vegan':
        if (!dietParams.includes('vegan')) {
          dietParams.push('vegan');
          break;
        }
      case 'glutenFree':
        if (!intoleranceParams.includes('gluten')) {
          intoleranceParams.push('gluten');
          break;
        }
      case 'dairyFree':
        if (!intoleranceParams.includes('dairy')) {
          intoleranceParams.push('dairy');
          break;
        }
      default:
        return null;
    }
    localStorage.setItem('diet-params', dietParams.join(','));
    localStorage.setItem('intolerance-params', intoleranceParams.join(','));
  } else {
    const nextFilterState = filterState
      .filter(each => each !== e.target.id)
      .join(',');
    localStorage.setItem('filter-state', nextFilterState);
    switch (e.target.id) {
      case 'vegetarian':
        updatedDietParams = dietParams.filter(each => each !== 'vegetarian');
        break;
      case 'vegan':
        updatedDietParams = dietParams.filter(each => each !== 'vegan');
        break;
      case 'glutenFree':
        updatedIntoleranceParams = intoleranceParams.filter(
          each => each !== 'gluten'
        );
        break;
      case 'dairyFree':
        updatedIntoleranceParams = intoleranceParams.filter(
          each => each !== 'dairy'
        );
        break;
      default:
        return null;
    }
    localStorage.setItem('diet-params', updatedDietParams.join(','));
    localStorage.setItem(
      'intolerance-params',
      updatedIntoleranceParams.join(',')
    );
  }

  console.log(localStorage.getItem('diet-params'));
  console.log(localStorage.getItem('intolerance-params'));
  renderFilters();
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
filters.addEventListener('click', handleFilters);

const resetFilters = () => {
  filters.innerHTML = '';
  localStorage.setItem('filter-state', '');
  localStorage.setItem('foodie-state', '');
  localStorage.setItem('diet-params', '');
  localStorage.setItem('intolerance-params', '');
};

resetFilters();
