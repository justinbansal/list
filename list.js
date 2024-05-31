const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-bar');

let query;

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();

  query = searchInput.value;
});
