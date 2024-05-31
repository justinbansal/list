const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-bar');

let query;

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();

  query = encodeURIComponent(searchInput.value);

  searchMovieDatabase(query);
});

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

  } catch (error) {
    console.error(`Error fetching data, ${error}`);
  }
}
