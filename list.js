const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-bar');
const resultsContainer = document.querySelector('[data-search-results]');

let watchList = [];

let query;

// Placeholder content for testing

const results = [
  { title: 'Bad Boys', poster_path: 'https://placehold.co/400'},
  { title: 'Bad Boys', poster_path: 'https://placehold.co/400'},
  { title: 'Bad Boys', poster_path: 'https://placehold.co/400'},
  { title: 'Bad Boys', poster_path: 'https://placehold.co/400'},
  { title: 'Bad Boys', poster_path: 'https://placehold.co/400'},
  { title: 'Bad Boys', poster_path: 'https://placehold.co/400'},
  { title: 'Bad Boys', poster_path: 'https://placehold.co/400'},
]

updateResultsContainer(results);

searchForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  query = encodeURIComponent(searchInput.value);

  const { results } = await searchMovieDatabase(query);

  if (results.length > 0) {
    updateResultsContainer(results);
  }
});

function updateResultsContainer(results) {
  const fragment = new DocumentFragment();
  const baseUrl = `https://image.tmdb.org/t/p/w500/`;

  for (const result of results) {
    const div = document.createElement('div');
    div.classList.add('result');
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
