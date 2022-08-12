import Notiflix from 'notiflix';
import FetchUrl from './pixabay';
import createMarkup from './markup';

const { form, gallery, loadMore } = {
  form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  loadMore: document.querySelector('.load-more'),
};

let addSucsess = true;

const fetchUrl = new FetchUrl();

form.addEventListener('submit', onSearch);

async function onSearch(e) {
  e.preventDefault();
  addSucsess = true;
  fetchUrl.query = e.currentTarget.elements.searchQuery.value.trim();
  if (fetchUrl.query) {
    clearPage();
    fetchUrl.resetPage();
    await showMarkup();
  }
}

loadMore.addEventListener('click', onLoadMore);
async function onLoadMore() {
  await showMarkup();
}

function appendPictureMarkup(pageUrl) {
  gallery.insertAdjacentHTML('beforeend', createMarkup(pageUrl));
}
function clearPage() {
  gallery.innerHTML = '';
}
async function showMarkup() {
  try {
    const pageUrl = await fetchUrl.fetchPictures();
    const nots = notification(pageUrl);
    const pageMarkup = appendPictureMarkup(pageUrl);
  } catch (error) {
    throw new Error(error);
  }
}

// notification

function notification(pageUrl) {
  if (pageUrl.data.hits.length === 0) {
    return Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  } else if (pageUrl.data.hits.length < 40) {
    Notiflix.Notify.info(
      `We're sorry, but you've reached the end of search results.`
    );
  } else if (pageUrl.data.hits.length >= 1 && addSucsess === true) {
    Notiflix.Notify.success(
      `Hooray! We found ${pageUrl.data.totalHits} images.`
    );
  }
  addSucsess = false;
}
