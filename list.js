const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-bar');
const resultsContainer = document.querySelector('[data-search-results]');
const watchListDrawer = document.querySelector('[data-watchlist-drawer]');

let watchList = [];

let query;

// Placeholder content for testing

const results = [
  { title: 'Bad Boys', poster_path: 'https://placehold.co/400', id: 9737},
  { title: 'Bad Boys 2', poster_path: 'https://placehold.co/400', id: 9738},
  { title: 'Bad Boys for life', poster_path: 'https://placehold.co/400', id: 9739},
  { title: 'Bad Boys ride or die', poster_path: 'https://placehold.co/400', id: 9740},
  { title: 'Bad Boys 5', poster_path: 'https://placehold.co/400', id: 9741},
  { title: 'Bad Boys 6', poster_path: 'https://placehold.co/400', id: 9742},
  { title: 'Bad Boys 7', poster_path: 'https://placehold.co/400', id: 9743},
]

updateResultsContainer(results);
updateAddedItems();

// TODO:
// Look for items in watch list and add state for 'already added' to list
// Let's lower the opacity and make cursor not-allowed on hover
// Add disabled attr to add button
// find elements where id matches id in watchList array
// add 'added' class
function updateAddedItems() {
  for (const movie of results) {
    if (watchList.indexOf(movie.id) === -1) {
      movie.added = true;
      return;
    }
  }
}

searchForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  query = encodeURIComponent(searchInput.value);

  const { results } = await searchMovieDatabase(query);

  if (results.length > 0) {
    updateResultsContainer(results);
  }
});

function updateWatchListDrawer() {
  const fragment = new DocumentFragment();

  for (const movie of watchList) {
    const div = document.createElement('div');
    div.classList.add('movie');
    div.dataset.movieId = movie.id;
    const title = document.createElement('h3');
    title.classList.add('title');
    title.textContent = movie.title;
    const posterImg = document.createElement('img');
    posterImg.classList.add('poster');
    posterImg.src = `${movie.poster_path}`;
    div.append(title);
    div.append(posterImg);
    fragment.append(div);
  }

  watchListDrawer.innerHTML = '';
  watchListDrawer.append(fragment);
  if (!watchListDrawer.classList.contains('active')) {
    watchListDrawer.classList.add('active');
  }
}

function updateResultsContainer(results) {
  const fragment = new DocumentFragment();
  const baseUrl = `https://image.tmdb.org/t/p/w500/`;

  for (const result of results) {
    const div = document.createElement('div');
    div.classList.add('result');
    div.dataset.movieId = result.id;
    const title = document.createElement('h3');
    title.classList.add('title');
    title.textContent = result.title;
    const posterImg = document.createElement('img');
    posterImg.classList.add('poster');
    const addBtn = document.createElement('button');
    addBtn.classList.add('add-btn');
    const span = document.createElement('span');
    addBtn.append(span);
    addBtn.addEventListener('click', () => {
      watchList.push(result);
      updateWatchListDrawer();
    })
    // Removed baseUrl while testing with placeholder content
    posterImg.src = `${result.poster_path}`;
    div.append(title);
    div.append(posterImg);
    div.append(addBtn);
    fragment.append(div);
  }

  resultsContainer.append(fragment);

}

watchListDrawer.addEventListener('click', (e) => {
  const drawer = e.target;

  if (drawer.classList.contains('active')) {
    drawer.classList.remove('active');
    return;
  }

  drawer.classList.add('active');
})

async function searchMovieDatabase(movie) {
  console.log(movie);
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ODE1ZmZmMzQ4OWQ1ZTE1ODZmODJiOTEwYzM0ZTIzOCIsInN1YiI6IjU5NTcxYjBhYzNhMzY4MjUzYzAwMGM5NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NYDrFxkiYNIe4aKEmqohKuG_vSzIUB5LlRCRBgb-dTk'
    }
  };

  try {
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching data, ${error}`);
  }
}
