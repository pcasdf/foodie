import { renderState } from './renders.js';

export const renderFilters = () => {
  const filterState = localStorage.getItem('filter-state').split(',');
  const prevState = localStorage.getItem('foodie-state').split(',');
  const state = localStorage.getItem('foodie-filtered').split(',');
  let newState = [];

  for (let each of filterState) {
    if (each !== 'null') {
      if (newState.length === 0) {
        for (let item of state) {
          if (item !== 'null') {
            const data = JSON.parse(localStorage.getItem(item));
            if (data) {
              if (data[each]) {
                if (!newState.includes(item)) {
                  newState.push(item);
                }
              }
            }
          }
        }
      } else {
        for (let item of newState) {
          const data = JSON.parse(localStorage.getItem(item));
          if (!data[each]) {
            newState = newState.filter(recipe => recipe !== item);
          }
        }
      }
    }
  }

  console.log(prevState);
  console.log(state);
  console.log(newState);
  console.log(filterState);

  if (filterState.length <= 1) {
    renderState(prevState);
  } else {
    renderState(newState);
  }
};

export const toggleFilters = () => {
  if (filters.innerHTML === '') {
    filters.innerHTML = `
      <div class='filter-form'>
        <input type='checkbox' id='vegetarian'>
        <label>Vegetarian</label>
      </div>
      <div class='filter-form'>
        <input type='checkbox' id='vegan'>
        <label>Vegan</label>
      </div>
      <div class='filter-form'>
        <input type='checkbox' id='glutenFree'>
        <label>Gluten Free</label>
      </div>
      <div class='filter-form'>
        <input type='checkbox' id='dairyFree'>
        <label>Dairy Free</label>
      </div>
    `;
    localStorage.setItem(
      'foodie-filtered',
      localStorage.getItem('foodie-state')
    );
  } else {
    filters.innerHTML = '';
  }
};
