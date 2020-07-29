const inputSearch = document.querySelector('.search-film');
const btnNumber = document.querySelector('.page-number');
const btnPrev = document.querySelector('.js-btn-prev');
const btnNext = document.querySelector('.js-btn-next');
const btnPages = document.querySelector('.pages');
const API_KEY = '2f2663043f4e6e1c1ca2fc9d3ec31eb9';
const searchLang = 'en-US,uk-UA,ru-RU'; // Мова загрузки фільмів
const urlPopular = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=${searchLang}`;
const urlSearch = `https://api.themoviedb.org/3/search/collection?api_key=${API_KEY}&language=${searchLang}`;
let value = '';
let page = 1;
let options = '';
let totalPages = 0;
let loadPage = true; // Змінюємо силку на загрузку

function getFilmsList(event) {
  value = inputSearch.value;
  event === 'next' ? (page += 1) : null;

  if (event === 'prev') {
    if (page <= 1) {
      return;
    }
    page -= 1;
  } else {
    page = 1;
  }

  loadPage
    ? (options = `${urlPopular}&page=${page}`)
    : (options = `${urlSearch}&query=${value}&page=${page}`);

  fetch(options)
    .then(response => response.json())
    .then(data => {
      postList(data);
      plaginationPages(data.total_pages, page);
      btnNumber.textContent = `${data.page} з ${data.total_pages}`;
    })
    .catch(error => console.log(error));
}

function plaginationPages(totalPages, page) {
  btnNumber.disabled = true;
  if (totalPages === 1) {
    btnPrev.disabled = true;
    btnNext.disabled = true;
    return;
  }
  totalPages >= 2 ? (btnNext.disabled = false) : null;
  page === 1 ? (btnPrev.disabled = true) : (btnPrev.disabled = false);
  totalPages === page ? (btnNext.disabled = true) : null;
}

getFilmsList(); // Завантаження популярних фільмів

document.addEventListener('keydown', event => {
  // console.log(event.code)
  if (event.code === 'Enter') {
    loadPage = false; //Зміна силки на завантаження фільмів з пошуку
    getFilmsList();
  }
});
btnPrev.addEventListener('click', () => getFilmsList('prev'));
btnNext.addEventListener('click', () => getFilmsList('next'));
