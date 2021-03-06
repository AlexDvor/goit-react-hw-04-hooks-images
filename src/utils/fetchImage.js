async function FetchImages(nameImg, pageNumber) {
  const URL = 'https://pixabay.com/api';
  const KEY = '22579303-973b9b71134c76d3c38c0933d';

  return await fetch(
    `${URL}/?q=${nameImg}&page=${pageNumber}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`,
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error(`Мы не нашли такой картинки по имени ${nameImg}`));
  });
}

export default FetchImages;
