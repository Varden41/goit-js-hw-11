import Notiflix from 'notiflix';
import FetchUrl from './pixabay';
import axios from 'axios';
import createMarkup from './markup';

const { form, input, gallery, loadMore } = {
  form: document.querySelector('.search-form'),
  input: document.querySelector('[name="searchQuery"]'),
  gallery: document.querySelector('.gallery'),
  loadMore: document.querySelector('.load-more'),
};

const fetchUrl = new FetchUrl();

form.addEventListener('submit', onSearch);

async function onSearch(e) {
  e.preventDefault();
  fetchUrl.query = e.currentTarget.elements.searchQuery.value;
  fetchUrl.resetPage();
  fetchUrl.fetchPictures();
}
// button.addEventListener('click', onLoadMore);
loadMore.addEventListener('click', onLoadMore);
function onLoadMore() {
  fetchUrl.fetchPictures();
}
