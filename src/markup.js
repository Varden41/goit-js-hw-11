export default function createMarkup(pageUrl) {
  const markup = pageUrl.data.hits
    .map(picture => {
      return `<a class="photo-card" href="${picture.largeImageURL}">
  <img src="${picture.webformatURL}" alt="${picture.tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes:</b>
      ${picture.likes}
    </p>
    <p class="info-item">
      <b>Views:</b>
      ${picture.views}
    </p>
    <p class="info-item">
      <b>Comments:</b>
      ${picture.comments}
    </p>
    <p class="info-item">
      <b>Downloads:</b>
      ${picture.downloads}
    </p>
  </div>
</a>`;
    })
    .join('');
  return markup;
}
