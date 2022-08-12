import axios from 'axios';

export default class FetchUrl {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }
  async fetchPictures() {
    try {
      const searchParams = new URLSearchParams({
        key: '29198064-00b99288cfca6b99747869826',
        q: `${this.searchQuery}`,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        page: `${this.page}`,
        per_page: 40,
      });
      const BASE_URL = 'https://pixabay.com/api/';
      const search = await axios.get(`${BASE_URL}/?${searchParams}`);
      console.log(search);

      this.incrementPage();
      return search;
    } catch (error) {
      throw new Error(error);
    }
  }

  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
