# foodie

## Description

Foodie is a single page application that allows users to search and filter through recipes with multiple parameters including by dish, ingredient, dietary restrictions, and more.

## API

spoonacularAPI  
https://spoonacular.com/food-api/docs

## API Snippet

```
{
  "id": 864603,
  "title": "Slow Cooker Bolognese Sauce",
  "readyInMinutes": 510,
  "servings": 16,
  "sourceUrl": "http://littlespicejar.com/slow-cooker-bolognese-sauce/",
  "openLicense": 0,
  "image": "slow-cooker-bolognese-sauce-864603.jpg"
}
```

## Wireframes

![landing page](https://git.generalassemb.ly/pcho90/foodie/blob/master/proposal/landing-page.jpg)
![videos](https://git.generalassemb.ly/pcho90/foodie/blob/master/proposal/videos.jpg)
![bookmarks](https://git.generalassemb.ly/pcho90/foodie/blob/master/proposal/bookmarks.jpg)

## MVP

- Recipe search functionality.
- Interactive UI.
- Filter recipes by ingredients, cuisine, and more.

## Post-MVP

- Bookmark favorites into local storage.
- YouTube Video Search

## Goals

| Day      | Deliverable                               | Status     |
| -------- | ----------------------------------------- | ---------- |
| May 8    | Project Prompt                            | Complete   |
| May 9-10 | Wireframes / Priority Matrix / Timeframes | Complete   |
| May 11   | HTML, Fetching API                        | Complete   |
| May 12   | UI Interactivity                          | Complete   |
| May 13   | CSS                                       | Complete   |
| May 14   | Final Touches                             | Complete   |
| May 15   | Present                                   | Incomplete |

## Priority Matrix

![priority matrix](https://git.generalassemb.ly/pcho90/foodie/blob/master/proposal/priority-matrix-1.jpg)

## Timeframes

| Component      | Priority | Estimated Time | Time Invested | Actual Time |
| -------------- | :------: | :------------: | :-----------: | :---------: |
| HTML           |    H     |      4hrs      |     4hrs      |    4hrs     |
| Rendering List |    H     |      2hrs      |     3hrs      |    3hrs     |
| Toggle Details |    H     |      6hrs      |     4hrs      |    4hrs     |
| Filters        |    M     |      4hrs      |     6hrs      |    6hrs     |
| Bookmarks      |    M     |      2hrs      |     2hrs      |    2hrs     |
| CSS            |    M     |      4hrs      |     6hrs      |    6hrs     |
| YouTube Stream |    L     |      4hrs      |      1hr      |     1hr     |
| YouTube Modal  |    L     |      2hrs      |      1hr      |     1hr     |
| Total          |    H     |     30hrs      |     27hrs     |    27hrs    |

## Code Snippet

This is the main logic code that drives the filter functionality. The function uses separate references to the filtered state and non-filtered state to enable reverse filtering.

```
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
```

## Change Log

When this application was initially deployed, the search component received the GET requests to the API but wouldn't render them to the DOM, although the same code would render properly when tested locally. I found that this is related to the asynchronicity of the request, becausre the component continues to make requests as it passes the data to another component to render the response. I found two fixes to this issue. The first method is to add awaits to the passing of the responses, and the second is to save the responses to local storage. I opted for the latter method because that allows me to reference the same data at a later point, from anywhere in the application, without making further GET requests.
