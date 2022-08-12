import Notiflix from 'notiflix';
import FetchUrl from './pixabay';
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
  const pageUrl = await fetchUrl.fetchPictures();
  const pageMarkup = appendPictureMarkup(pageUrl);
}
// button.addEventListener('click', onLoadMore);
loadMore.addEventListener('click', onLoadMore);
async function onLoadMore() {
  const pageUrl = await fetchUrl.fetchPictures();
  const pageMarkup = appendPictureMarkup(pageUrl);
}

function appendPictureMarkup(pageUrl) {
  gallery.insertAdjacentHTML('beforeend', createMarkup(pageUrl));
}
