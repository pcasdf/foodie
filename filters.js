import { renderState } from './renders.js';

export const handleFilters = e => {
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
  renderFilters();
};

export const renderFilters = () => {
  const filterState = localStorage
    .getItem('filter-state')
    .split(',')
    .filter(each => each !== 'null');
  const prevState = localStorage
    .getItem('foodie-state')
    .split(',')
    .filter(each => each !== 'null');
  const state = localStorage
    .getItem('foodie-filtered')
    .split(',')
    .filter(each => each !== 'null');
  let newState = [];

  for (let each of filterState) {
    if (newState.length === 0) {
      for (let item of state) {
        const data = JSON.parse(localStorage.getItem(item));
        if (data) {
          if (data[each]) {
            if (!newState.includes(item)) {
              newState.push(item);
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
