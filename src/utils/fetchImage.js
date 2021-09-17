function fetchImages(nameImg, pageNumber) {
  const URL = 'https://pixabay.com/api';
  const KEY = '22579303-973b9b71134c76d3c38c0933d';

  return fetch(
    `${URL}/?q=${nameImg}&page=${pageNumber}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`,
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error(`Мы не нашли такой картинки по имени ${nameImg}`));
  });
}

const Api = {
  fetchImages,
};

export default Api;
