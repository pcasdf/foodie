import { createVideoCard } from './createVideoCard.js';
import { fetchBookmark } from './actions.js';

export const renderInstructions = (id, data) => {
  const instructionList = document.getElementById(`${id}-instructions`);
  data.forEach(each => (instructionList.innerHTML += `<li>${each.step}</li>`));
};

export const renderIngredients = (id, data) => {
  const ingredientList = document.getElementById(`${id}-ingredients`);
  data.forEach(
    each => (ingredientList.innerHTML += `<li>${each.original}</li>`)
  );
};

export const renderVideos = items => {
  main.innerHTML = '';
  items.forEach(item => (main.innerHTML += createVideoCard(item)));
};

export const renderBookmarks = items => {
  main.innerHTML = '';
  const bookmarks = localStorage.getItem('foodie-bookmarks').split(',');
  bookmarks.forEach(item => fetchBookmark(item));
};
