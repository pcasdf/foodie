export const createCard = item => {
  const {
    id,
    image,
    title,
    servings,
    preparationMinutes,
    readyInMinutes,
    glutenFree,
    vegan,
    summary,
    sourceUrl,
    healthScore,
    spoonacularScore
  } = item;
  const card = `
    <div class='recipe' id='${id}-div'>

      <div class='recipe-img'>
        <img src='${image}' id='${id}'>
      </div>

      <div class='recipe-content'>
        <h4 id='${id}'>${title}</h4>
      </div>

      <div class='modal' id='${id}-modal'>
        <div class='go-prev' id='${id}'><</div>
        <div class='go-next' id='${id}'>></div>
        <div class='modal-content'>
          <div class='modal-top'>
            <div class='modal-title'>
              <span>${title}</span>
            </div>
            <div class='modal-header'>
              <div class='modal-img'>
                <img src='${image}'>
              </div>

              <div class='modal-details'>
                <div class='modal-details-2'>
                  <p>Servings: ${servings}</p>
                  <p>Prep: ${
                    preparationMinutes ? preparationMinutes + ' minutes' : ''
                  }</p>
                  <p>Cook Time: ${readyInMinutes} minutes</p>
                  <p>Health Score: ${healthScore}</p>
                  <p>Spoonacular Score: <span style='color: ${scoreCheck(
                    spoonacularScore
                  )}'>${spoonacularScore}</span></p>
                  <p>${glutenFree ? 'Gluten Free' : ''}</p>
                  <p>${vegan ? 'Vegan' : ''}</p>
                </div>

                <button class='button' id='${id}'>
                ${
                  localStorage.getItem('bookmarks').includes(id)
                    ? 'Remove Bookmark'
                    : 'Add Bookmark'
                }
                </button>
              </div>
            </div>
          </div>

          <div class='modal-description'>
            <p class='summary'>${summary}</p>
            <p class='source'>Source: <a href='${sourceUrl}'>${sourceUrl}</a></p>
          </div>

          <div class='modal-body'>
            <div class='modal-ingredients'>
              <ul id='${id}-ingredients' class='ingredients'>
              </ul>
            </div>

            <div class='modal-instructions'>
              <ol id='${id}-instructions'>
              </ol>
            </div>
          </div>
        </div>
      </div>

    </div>
  `;

  return card;
};

const scoreCheck = score => {
  if (score > 79) {
    return '#32CD32';
  } else if (score > 59) {
    return '#FFFF00';
  } else if (score > 39) {
    return 'orange';
  } else {
    return 'red';
  }
};
