import { renderState } from './renders.js';

export const handleFilters = e => {
  let filters = localStorage.getItem('filters');

  if (!filters) {
    filters = {
      diet: [],
      intolerance: []
    };
  } else {
    filters = JSON.parse(filters);
  }

  if (e.target.checked) {
    switch (e.target.id) {
      case 'vegetarian':
        filters = {
          ...filters,
          diet: [...filters.diet, 'vegetarian']
        };
        break;
      case 'vegan':
        filters = {
          ...filters,
          diet: [...filters.diet, 'vegan']
        };
        break;
      case 'glutenFree':
        filters = {
          ...filters,
          intolerance: [...filters.intolerance, 'gluten']
        };
        break;
      case 'dairyFree':
        filters = {
          ...filters,
          intolerance: [...filters.intolerance, 'dairy']
        };
    }
  } else {
    switch (e.target.id) {
      case 'vegetarian':
        filters = {
          ...filters,
          diet: filters.diet.filter(item => item !== 'vegetarian')
        };
        break;
      case 'vegan':
        filters = {
          ...filters,
          diet: filters.diet.filter(item => item !== 'vegan')
        };
        break;
      case 'glutenFree':
        filters = {
          ...filters,
          intolerance: filters.intolerance.filter(item => item !== 'gluten')
        };
        break;
      case 'dairyFree':
        filters = {
          ...filters,
          intolerance: filters.intolerance.filter(item => item !== 'dairy')
        };
    }
  }

  localStorage.setItem('filters', JSON.stringify(filters));
  renderFilters();
};

export const renderFilters = () => {
  const filters = JSON.parse(localStorage.getItem('filters'));
  let state = JSON.parse(localStorage.getItem('current-state'));
  let filteredState = [];

  for (let each in filters) {
    for (let param of filters[each]) {
      if (filteredState.length === 0) {
        for (let item of state) {
          const data = JSON.parse(localStorage.getItem(item));
          if (data[param]) {
            filteredState.push(item);
          }
        }
      } else {
        for (let item of filteredState) {
          const data = JSON.parse(localStorage.getItem(item));
          if (!data[param]) {
            filteredState = filteredState.filter(ea => ea !== item);
          }
        }
      }
    }
  }

  if (filters.diet.length < 1 && filters.intolerance.length < 1) {
    renderState(state);
  } else {
    renderState(filteredState);
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
  } else {
    filters.innerHTML = '';
  }
};
