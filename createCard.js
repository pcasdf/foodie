export const createCard = item => {
  const {
    id,
    image,
    title,
    servings,
    preparationMinutes,
    readyInMinutes,
    glutenFree,
    vegan
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
        <div class='modal-content'>

          <div class='modal-header'>

            <div class='modal-img'>
              <img src='${image}'>
            </div>

            <div class='modal-details'>
              <h2>${title}</h2>
              <p>Servings: ${servings}</p>
              <p>Prep Time: ${preparationMinutes} minutes</p>
              <p>Cook Time: ${readyInMinutes} minutes</p>
              <p>${glutenFree ? 'Gluten Free' : ''}</p>
              <p>${vegan ? 'Vegan' : ''}</p>
              <button class='button' id='${id}'>
              ${
                localStorage.getItem('foodie-bookmarks').includes(id)
                  ? 'Remove Bookmark'
                  : 'Bookmark'
              }
              </button>
            </div>

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

          <div class='modal-footer'>
            bookmark / share links
          </div>
          
        </div>
      </div>

    </div>
  `;

  return card;
};
