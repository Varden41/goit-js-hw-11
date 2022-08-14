import Notiflix from 'notiflix';
import FetchUrl from './pixabay';
import createMarkup from './markup';
import SimpleLightbox from 'simplelightbox';
import { debounce } from 'lodash';
import 'simplelightbox/dist/simple-lightbox.min.css';

const { form, gallery, loadMore } = {
  form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  loadMore: document.querySelector('.load-more'),
};
let addSucsess = true;
const fetchUrl = new FetchUrl();

// smooth scroll
function smoothScroll() {
  const { height: cardHeight } = document
    .querySelector('.formWrapper')
    .getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 1.5,
    behavior: 'smooth',
  });
}

form.addEventListener('submit', onSearch);
// loadMore.addEventListener('click', onLoadMore);
document.addEventListener('scroll', debounce(onScroll, 300));

var lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

async function onSearch(e) {
  e.preventDefault();

  addSucsess = true;
  fetchUrl.query = e.currentTarget.elements.searchQuery.value.trim();
  if (fetchUrl.query) {
    clearPage();
    fetchUrl.resetPage();
    await showMarkup();
    lightbox.refresh();
    smoothScroll();
  }
}

async function onScroll() {
  if (
    window.innerHeight + window.pageYOffset >=
    document.body.offsetHeight - 5
  ) {
    await showMarkup();
  }
}

// async function onLoadMore() {
//   await showMarkup();
// }

function appendPictureMarkup(pageUrl) {
  gallery.insertAdjacentHTML('beforeend', createMarkup(pageUrl));
}
function clearPage() {
  gallery.innerHTML = '';
}
async function showMarkup() {
  try {
    const pageUrl = await fetchUrl.fetchPictures();
    console.log(fetchUrl.page);
    const nots = notification(pageUrl);
    const pageMarkup = appendPictureMarkup(pageUrl);
  } catch (error) {
    throw new Error(error);
  }
}

// notification

function notification(pageUrl) {
  if (pageUrl.data.hits.length === 0 && fetchUrl.page === 2) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  } else if (pageUrl.data.hits.length >= 1 && addSucsess === true) {
    // loadMore.classList.remove('is-hidden');
    Notiflix.Notify.success(
      `Hooray! We found ${pageUrl.data.totalHits} images.`
    );
  } else if (pageUrl.data.hits.length < 40) {
    Notiflix.Notify.info(
      `We're sorry, but you've reached the end of search results.`
    );
  }
  addSucsess = false;
}
